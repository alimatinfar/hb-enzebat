import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import prisma from "@/lib/prisma";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import { Role } from "@/app/generated/prisma/client";

const uniqueMobileErrorMessage = "این شماره موبایل قبلاً ثبت شده است";

export const PUT = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const userId = Number(req.url.split("/").at(-2));
    const body = await req.json();

    const { mobile, password, roles, cityId, firstName, lastName } = body;

    if (!userId || isNaN(userId)) {
      return NextErrorResponse({ error: "شناسه کاربر نامعتبر است", status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });

    if (!existingUser) {
      return NextErrorResponse({ error: "کاربر یافت نشد", status: 404 });
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

      // فقط کاربران شهر خودش
      if (existingUser.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      // نمی‌تواند ADMIN را ویرایش کند
      const targetIsAdmin = existingUser.roles.some(r => r.role === "ADMIN");
      if (targetIsAdmin) {
        return NextErrorResponse({ error: "امکان ویرایش ادمین وجود ندارد", status: 403 });
      }

      // نمی‌تواند نقش ADMIN بدهد
      if (roles?.includes("ADMIN")) {
        return NextErrorResponse({ error: "امکان اعطای نقش ادمین وجود ندارد", status: 403 });
      }

      // اجازه تغییر شهر ندارد
      if (cityId && cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "امکان تغییر شهر وجود ندارد", status: 403 });
      }
    }

    // ===================================
    // چک تکراری نبودن موبایل
    // ===================================
    if (mobile && mobile !== existingUser.mobile) {

      const duplicateMobile = await prisma.user.findFirst({
        where: {
          mobile,
          NOT: { id: userId },
        },
      });

      if (duplicateMobile) {
        return NextErrorResponse({
          error: uniqueMobileErrorMessage,
          status: 409,
        });
      }
    }

    // ===================================
    // تعیین شهر نهایی
    // ===================================
    let finalCityId = existingUser.cityId;

    if (isAdmin && cityId) {
      finalCityId = cityId;
    }

    // ===================================
    // آپدیت کاربر
    // ===================================
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        mobile,
        password,
        firstName,
        lastName,
        city: finalCityId
          ? { connect: { id: finalCityId } }
          : undefined,
      },
      include: {
        roles: true,
        city: true,
      },
    });

    // ===================================
    // آپدیت نقش‌ها (در صورت ارسال)
    // ===================================
    if (roles) {

      // اگر ADMIN نباشد و نقش‌ها ارسال شده‌اند → قبلاً بالا چک امنیتی شده

      await prisma.userRole.deleteMany({ where: { userId } });

      await prisma.userRole.createMany({
        data: roles.map((r: Role) => ({
          userId,
          role: r,
        })),
      });
    }

    return NextSuccessResponse({ data: updatedUser });

  } catch (err: any) {
    console.log({ err });

    if (err.code === "P2002") {
      return NextErrorResponse({ error: uniqueMobileErrorMessage, status: 409 });
    }

    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});