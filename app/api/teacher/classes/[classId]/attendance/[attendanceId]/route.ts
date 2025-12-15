import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["TEACHER"], async (req, user) => {
  const attendanceId = Number(req.url.split("/").at(-1));

  const attendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
    include: {
      class: true,
      presents: {
        select: {
          id: true,
          mobile: true,
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  if (!attendance) {
    return NextErrorResponse({ error: "حضور و غیاب پیدا نشد", status: 404 });
  }

  // بررسی اینکه کاربر معلم کلاس است
  if (attendance.class.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  return NextSuccessResponse({ data: attendance });
});
