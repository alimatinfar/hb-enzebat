import {Role} from "@/app/generated/prisma/enums";
import {SelectOptionType} from "@/components/Form/Select/select-exports";
import {selectCityFieldName} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {searchFieldName} from "@/components/pages/admin-panel/users/FilterFields/SearchField/SearchField.constances";

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

export type AdminUsersFilterType = {
  [searchFieldName]?: string;
  [selectCityFieldName]?: SelectOptionType | '';
}

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