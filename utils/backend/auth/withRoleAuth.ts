import {handleAuth} from "./handleAuth";
import {User} from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";

export function withRoleAuth(
  roles: string[],
  handler: (req: Request, decodedToken: User) => Promise<Response> | Response
) {
  return async (req: Request) => {
    return handleAuth(req, async (req: Request, decodedToken: User) => {
      const user = await prisma.user.findUnique({
        where: {id: decodedToken.id},
        include: {roles: true}
      });

      if (!user) return NextErrorResponse({error: 'کاربر یافت نشد', status: 404})
      console.log({
        user,
        hasPermission: user.roles.some((userRole) => roles.includes(userRole.role)),
        roles: user.roles,
        mainRoles: roles,
      })
      // بررسی نقش
      if (!user.roles.some((userRole) => roles.includes(userRole.role))) {
        return NextErrorResponse({error: "دسترسی غیرمجاز", status: 403})
      }

      return handler(req, user);
    });
  };
}
