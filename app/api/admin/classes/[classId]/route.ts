import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  try {
    const classId = Number(req.url.split("/").at(-1));

    if (!classId || isNaN(classId)) {
      return NextErrorResponse({ error: "شناسه کلاس نامعتبر است", status: 400 });
    }

    const existingClass = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        city: true,
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      }
    });

    if (!existingClass) {
      return NextErrorResponse({ error: "کلاس یافت نشد", status: 404 });
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

      if (existingClass.cityId !== adminUser.cityId) {
        return NextErrorResponse({ error: "دسترسی غیرمجاز", status: 403 });
      }
    }

    return NextSuccessResponse({
      data: {
        class: existingClass
      }
    });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});
