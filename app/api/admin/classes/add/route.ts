import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const POST = withRoleAuth(["ADMIN", "CITY_ADMIN"], async (req, adminUser) => {
  const body = await req.json();
  const { name, teacherId, cityId } = body;

  if (!name || !teacherId) {
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

    // امنیت: اجازه نده cityId از بیرون تغییر کند
    if (cityId && cityId !== adminUser.cityId) {
      return NextErrorResponse({
        error: "اجازه ایجاد کلاس در شهر دیگر را ندارید",
        status: 403
      });
    }

    finalCityId = adminUser.cityId;
  }

  try {

    // ===============================
    // چک وجود معلم
    // ===============================
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
      include: { roles: true }
    });

    if (!teacher) {
      return NextErrorResponse({ error: "معلم یافت نشد", status: 404 });
    }

    // بررسی داشتن نقش TEACHER
    const isTeacher = teacher.roles.some(r => r.role === "TEACHER");

    if (!isTeacher) {
      return NextErrorResponse({ error: "کاربر انتخاب شده معلم نیست", status: 422 });
    }

    // اگر cityAdmin است، معلم هم باید در همان شهر باشد
    if (!isAdmin && teacher.cityId !== finalCityId) {
      return NextErrorResponse({
        error: "معلم مربوط به این شهر نیست",
        status: 403
      });
    }

    // ===============================
    // ایجاد کلاس
    // ===============================
    const newClass = await prisma.class.create({
      data: {
        name,
        teacher: {
          connect: { id: teacherId },
        },
        city: {
          connect: { id: finalCityId! },
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true,
          },
        },
        city: true,
        _count: {
          select: {
            students: true,
            attendance: true,
          },
        },
      },
    });

    return NextSuccessResponse({ data: newClass });

  } catch (err: any) {
    console.log({ err });
    return NextErrorResponse({ error: "خطای سرور", status: 500 });
  }
});