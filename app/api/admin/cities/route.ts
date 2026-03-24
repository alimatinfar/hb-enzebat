import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN"], async () => {
  try {
    // ادمین اصلی همه شهرها را می‌گیرد (بدون فیلتر)
    const cities = await prisma.city.findMany({
      orderBy: { id: "asc" },
    });

    return NextSuccessResponse({ data: { cities } });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای نامشخص", status: 400 });
  }
});
