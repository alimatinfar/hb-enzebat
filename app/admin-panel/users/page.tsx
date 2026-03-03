'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import Card from "@/components/others/Card/Card";
import ROUTER_LINKS from "@/constances/routerLinks";
import {UserResponseType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import {USER_ROLE_LABELS} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import CardRowLink from "@/components/others/Card/CardRowLink";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";

function AdminUsersPage() {

  const {
    data, isFetching, error
  } = useFetchData<{ users: UserResponseType[] }>({
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
              <Card key={item.id} className='gap-2'>
                <div className='flex items-center justify-between'>
                <span className='text-lg font-medium'>
                  {`${item.firstName} ${item.lastName}`}
                </span>

                  <span className='text-gray-500 text-sm'>
                  {item.city?.name || ''}
                </span>
                </div>

                <div className='flex items-center gap-x-2 mt-2 text-sm'>
                  {item.roles?.map((role) => USER_ROLE_LABELS[role.role])
                    .join(', ')}
                </div>

                <div className='pt-2 mt-2 border-t border-gray-300'>
                  <CardRowLink link={ROUTER_LINKS.ADMIN_PANEL_USER_DETAIL(item.id)}>
                    مشاهده و ویرایش
                  </CardRowLink>
                </div>
              </Card>
            )
          })}
        </div>
      </RenderLogic>
    </AdminLayout>
  )
}

export default AdminUsersPage;