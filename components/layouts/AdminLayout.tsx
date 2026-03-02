'use client'

import PanelLayout from "@/components/layouts/PanelLayout";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import BottomNavigation, {BottomNavigationProps} from "@/components/layouts/BottomNavigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import UserIcon from "@/components/svg/UserIcon";
import HomeIcon from "@/components/svg/HomeIcon";
import HangerIcon from "@/components/svg/HangerIcon";
import getTokenData from "@/utils/authentication/getTokenData";
import {Role} from "@/app/generated/prisma/enums";
import hasRole from "@/utils/authentication/hasRole";


const BOTTOM_NAVIGATION_LINKS: BottomNavigationProps['links'] = [
  {
    link: ROUTER_LINKS.ADMIN_PANEL_HOME,
    icon: HomeIcon,
    title: 'خانه',
  },
  {
    link: ROUTER_LINKS.ADMIN_PANEL_USERS,
    icon: UserIcon,
    title: 'کاربران',
  },
  {
    link: ROUTER_LINKS.ADMIN_PANEL_CLASSES,
    //TODO this icon should be changed
    icon: HangerIcon,
    title: 'کلاس‌ها',
  },
]

type Props = Pick<ChildrenAndClassNamePropsType, 'children'>

function AdminLayout(
  {children}: Props
) {

  const tokenData = getTokenData()

  const roleTitle =
    hasRole('ADMIN') ? 'ادمین کل شهرستان‌ها' :
      hasRole('CITY_ADMIN') ? `ادمین شهر ${tokenData?.city?.name}` : 'بدون نقش ادمین'

  return (
    <PanelLayout>
      <div className='mb-2 text-primary text-sm font-semibold rounded-lg p-2 text-center '>
        {roleTitle}
      </div>

      {children}

      <BottomNavigation
        links={BOTTOM_NAVIGATION_LINKS}
      />
    </PanelLayout>
  );
}

export default AdminLayout;