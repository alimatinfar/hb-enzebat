'use client'

import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import Card from "@/components/others/Card/Card";
import {ClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import hasRole from "@/utils/authentication/hasRole";
import CardRowLink from "@/components/others/Card/CardRowLink";
import ROUTER_LINKS from "@/constances/routerLinks";
import AdminLayout from "@/components/layouts/AdminLayout";


function AdminClassesPage() {

  //TODO added pagination
  const {
    data, isFetching, error
  } = useFetchData<{ classes: ClassResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classesList = useMemo(function () {
    if (!data) return []
    return data.classes
  }, [data])

  return (
    <AdminLayout>
      <PageTitle>
        لیست کلاس‌ها
      </PageTitle>

      <RenderLogic
        isLoading={isFetching} error={error}
      >
        <div className='flex flex-col gap-4'>
          {classesList.map(item => {
            return (
              <Card key={item.id} className='gap-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-medium pb-1'>
                    {item.name}
                  </span>

                  {hasRole('ADMIN') && (
                    <span className='text-gray-500 text-sm'>
                      {item.city?.name || ''}
                    </span>
                  )}
                </div>

                <div className='pt-2 mt-2 border-t border-gray-300'>
                  <CardRowLink link={ROUTER_LINKS.ADMIN_PANEL_CLASS_DETAIL(item.id)}>
                    مشاهده و ویرایش
                  </CardRowLink>
                </div>
              </Card>
            )
          })}
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminClassesPage;