import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {

    const { searchParams } = new URL(req.url);
    const cityIdParam = searchParams.get("cityId");

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    let targetCityId: number | null = null;

    // =====================================
    // تعیین شهر هدف
    // =====================================

    if (isAdmin) {
      targetCityId = cityIdParam ? Number(cityIdParam) : null;
    }

    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      targetCityId = adminUser.cityId;
    }

    // =====================================
    // where مشترک
    // =====================================

    const classWhere = targetCityId
      ? { cityId: targetCityId }
      : {};

    const userWhere = targetCityId
      ? { cityId: targetCityId }
      : {};

    // =====================================
    // تعداد دانش‌آموزان
    // =====================================

    const totalStudents = await prisma.user.count({
      where: {
        ...userWhere,
        roles: {
          some: { role: "STUDENT" }
        }
      }
    });

    // =====================================
    // تعداد کلاس‌ها
    // =====================================

    const totalClasses = await prisma.class.count({
      where: classWhere
    });

    // =====================================
    // تعداد جلسات (Attendance)
    // =====================================

    const totalSessions = await prisma.attendance.count({
      where: targetCityId
        ? {
          class: {
            cityId: targetCityId
          }
        }
        : {}
    });

    // =====================================
    // محاسبه درصد حضور
    // =====================================

    const attendances = await prisma.attendance.findMany({
      where: targetCityId
        ? {
          class: { cityId: targetCityId }
        }
        : {},
      select: {
        presents: { select: { id: true } },
        excusedAbsences: { select: { id: true } }
      }
    });

    let totalPresent = 0;
    let totalExcused = 0;

    for (const session of attendances) {
      totalPresent += session.presents.length;
      totalExcused += session.excusedAbsences.length;
    }

    const totalMarked = totalPresent + totalExcused;

    const averageAttendancePercent =
      totalMarked === 0
        ? 0
        : Number(((totalPresent / totalMarked) * 100).toFixed(2));

    // =====================================
    // خروجی
    // =====================================

    return NextSuccessResponse({
      data: {
        totalStudents,
        totalClasses,
        totalSessions,
        averageAttendancePercent
      }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});