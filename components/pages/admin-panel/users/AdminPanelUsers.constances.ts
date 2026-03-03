import {Role} from "@/app/generated/prisma/enums";

export const USER_ROLE_LABELS = {
  [Role.ADMIN]: 'ادمین',
  [Role.CITY_ADMIN]: 'ادمین شهری',
  [Role.TEACHER]: 'معلم',
  [Role.STUDENT]: 'دانش آموز',
}