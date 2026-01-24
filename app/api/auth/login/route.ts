import jwt from "jsonwebtoken";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { mobile, password } = await req.json();

    if (!mobile || !password) {
      return NextErrorResponse({ error: "نام کاربری یا رمز عبور ناقص است" })
    }

    // یافتن کاربر
    const user = await prisma.user.findUnique({
      where: { mobile },
      include: { roles: true }
    });

    if (!user) {
      return NextErrorResponse({ error: "کاربر یافت نشد" })
    }

    // چک کردن رمز عبور
    if (user.password !== password) {
      return NextErrorResponse({ error: "رمز عبور اشتباه است" })
    }

    // ساخت JWT Token مانند نسخه قبلیت
    const token = jwt.sign(
      {
        id: user.id,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles.map(r => r.role)
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextSuccessResponse({
      data: {
        token,
        user: {
          id: user.id,
          mobile: user.mobile,
          roles: user.roles.map(r => r.role),
        }
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextErrorResponse({ error: "خطای سرور", status: 500 })
  }
}