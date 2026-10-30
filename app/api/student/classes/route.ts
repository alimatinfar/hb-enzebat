import { withRoleAuth } from "@/utils/backend/auth/withRoleAuth";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withRoleAuth(["STUDENT"], async (req, user) => {
  const classes = await prisma.class.findMany({
    where: {
      students: {
        some: { id: user.id }
      }
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
      city: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          students: true,
          attendance: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextSuccessResponse({ data: { classes } });
});
