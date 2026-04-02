import {useMemo} from "react";
import AdminHomeShortCutCard, {
  AdminHomeShortCutCardProps
} from "@/components/pages/admin-panel/home/AdminHomeShortCutCard";
import ROUTER_LINKS from "@/constances/routerLinks";
import ClassIcon from "@/components/svg/ClassIcon";
import {AdminHomeResponseType} from "@/components/pages/admin-panel/home/AdminHome.types";

type Props = {
  data: AdminHomeResponseType['latestClasses'] | undefined;
}

function AdminHomeClasses({data}: Props) {

  const lastClasses: AdminHomeShortCutCardProps['items'] = useMemo(function () {
    if (!data) return []

    return data.map(item => ({
      id: item.id,
      name: item.name,
      cityName: item.city?.name || '',
    }))
  }, [data])

  return (
    <AdminHomeShortCutCard
      title='کلاس‌ها' lastTitle='کلاس‌های'
      link={ROUTER_LINKS.ADMIN_PANEL_CLASSES} items={lastClasses} RowIcon={ClassIcon}
    />
  );
}

export default AdminHomeClasses;