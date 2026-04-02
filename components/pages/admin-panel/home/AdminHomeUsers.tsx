import {useMemo} from "react";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {
  AdminUserResponseStructureType
} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import AdminHomeShortCutCard, {
  AdminHomeShortCutCardProps
} from "@/components/pages/admin-panel/home/AdminHomeShortCutCard";
import ROUTER_LINKS from "@/constances/routerLinks";
import UserIcon from "@/components/svg/UserIcon";
import {AdminHomeResponseType} from "@/components/pages/admin-panel/home/AdminHome.types";


type Props = {
  data: AdminHomeResponseType['latestUsers'] | undefined;
}

function AdminHomeUsers({data}: Props) {

  const lastUsers: AdminHomeShortCutCardProps['items'] = useMemo(function () {
    if (!data) return []

    return data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      cityName: user.city?.name || ''
    }))
  }, [data])

  return (
    <AdminHomeShortCutCard
      title='کاربران' items={lastUsers}
      link={ROUTER_LINKS.ADMIN_PANEL_USERS} RowIcon={UserIcon}
    />
  );
}

export default AdminHomeUsers;