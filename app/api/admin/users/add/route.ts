import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";
import { Role } from "@/app/generated/prisma/client";

const uniqueMobileErrorMessage = "این شماره موبایل قبلاً ثبت شده است";

export const POST = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  const body = await req.json();
  const { mobile, password, roles, cityId, firstName = '', lastName = '' } = body;

  if (!mobile || !password || !roles) {
    return NextErrorResponse({ error: "اطلاعات ناقص است", status: 422 });
  }

  const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
  const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

  let finalCityId: number | null = null;

  // ===============================
  // اگر ADMIN باشد
  // ===============================
  if (isAdmin) {
    if (!cityId) {
      return NextErrorResponse({ error: "cityId الزامی است", status: 422 });
    }
    finalCityId = cityId;
  }

  // ===============================
  // اگر CITY_ADMIN باشد
  // ===============================
  if (!isAdmin && isCityAdmin) {

    if (!adminUser.cityId) {
      return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
    }

    // امنیت: اجازه نده cityId از بیرون ارسال شود
    if (cityId && cityId !== adminUser.cityId) {
      return NextErrorResponse({ error: "اجازه ثبت کاربر در شهر دیگر را ندارید", status: 403 });
    }

    // شهر را از خود ادمین بگیر
    finalCityId = adminUser.cityId;

    // جلوگیری از ساخت ADMIN
    if (roles.includes("ADMIN")) {
      return NextErrorResponse({ error: "امکان ایجاد ادمین وجود ندارد", status: 403 });
    }
  }

  // چک تکراری بودن موبایل
  const existingUser = await prisma.user.findUnique({
    where: { mobile },
  });

  if (existingUser) {
    return NextErrorResponse({ error: uniqueMobileErrorMessage, status: 409 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        mobile,
        password,
        firstName,
        lastName,
        city: {
          connect: { id: finalCityId! },
        },
        roles: {
          create: roles.map((r: Role) => ({ role: r })),
        },
      },
      include: {
        roles: true,
        city: true,
      },
    });

    return NextSuccessResponse({ data: newUser });

  } catch (err: any) {
    console.log({ err });

    if (err.code === "P2002") {
      return NextErrorResponse({ error: uniqueMobileErrorMessage, status: 409 });
    }

    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
