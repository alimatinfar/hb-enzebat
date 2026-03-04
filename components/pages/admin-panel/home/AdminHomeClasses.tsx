import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import AdminHomeShortCutCard, {
  AdminHomeShortCutCardProps
} from "@/components/pages/admin-panel/home/AdminHomeShortCutCard";
import ROUTER_LINKS from "@/constances/routerLinks";
import ClassIcon from "@/components/svg/ClassIcon";
import {AdminClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";


function AdminHomeClasses() {

  const {
    data, isFetching, error
  } = useFetchData<{ classes: AdminClassResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classesList = useMemo(function () {
    if (!data) return []
    return data.classes
  }, [data])

  const lastClasses: AdminHomeShortCutCardProps['items'] = useMemo(function () {
    return classesList.slice(0, 3).map(item => ({
      id: item.id,
      name: item.name,
      cityName: item.city?.name || '',
    }))
  }, [classesList])

  return (
    <AdminHomeShortCutCard
      title='کلاس‌ها' lastTitle='کلاس‌های' isLoading={isFetching} error={error}
      link={ROUTER_LINKS.ADMIN_PANEL_CLASSES} items={lastClasses} RowIcon={ClassIcon}
    />
  );
}

export default AdminHomeClasses;