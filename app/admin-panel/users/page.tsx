'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import {
  AdminUserResponseStructureType
} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminUserCard from "@/components/pages/admin-panel/users/AdminUserCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

function AdminUsersPage() {

  //TODO added pagination
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

  const router = useRouter()

  const goToAddUserPage = function () {
    router.push(ROUTER_LINKS.ADMIN_PANEL_USER_ADD)
  }

  return (
    <AdminLayout>
      <PageTitleWithAddButton
        btnProps={{
          children: 'افزودن کاربر',
          onClick: goToAddUserPage
        }}
      >
        لیست کاربران
      </PageTitleWithAddButton>

      <RenderLogic
        isLoading={isFetching} error={error}
      >
        <div className='flex flex-col gap-4'>
          {usersList.map(item => {
            return (
              <AdminUserCard
                key={item.id} firstName={item.firstName} lastName={item.lastName} id={item.id}
                cityName={item.city?.name} roles={item.roles}
              />
            )
          })}
        </div>
      </RenderLogic>
    </AdminLayout>
  )
}

export default AdminUsersPage;