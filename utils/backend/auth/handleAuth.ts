import { verifyToken } from "./verifyToken";
import NextErrorResponse from "@/utils/backend/response/NextErrorResponse";
import {User} from "@prisma/client";

/**
 * بررسی اولیه‌ی JWT و اجرای handler در صورت معتبر بودن
 * (این تابع برای استفاده در withAuth و withRoleAuth طراحی شده)
 */
export async function handleAuth(
  req: Request,
  handler: (req: Request, decodedToken: User) => Promise<Response> | Response
): Promise<Response> {
  const decodedToken = verifyToken(req.headers.get("authorization") || '');

  if (!decodedToken) {
    return NextErrorResponse({ error: "توکن نامعتبر است", status: 401 })
  }

  return handler(req, decodedToken);
}