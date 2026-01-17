import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["TEACHER"], async (req, user) => {
  const classId = Number(req.url.split("/").at(-2));

  // چک کلاس و مالکیت معلم
  const cls = await prisma.class.findUnique({
    where: { id: classId }
  });

  if (!cls || cls.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  // تعداد کل دانش‌آموزان کلاس
  const totalStudents = await prisma.user.count({
    where: {
      studentClasses: {
        some: { id: classId }
      }
    }
  });

  // گرفتن لیست attendance با شمارش حاضرین
  const attendanceList = await prisma.attendance.findMany({
    where: { classId },
    include: {
      _count: {
        select: { presents: true, excusedAbsences: true }
      }
    },
    orderBy: { date: "desc" }
  });

  // فرمت خروجی
  const formatted = attendanceList.map(a => ({
    id: a.id,
    date: a.date,
    presentCount: a._count.presents,
    excusedAbsencesCount: a._count.excusedAbsences,
    totalStudents
  }));

  return NextSuccessResponse({ data: { attendanceList: formatted, class: cls } });
});
