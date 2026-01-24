import {Role} from "@/app/generated/prisma/enums";
import ROUTER_LINKS from "@/constances/routerLinks";

type PanelType = {
  roles: Role[],
  label: string,
  link: string
}

export const PANELS: Record<string, PanelType> = {
  ADMIN: {
    roles: [Role.ADMIN],
    label: 'پنل ادمین',
    link: ROUTER_LINKS.ADMIN_PANEL
  },
  STUDENT: {
    roles: [Role.STUDENT],
    label: 'پنل دانش آموز',
    link: ROUTER_LINKS.STUDENT_PANEL
  },
  TEACHER: {
    roles: [Role.TEACHER],
    label: 'پنل معلم',
    link: ROUTER_LINKS.TEACHER_PANEL
  }
}