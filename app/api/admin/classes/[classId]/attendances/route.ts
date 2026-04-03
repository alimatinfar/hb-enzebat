import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, user) => {
  const classId = Number(req.url.split("/").at(-2));

  // چک کلاس و مالکیت ادمین
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { city: true } // اگر نیاز باشد، اطلاعات شهر را هم بیفزایید
  });

  if (!cls) {
    return NextErrorResponse({ error: "کلاس پیدا نشد", status: 404 });
  }

  const isAdmin = user.roles.some((r) => r.role === "ADMIN");
  const isCityAdmin = user.roles.some((r) => r.role === "CITY_ADMIN");

  // کنترل دسترسی بر اساس نقش و شهر
  if (isCityAdmin) {
    if (!user.cityId || user.cityId !== cls.cityId) {
      return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
    }
  }

  // حالا لیست جلسات کلاس مشخص است
  const attendanceList = await prisma.attendance.findMany({
    where: {
      classId,
      ...(isCityAdmin && user.cityId ? { class: { cityId: user.cityId } } : {})
    },
    include: {
      _count: {
        select: { presents: true, excusedAbsences: true }
      }
    },
    orderBy: { date: "desc" }
  });

  const totalStudents = await prisma.user.count({
    where: {
      studentClasses: {
        some: { id: classId }
      }
    }
  });

  const formatted = attendanceList.map((a) => ({
    id: a.id,
    date: a.date,
    presentCount: a._count.presents,
    excusedAbsencesCount: a._count.excusedAbsences,
    totalStudents,
  }));

  return NextSuccessResponse({ data: { attendanceList: formatted, class: cls } });
});
