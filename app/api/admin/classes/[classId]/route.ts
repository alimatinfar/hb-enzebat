import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const url = new URL(req.url);
    const classId = Number(url.pathname.split("/").at(-1));
    const moreInfo = url.searchParams.get("moreInfo");

    if (!classId || isNaN(classId)) {
      return NextErrorResponse({ error: "شناسه کلاس نامعتبر است", status: 400 });
    }

    // دریافت اطلاعات پایه کلاس
    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        city: true,
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            roles: true,
            city: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true
          },
        },
      }
    });

    if (!existingClass) {
      return NextErrorResponse({ error: "کلاس یافت نشد", status: 404 });
    }

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    // محدودیت CITY_ADMIN
    if (!isAdmin && isCityAdmin) {
      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }
      if (existingClass.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }
    }

    let extraData = undefined;

    // ========================
    //    اطلاعات اضافی
    // ========================
    if (moreInfo) {
      const classStudentIds = existingClass.students.map(s => s.id);
      const totalStudents = classStudentIds.length;

      if (totalStudents === 0) {
        extraData = {
          totalSessions: 0,
          averageAttendancePercent: 0,
        };
      } else {
        const sessions = await prisma.attendance.findMany({
          where: { classId },
          include: {
            presents: { select: { id: true } },
          }
        });

        const totalSessions = sessions.length;

        let sumPercentages = 0;

        if (totalSessions > 0) {
          for (const session of sessions) {
            const presentCount = session.presents.filter(p =>
              classStudentIds.includes(p.id)
            ).length;

            const sessionPercent = (presentCount / totalStudents) * 100;
            sumPercentages += sessionPercent;
          }

          const averageAttendancePercent = sumPercentages / totalSessions;

          extraData = {
            totalSessions,
            averageAttendancePercent: Number(averageAttendancePercent.toFixed(2)),
          };
        } else {
          extraData = {
            totalSessions: 0,
            averageAttendancePercent: 0,
          };
        }
      }
    }

    return NextSuccessResponse({
      data: {
        class: existingClass,
        ...(extraData ? { moreInfo: extraData } : {})
      }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
