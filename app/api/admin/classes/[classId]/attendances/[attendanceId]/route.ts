import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  const attendanceId = Number(req.url.split("/").at(-1));

  // پیدا کردن جلسه به همراه اطلاعات کلاس و شهر مربوطه
  const attendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
    include: {
      class: {
        include: { city: true } // نیاز داریم بدانیم کلاس در کدام شهر است
      },
      presents: {
        select: { id: true, firstName: true, lastName: true } // فیلدهای کاربر را اینجا تنظیم کنید
      },
      excusedAbsences: {
        select: { id: true, firstName: true, lastName: true }
      },
    }
  });

  if (!attendance) {
    return NextErrorResponse({ error: "جلسه حضور و غیاب یافت نشد", status: 404 });
  }

  // بررسی دسترسی برای ادمین شهری
  const isCityAdmin = adminUser.roles.some((r) => r.role === "CITY_ADMIN");

  if (isCityAdmin) {
    // ادمین شهری باید حتماً شهر داشته باشد و کلاس هم باید متعلق به شهر او باشد
    if (!adminUser.cityId || attendance.class.cityId !== adminUser.cityId) {
      return NextErrorResponse({ error: "شما اجازه دسترسی به این شهر را ندارید", status: 403 });
    }
  }

  // ادمین کل (ADMIN) بدون شرط اضافی دسترسی خواهد داشت

  return NextSuccessResponse({ data: attendance });
});
