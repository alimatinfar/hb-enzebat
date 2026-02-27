import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const POST = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  const body = await req.json();
  const { name, teacherId, cityId, studentIds = [] } = body;

  if (!name || !teacherId) {
    return NextErrorResponse({ error: "اطلاعات ناقص است", status: 422 });
  }

  const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
  const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

  let finalCityId: number | null = null;

  // ===============================
  // ADMIN
  // ===============================
  if (isAdmin) {
    if (!cityId) {
      return NextErrorResponse({ error: "cityId الزامی است", status: 422 });
    }
    finalCityId = cityId;
  }

  // ===============================
  // CITY_ADMIN
  // ===============================
  if (!isAdmin && isCityAdmin) {

    if (!adminUser.cityId) {
      return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
    }

    if (cityId && cityId !== adminUser.cityId) {
      return NextErrorResponse({
        error: "اجازه ایجاد کلاس در شهر دیگر را ندارید",
        status: 403
      });
    }

    finalCityId = adminUser.cityId;
  }

  try {

    // ===============================
    // چک معلم
    // ===============================
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
      include: { roles: true }
    });

    if (!teacher) {
      return NextErrorResponse({ error: "معلم یافت نشد", status: 404 });
    }

    const isTeacher = teacher.roles.some(r => r.role === "TEACHER");

    if (!isTeacher) {
      return NextErrorResponse({ error: "کاربر انتخاب شده معلم نیست", status: 422 });
    }

    if (!isAdmin && teacher.cityId !== finalCityId) {
      return NextErrorResponse({
        error: "معلم مربوط به این شهر نیست",
        status: 403
      });
    }

    // ===============================
    // چک دانش‌آموزها
    // ===============================
    if (studentIds.length > 0) {

      const students = await prisma.user.findMany({
        where: {
          id: { in: studentIds },
        },
        include: { roles: true }
      });

      // چک اینکه همه پیدا شده باشند
      if (students.length !== studentIds.length) {
        return NextErrorResponse({
          error: "برخی دانش‌آموزان یافت نشدند",
          status: 404
        });
      }

      for (const student of students) {

        const isStudent = student.roles.some(r => r.role === "STUDENT");

        if (!isStudent) {
          return NextErrorResponse({
            error: `کاربر با شناسه ${student.id} دانش‌آموز نیست`,
            status: 422
          });
        }

        if (!isAdmin && student.cityId !== finalCityId) {
          return NextErrorResponse({
            error: "برخی دانش‌آموزان مربوط به این شهر نیستند",
            status: 403
          });
        }
      }
    }

    // ===============================
    // ایجاد کلاس
    // ===============================
    const newClass = await prisma.class.create({
      data: {
        name,
        teacher: {
          connect: { id: teacherId },
        },
        city: {
          connect: { id: finalCityId! },
        },
        students: {
          connect: studentIds.map((id: number) => ({ id }))
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
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true,
          }
        },
        city: true,
        _count: {
          select: {
            students: true,
            attendance: true,
          },
        },
      },
    });

    return NextSuccessResponse({ data: newClass });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});