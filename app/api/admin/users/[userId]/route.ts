import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const userId = Number(req.url.split("/").at(-1));

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

    // ==============================
    // محدودیت CITY_ADMIN
    // ==============================
    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      // فقط کاربران شهر خودش
      if (existingUser.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }

      // نباید ADMIN را ببیند
      const targetIsAdmin = existingUser.roles.some(r => r.role === "ADMIN");
      if (targetIsAdmin) {
        return NextErrorResponse({ error: "اجازه مشاهده اطلاعات ادمین وجود ندارد", status: 403 });
      }
    }

    return NextSuccessResponse({
      data: {
        user: existingUser
      }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
