'use client'

import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import {ClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminClassCard from "@/components/pages/admin-panel/classes/AdminClassCard";


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