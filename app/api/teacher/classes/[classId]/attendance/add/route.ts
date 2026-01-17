import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const POST = withRoleAuth(["TEACHER"], async (req, user) => {
  const classId = Number(req.url.split("/").at(-3));
  const body = await req.json();
  const { date, presents, excusedAbsences } = body;
  console.log({excusedAbsences})
  if (!date || !Array.isArray(presents) || !Array.isArray(excusedAbsences)) {
    return NextErrorResponse({ error: "اطلاعات ناقص است", status: 422 });
  }

  const attendanceDate = new Date(date);

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls || cls.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  const startOfDay = new Date(attendanceDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(attendanceDate);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      classId,
      date: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });

  if (existingAttendance) {
    return NextErrorResponse({
      error: "برای این روز قبلاً حضور و غیاب ثبت شده است",
      status: 409
    });
  }

  const attendance = await prisma.attendance.create({
    data: {
      classId,
      date: attendanceDate,
      presents: { connect: presents.map((id: number) => ({ id })) },
      excusedAbsences: { connect: excusedAbsences.map((id: number) => ({ id })) }
    },
    include: { presents: true, excusedAbsences: true }
  });

  return NextSuccessResponse({ data: attendance });
});
