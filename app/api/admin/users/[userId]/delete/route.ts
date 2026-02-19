import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const DELETE = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const userId = Number(req.url.split("/").at(-2));

    if (!userId || isNaN(userId)) {
      return NextErrorResponse({ error: "شناسه کاربر نامعتبر است", status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true }
    });

    if (!existingUser) {
      return NextErrorResponse({ error: "کاربر یافت نشد", status: 404 });
    }

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    // ==============================
    // محدودیت برای CITY_ADMIN
    // ==============================
    if (!isAdmin && isCityAdmin) {

      // باید شهر داشته باشد
      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      // فقط کاربران شهر خودش
      if (existingUser.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      // نباید ADMIN را حذف کند
      const targetIsAdmin = existingUser.roles.some(r => r.role === "ADMIN");
      if (targetIsAdmin) {
        return NextErrorResponse({ error: "امکان حذف ادمین وجود ندارد", status: 403 });
      }
    }

    // حذف نقش‌ها
    await prisma.userRole.deleteMany({ where: { userId } });

    // حذف کاربر
    await prisma.user.delete({ where: { id: userId } });

    return NextSuccessResponse({ data: { message: "کاربر با موفقیت حذف شد" } });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});