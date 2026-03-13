import {Role} from "@/app/generated/prisma/enums";

export type UserRoleType = typeof Role[keyof typeof Role]

export type AdminUserResponseType = {
  id: number;
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  roles: {
    id: number;
    role: UserRoleType;
    userId: number;
  }[];
  city: {
    id: number;
    name: string;
  };
  _count: {
    teacherClasses: number;
    studentClasses: number;
  };
}