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

export type AdminUserResponseStructureType = {users: AdminUserResponseType[]}

export type AdminUserDetailResponseStructureType = {
  user: AdminUserResponseType;
  student?: {
    classes: {
      id: number;
      name: string;
      city: {
        id: number;
        name: string;
      };
    }[];
    totalAttendedSessions: number;
    totalAbsentSessions: number;
    averageAttendancePercent: number;
    excusedAbsencePercent: number;
  };
  teacher?: {
    classes: {
      id: number;
      name: string;
      city: {
        id: number;
        name: string;
      };
    }[];
    totalSessions: number;
    totalStudents: number;
  };
}