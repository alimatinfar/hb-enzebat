import {withRoleAuth} from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const {searchParams} = new URL(req.url);
    const filterCityId = searchParams.get("cityId");

    const isAdmin = adminUser.roles.some((r) => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some((r) => r.role === "CITY_ADMIN");

    let userFilter: any = {};
    let classFilter: any = {};
    let attendanceFilter: any = {};

    // ---------- CITY ADMIN ----------
    if (!isAdmin && isCityAdmin) {
      if (!adminUser.cityId) {
        return NextErrorResponse({error: "ادمین شهری شهر ندارد", status: 403});
      }

      userFilter = {cityId: adminUser.cityId};
      classFilter = {cityId: adminUser.cityId};
      attendanceFilter = {
        class: {cityId: adminUser.cityId},
      };
    }

    // ---------- ADMIN ----------
    if (isAdmin && filterCityId) {
      const cityId = Number(filterCityId);

      userFilter.cityId = cityId;
      classFilter.cityId = cityId;
      attendanceFilter.class = {cityId};
    }

    const [
      latestUsers,
      latestClasses,
      totalClasses,
      totalStudents,
      totalSessions,
      allAttendanceData,
    ] = await Promise.all([
      prisma.user.findMany({
        where: userFilter,
        take: 3,
        orderBy: {id: "desc"},
        select: {
          id: true,
          firstName: true,
          lastName: true,
          city: true,
        }
      }),

      prisma.class.findMany({
        where: classFilter,
        take: 3,
        orderBy: {id: "desc"},
        select: {
          id: true,
          name: true,
          city: true
        },
      }),

      prisma.class.count({
        where: classFilter,
      }),

      prisma.user.count({
        where: {
          ...userFilter,
          roles: {
            some: {role: "STUDENT"},
          },
        },
      }),

      prisma.attendance.count({
        where: attendanceFilter,
      }),

      prisma.attendance.findMany({
        where: attendanceFilter,
        select: {
          _count: {
            select: {presents: true},
          },
          class: {
            select: {
              _count: {
                select: {students: true},
              },
            },
          },
        },
      }),
    ]);

    // -------- میانگین درصد حضور --------
    let averageAttendancePercentage = 0;

    if (allAttendanceData.length > 0) {
      let totalPercentage = 0;

      for (const session of allAttendanceData) {
        const studentCount = session.class._count.students;
        const presentCount = session._count.presents;

        if (studentCount === 0) continue;

        const sessionPercentage = (presentCount / studentCount) * 100;

        totalPercentage += sessionPercentage;
      }

      averageAttendancePercentage =
        totalPercentage / allAttendanceData.length;
    }

    return NextSuccessResponse({
      data: {
        latestUsers,
        latestClasses,
        stats: {
          totalClasses,
          totalStudents,
          totalSessions,
          averageAttendancePercentage: Number(
            averageAttendancePercentage.toFixed(2)
          ),
        },
      },
    });
  } catch (err: any) {
    console.log(err);
    return NextErrorResponse({error: "خطای سرور", status: 500});
  }
});
