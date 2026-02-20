import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const DELETE = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const classId = Number(req.url.split("/").at(-2));

    if (!classId || isNaN(classId)) {
      return NextErrorResponse({ error: "شناسه کلاس نامعتبر است", status: 400 });
    }

    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        city: true,
      }
    });

    if (!existingClass) {
      return NextErrorResponse({ error: "کلاس یافت نشد", status: 404 });
    }

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    // ==============================
    // محدودیت برای CITY_ADMIN
    // ==============================
    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      if (existingClass.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }
    }

    // ==============================
    // حذف وابستگی‌ها
    // ==============================

    // حذف جلسات کلاس
    await prisma.attendance.deleteMany({
      where: { classId }
    });

    // جدا کردن دانش‌آموزان از کلاس (رابطه many-to-many)
    await prisma.class.update({
      where: { id: classId },
      data: {
        students: {
          set: []
        }
      }
    });

    // حذف کلاس
    await prisma.class.delete({
      where: { id: classId }
    });

    return NextSuccessResponse({
      data: { message: "کلاس با موفقیت حذف شد" }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});