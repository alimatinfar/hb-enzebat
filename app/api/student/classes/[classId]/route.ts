import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["STUDENT"], async (req, user) => {
  const classId = Number(new URL(req.url).pathname.split("/").at(-1));

  if (!classId || isNaN(classId)) {
    return NextErrorResponse({ error: "شناسه کلاس نامعتبر است", status: 400 });
  }

  // کلاس فقط در صورتی برگردانده می‌شود که دانش‌آموز عضو آن باشد
  const cls = await prisma.class.findFirst({
    where: {
      id: classId,
      students: {
        some: { id: user.id }
      }
    },
    include: {
      teacher: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          mobile: true,
        },
      },
      city: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          students: true,
          attendance: true,
        },
      },
    },
  });

  if (!cls) {
    return NextErrorResponse({ error: "کلاس یافت نشد یا شما عضو آن نیستید", status: 404 });
  }

  // جلسات کلاس + وضعیت همین دانش‌آموز در هر جلسه
  const attendanceList = await prisma.attendance.findMany({
    where: { classId },
    select: {
      id: true,
      date: true,
      presents: {
        where: { id: user.id },
        select: { id: true },
      },
      excusedAbsences: {
        where: { id: user.id },
        select: { id: true },
      },
    },
    orderBy: { date: "desc" },
  });

  const sessions = attendanceList.map(session => ({
    id: session.id,
    date: session.date,
    status: session.presents.length > 0
      ? "PRESENT"
      : session.excusedAbsences.length > 0
        ? "EXCUSED"
        : "ABSENT",
  }));

  const totalSessions = sessions.length;
  const presentCount = sessions.filter(session => session.status === "PRESENT").length;
  const excusedCount = sessions.filter(session => session.status === "EXCUSED").length;
  const absentCount = totalSessions - presentCount - excusedCount;

  const attendancePercent = totalSessions > 0
    ? Number(((presentCount / totalSessions) * 100).toFixed(2))
    : 0;

  return NextSuccessResponse({
    data: {
      class: {
        id: cls.id,
        name: cls.name,
        isVirtual: cls.isVirtual,
        city: cls.city,
        teacher: cls.teacher,
        studentsCount: cls._count.students,
      },
      sessions,
      stats: {
        totalSessions,
        presentCount,
        excusedCount,
        absentCount,
        attendancePercent,
      },
    }
  });
});
