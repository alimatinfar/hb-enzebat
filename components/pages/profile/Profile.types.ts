import {Role} from "@/app/generated/prisma/enums";

export type ProfileUserType = {
  id: number;
  mobile: string;
  firstName: string | null;
  lastName: string | null;
  city: {
    id: number;
    name: string;
  } | null;
  roles: {
    role: Role;
  }[];
}

export type ProfileResponseType = {
  user: ProfileUserType;
}
