import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";


export const GET = withRoleAuth(["TEACHER"], async (req, user) => {
  const classId = Number(req.url.split("/").at(-2));

  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { students: true }
  });

  if (!cls || cls.teacherId !== user.id) {
    return NextErrorResponse({ error: "اجازه دسترسی ندارید", status: 403 });
  }

  return NextSuccessResponse({ data: {students: cls.students} });
});