import { handleAuth } from "./handleAuth";
import {User} from "@prisma/client";


export function withAuth(
  handler: (req: Request, user: User) => Promise<Response> | Response
) {
  return async (req: Request) => {
    return handleAuth(req, handler);
  };
}
