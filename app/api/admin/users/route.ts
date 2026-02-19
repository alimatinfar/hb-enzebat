import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {

    const isAdmin = adminUser.roles.some(r => r.role === "ADMIN");
    const isCityAdmin = adminUser.roles.some(r => r.role === "CITY_ADMIN");

    let whereClause: any = {};

    if (!isAdmin && isCityAdmin) {

      if (!adminUser.cityId) {
        return NextErrorResponse({ error: "ادمین شهری شهر ندارد", status: 403 });
      }

      whereClause = {
        cityId: adminUser.cityId,

        // حذف کاربرانی که نقش ADMIN دارند
        NOT: {
          roles: {
            some: {
              role: "ADMIN"
            }
          }
        }
      };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        roles: true,
        city: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextSuccessResponse({ data: { users } });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
