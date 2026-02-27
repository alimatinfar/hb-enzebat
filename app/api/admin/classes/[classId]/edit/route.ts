import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import prisma from "@/lib/prisma";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";

export const PUT = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const classId = Number(req.url.split("/").at(-2));
    const body = await req.json();

    const { name, teacherId, cityId, studentIds } = body;

    if (!classId || isNaN(classId)) {
      return NextErrorResponse({ error: "شناسه کلاس نامعتبر است", status: 400 });
    }

    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        teacher: { include: { roles: true } },
      },
    });

    if (!existingClass) {
      return NextErrorResponse({ error: "کلاس یافت نشد", status: 404 });
    }

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    // ===================================
    // محدودیت CITY_ADMIN
    // ===================================
    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      if (existingClass.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      if (cityId && cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "امکان تغییر شهر وجود ندارد", status: 403 });
      }
    }

    // ===================================
    // بررسی معلم
    // ===================================
    let finalTeacherId = existingClass.teacherId;

    if (teacherId && teacherId !== existingClass.teacherId) {

      const teacher = await prisma.user.findUnique({
        where: { id: teacherId },
        include: { roles: true },
      });

      if (!teacher) {
        return NextErrorResponse({ error: "معلم یافت نشد", status: 404 });
      }

      const isTeacher = teacher.roles.some(r => r.role === "TEACHER");

      if (!isTeacher) {
        return NextErrorResponse({ error: "کاربر انتخاب شده معلم نیست", status: 422 });
      }

      if (!isAdmin && teacher.cityId !== adminUser.cityId) {
        return NextErrorResponse({
          error: "معلم مربوط به این شهر نیست",
          status: 403,
        });
      }

      finalTeacherId = teacherId;
    }

    // ===================================
    // بررسی دانش‌آموزها (در صورت ارسال)
    // ===================================
    if (studentIds) {

      const students = await prisma.user.findMany({
        where: {
          id: { in: studentIds },
        },
        include: { roles: true },
      });

      if (students.length !== studentIds.length) {
        return NextErrorResponse({
          error: "برخی دانش‌آموزان یافت نشدند",
          status: 404,
        });
      }

      for (const student of students) {

        const isStudent = student.roles.some(r => r.role === "STUDENT");

        if (!isStudent) {
          return NextErrorResponse({
            error: `کاربر با شناسه ${student.id} دانش‌آموز نیست`,
            status: 422,
          });
        }

        if (!isAdmin && student.cityId !== adminUser.cityId) {
          return NextErrorResponse({
            error: "برخی دانش‌آموزان مربوط به این شهر نیستند",
            status: 403,
          });
        }
      }
    }

    // ===================================
    // تعیین شهر نهایی
    // ===================================
    let finalCityId = existingClass.cityId;

    if (isAdmin && cityId) {
      finalCityId = cityId;
    }

    // ===================================
    // آپدیت کلاس
    // ===================================
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        name: name ?? existingClass.name,
        teacher: {
          connect: { id: finalTeacherId },
        },
        city: finalCityId
          ? { connect: { id: finalCityId } }
          : undefined,
        students: studentIds
          ? {
            set: studentIds.map((id: number) => ({ id })) // replace کامل
          }
          : undefined,
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
          },
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

    return NextSuccessResponse({ data: updatedClass });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});