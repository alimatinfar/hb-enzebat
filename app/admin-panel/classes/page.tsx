'use client'

import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import {AdminClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminClassCard from "@/components/pages/admin-panel/classes/AdminClassCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";


function AdminClassesPage() {

  //TODO added pagination
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

  const router = useRouter()

  const goToAddClassPage = function () {
    router.push(ROUTER_LINKS.ADMIN_PANEL_CLASS_ADD)
  }

  return (
    <AdminLayout>
      <PageTitleWithAddButton
        btnProps={{
          children: 'افزودن کلاس',
          onClick: goToAddClassPage
        }}
      >
        لیست کلاس‌ها
      </PageTitleWithAddButton>

      <RenderLogic
        isLoading={isFetching} error={error}
      >
        <div className='flex flex-col gap-4'>
          {classesList.map(item => {
            return (
              <AdminClassCard
                key={item.id} id={item.id} name={item.name} cityName={item.city?.name}
              />
            )
          })}
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminClassesPage;