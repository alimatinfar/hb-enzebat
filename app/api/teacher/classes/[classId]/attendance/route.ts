import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["TEACHER"], async (req, user) => {
  const classId = Number(req.url.split("/").at(-2));

  // چک کلاس و مالکیت معلم
  const cls = await prisma.class.findUnique({
    where: { id: classId }
  });

  if (!cls || cls.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  // گرفتن لیست حضور و غیاب همراه با کاربران حاضر
  const attendanceList = await prisma.attendance.findMany({
    where: { classId },
    include: {
      presents: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          mobile: true
        }
      }
    },
    orderBy: { date: "desc" } // اختیاری: مرتب سازی از جدیدترین
  });

  return NextSuccessResponse({ data: { attendanceList } });
});
