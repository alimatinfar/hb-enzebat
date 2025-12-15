import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const DELETE = withRoleAuth(["TEACHER"], async (req, user) => {
  const attendanceId = Number(req.url.split("/").at(-2));

  const attendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
    include: { class: true }
  });

  if (!attendance) {
    return NextErrorResponse({ error: "حضور و غیاب پیدا نشد", status: 404 });
  }

  if (attendance.class.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  await prisma.attendance.delete({
    where: { id: attendanceId }
  });

  return NextSuccessResponse({ data: { message: "حضور و غیاب با موفقیت حذف شد" } });
});
