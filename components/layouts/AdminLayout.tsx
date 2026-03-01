'use client'

import PanelLayout from "@/components/layouts/PanelLayout";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import BottomNavigation, {BottomNavigationProps} from "@/components/layouts/BottomNavigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import UserIcon from "@/components/svg/UserIcon";
import HomeIcon from "@/components/svg/HomeIcon";
import HangerIcon from "@/components/svg/HangerIcon";


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
    icon: HangerIcon,
    title: 'کلاس‌ها',
  },
]

type Props = Pick<ChildrenAndClassNamePropsType, 'children'>

function AdminLayout(
  {children}: Props
) {
  return (
    <PanelLayout>
      {children}

      <BottomNavigation
        links={BOTTOM_NAVIGATION_LINKS}
      />
    </PanelLayout>
  );
}

export default AdminLayout;