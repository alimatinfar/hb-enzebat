import {withAuth} from "@/utils/backend/auth/withAuth";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import NextSuccessResponse from "@/utils/backend/response/NextSuccessResponse";
import prisma from "@/lib/prisma";

export const GET = withAuth(async (req, decodedUser) => {
  const user = await prisma.user.findUnique({
    where: {id: decodedUser.id},
    select: {
      id: true,
      mobile: true,
      firstName: true,
      lastName: true,
      city: {
        select: {id: true, name: true}
      },
      roles: {
        select: {role: true}
      },
    },
  })

  if (!user) {
    return NextErrorResponse({error: "کاربر یافت نشد", status: 404})
  }

  return NextSuccessResponse({data: {user}})
});
