import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import prisma from "@/lib/prisma";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";

export const PUT = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const classId = Number(req.url.split("/").at(-2));
    const body = await req.json();

    const { name, teacherId, cityId } = body;

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
    // محدودیت های CITY_ADMIN
    // ===================================
    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      // فقط کلاس‌های شهر خودش
      if (existingClass.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      // اجازه تغییر شهر ندارد
      if (cityId && cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "امکان تغییر شهر وجود ندارد", status: 403 });
      }
    }

    // ===================================
    // بررسی معلم جدید (در صورت ارسال)
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

      // اگر CITY_ADMIN است، معلم باید در همان شهر باشد
      if (!isAdmin && teacher.cityId !== adminUser.cityId) {
        return NextErrorResponse({
          error: "معلم مربوط به این شهر نیست",
          status: 403,
        });
      }

      finalTeacherId = teacherId;
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