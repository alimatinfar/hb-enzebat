'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import {AdminUserResponseType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminUserCard from "@/components/pages/admin-panel/users/AdminUserCard";

function AdminUsersPage() {

  //TODO added pagination
  const {
    data, isFetching, error
  } = useFetchData<{ users: AdminUserResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_USERS
    },
    disableThrowErrorToast: true
  })

  const usersList = useMemo(function () {
    if (!data) return []
    return data.users
  }, [data])

  return (
    <AdminLayout>
      <PageTitle>
        لیست کاربران
      </PageTitle>

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