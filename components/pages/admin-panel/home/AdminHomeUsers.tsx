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

function AdminHomeUsers() {

  //TODO should implemented api for 3 last users
  const {
    data, isFetching, error
  } = useFetchData<AdminUserResponseStructureType>({
    axiosConfig: {
      url: APIES.ADMIN_USERS
    },
    disableThrowErrorToast: true
  })

  const usersList = useMemo(function () {
    if (!data) return []
    return data.users
  }, [data])

  const lastUsers: AdminHomeShortCutCardProps['items'] = useMemo(function () {
    return usersList.slice(0, 3).map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      cityName: user.city?.name || ''
    }))
  }, [usersList])

  return (
    <AdminHomeShortCutCard
      title='کاربران' isLoading={isFetching} error={error} items={lastUsers}
      link={ROUTER_LINKS.ADMIN_PANEL_USERS} RowIcon={UserIcon}
    />
  );
}

export default AdminHomeUsers;