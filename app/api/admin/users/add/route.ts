import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";
import { Role } from "@/app/generated/prisma/client";


const uniqueUsernameErrorMessage = "این نام کاربری قبلاً ثبت شده است"

export const POST = withRoleAuth(["ADMIN"], async (req, adminUser) => {
  const body = await req.json();
  const { mobile, password, roles } = body;

  if (!mobile || !password || !roles) {
    return NextErrorResponse({ error: "اطلاعات ناقص است", status: 422 });
  }

  // چک تکراری بودن نام کاربری
  const existingUser = await prisma.user.findUnique({
    where: { mobile }
  });

  if (existingUser) {
    return NextErrorResponse({ error: uniqueUsernameErrorMessage, status: 409 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        mobile,
        password,
        roles: {
          create: roles.map((r: Role) => ({ role: r }))
        }
      },
      include: { roles: true }
    });

    return NextSuccessResponse({ data: newUser });
  } catch (err: any) {
    // هندل کردن خطای unique constraint اگر از چند جا همزمان درخواست بیاد
    if (err.code === "P2002") {
      return NextErrorResponse({ error: uniqueUsernameErrorMessage, status: 409 });
    }

    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});

