import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const PUT = withRoleAuth(["TEACHER"], async (req, user) => {
  const attendanceId = Number(req.url.split("/").at(-2));
  const body = await req.json();
  const { presents, excusedAbsences } = body;

  if (!Array.isArray(presents)  || !Array.isArray(excusedAbsences)) {
    return NextErrorResponse({ error: "اطلاعات ناقص است", status: 422 });
  }

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

  // به‌روزرسانی دانش‌آموزان حاضر
  const updatedAttendance = await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      presents: { set: presents.map((id: number) => ({ id })) },
      excusedAbsences: { set: excusedAbsences.map((id: number) => ({ id })) }
    },
    include: { presents: true, excusedAbsences: true }
  });

  return NextSuccessResponse({ data: updatedAttendance });
});
