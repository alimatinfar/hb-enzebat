import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["TEACHER"], async (req, user) => {
  const classes = await prisma.class.findMany({
    where: { teacherId: user.id }
  });

  return NextSuccessResponse({ data: {classes} });
});