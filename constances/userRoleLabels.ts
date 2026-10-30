import {Role} from "@/app/generated/prisma/enums";

export const USER_ROLE_LABELS: Record<Role, string> = {
  [Role.ADMIN]: 'ادمین',
  [Role.CITY_ADMIN]: 'ادمین شهری',
  [Role.TEACHER]: 'معلم',
  [Role.STUDENT]: 'دانش آموز',
}
