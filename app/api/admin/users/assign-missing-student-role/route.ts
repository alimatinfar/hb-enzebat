import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const POST = withRoleAuth(["ADMIN"], async () => {
  try {

    // پیدا کردن کاربرانی که هیچ نقشی ندارند
    const usersWithoutRole = await prisma.user.findMany({
      where: {
        roles: {
          none: {}
        }
      },
      select: {
        id: true
      }
    });

    if (usersWithoutRole.length === 0) {
      return NextSuccessResponse({
        data: {
          updatedCount: 0,
          message: "کاربری بدون نقش یافت نشد"
        }
      });
    }

    // ساخت نقش STUDENT برای همه آن‌ها
    const result = await prisma.userRole.createMany({
      data: usersWithoutRole.map(user => ({
        userId: user.id,
        role: "STUDENT"
      }))
    });

    return NextSuccessResponse({
      data: {
        updatedCount: result.count,
        message: "نقش دانش‌آموز با موفقیت اختصاص داده شد"
      }
    });

  } catch (err: any) {
    console.log(err);
    return NextErrorResponse({
      error: "خطای سرور",
      status: 500
    });
  }
});