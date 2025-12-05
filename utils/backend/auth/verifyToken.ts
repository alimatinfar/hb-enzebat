import jwt from "jsonwebtoken";
import {User} from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(authHeader?: string): User | null {
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}
