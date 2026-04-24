import {SelectOptionType} from "@/components/Form/Select/select-exports";
import {Role} from "@/app/generated/prisma/enums";
import hasRole from "@/utils/authentication/hasRole";

export const selectRolesFieldName = 'selectRoles'
export const selectRolesFieldLabel = 'نقش‌ها'
export type SelectRolesFieldType = SelectOptionType[] | '';

export const SELECT_ROLES_OPTIONS: { id: Role, name: string }[] = [
  ...hasRole('ADMIN') ? [
    {id: Role.ADMIN, name: 'ادمین'},
    {id: Role.CITY_ADMIN, name: 'ادمین شهری'},
  ] : [],
  {id: Role.TEACHER, name: 'معلم'},
  {id: Role.STUDENT, name: 'متعلم(دانش‌آموز)'},
]