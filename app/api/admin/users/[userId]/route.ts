import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const url = new URL(req.url);
    const moreInfo = url.searchParams.get("moreInfo") === "true";

    const userId = Number(url.pathname.split("/").at(-1));
    if (!userId || isNaN(userId)) {
      return NextErrorResponse({ error: "شناسه کاربر نامعتبر است", status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: true,
        city: true,
      }
    });

    if (!existingUser) {
      return NextErrorResponse({ error: "کاربر یافت نشد", status: 404 });
    }

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    // محدودیت‌های CITY_ADMIN
    if (!isAdmin && isCityAdmin) {
      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      if (existingUser.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      const targetIsAdmin = existingUser.roles.some(r => r.role === "ADMIN");
      if (targetIsAdmin) {
        return NextErrorResponse({ error: "اجازه مشاهده اطلاعات ادمین وجود ندارد", status: 403 });
      }
    }

    const extra: any = {};

    // ================
    //  moreInfo
    // ================
    if (moreInfo) {
      const isTeacher = existingUser.roles.some(r => r.role === "TEACHER");
      const isStudent = existingUser.roles.some(r => r.role === "STUDENT");

      // ===============================
      // اطلاعات مخصوص معلم
      // ===============================
      if (isTeacher) {
        const teacherClasses = await prisma.class.findMany({
          where: { teacherId: userId },
          include: {
            city: true,
            students: { select: { id: true } }
          }
        });

        const classInfos = teacherClasses.map(c => ({
          id: c.id,
          name: c.name,
          city: c.city,
        }));

        // لیست یکتا از دانش‌آموزان تمام کلاس‌های معلم
        const uniqueStudentIds = new Set(
          teacherClasses.flatMap(c => c.students.map(s => s.id))
        );

        const totalTeacherStudents = uniqueStudentIds.size;

        // تعداد تمام جلساتی که این معلم برگزار کرده
        const totalTeacherSessions = await prisma.attendance.count({
          where: {
            class: {
              teacherId: userId
            }
          }
        });

        extra.teacher = {
          classes: classInfos,
          totalSessions: totalTeacherSessions,
          totalStudents: totalTeacherStudents,
        };
      }

      // ===============================
      // اطلاعات مخصوص دانش‌آموز
      // ===============================
      if (isStudent) {
        const studentClasses = await prisma.class.findMany({
          where: {
            students: { some: { id: userId } }
          },
          include: {
            city: true
          }
        });

        const classInfos = studentClasses.map(c => ({
          id: c.id,
          name: c.name,
          city: c.city
        }));

        // ثبت حضور و غیبت این دانش‌آموز
        const studentSessions = await prisma.attendance.findMany({
          where: {
            classId: { in: studentClasses.map(c => c.id) }
          },
          include: {
            presents: { select: { id: true } },
            excusedAbsences: { select: { id: true } },
            class: {
              include: { students: { select: { id: true } } }
            }
          }
        });

        let attendedSessions = 0;
        const totalSessions = studentSessions.length;

        let totalAbsences = 0;
        let totalExcused = 0;

        for (const s of studentSessions) {
          const isPresent = s.presents.some(p => p.id === userId);

          if (isPresent) {
            attendedSessions++;
          } else {
            totalAbsences++;
            if (s.excusedAbsences.some(e => e.id === userId)) {
              totalExcused++;
            }
          }
        }

        const averageAttendancePercent =
          totalSessions > 0
            ? Number(((attendedSessions / totalSessions) * 100).toFixed(2))
            : 0;

        const excusedPercent =
          totalAbsences > 0
            ? Number(((totalExcused / totalAbsences) * 100).toFixed(2))
            : 0;

        extra.student = {
          classes: classInfos,
          totalAttendedSessions: attendedSessions,
          totalAbsentSessions: totalAbsences,
          averageAttendancePercent,
          excusedAbsencePercent: excusedPercent
        };
      }
    }

    return NextSuccessResponse({
      data: {
        user: existingUser,
        ...extra
      }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
