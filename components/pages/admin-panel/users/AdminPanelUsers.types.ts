import {Role} from "@/app/generated/prisma/enums";

export type UserRoleType = typeof Role[keyof typeof Role]

export type UserResponseType = {
  id: number;
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  roles: [
    {
      id: number;
      role: UserRoleType;
      userId: 1;
    }
  ];
  city: {
    id: number;
    name: string;
  };
  _count: {
    teacherClasses: number;
    studentClasses: number;
  };
}