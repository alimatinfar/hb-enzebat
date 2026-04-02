'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import AdminHomeReport from "@/components/pages/admin-panel/home/AdminHomeReport";
import AdminHomeUsers from "@/components/pages/admin-panel/home/AdminHomeUsers";
import AdminHomeClasses from "@/components/pages/admin-panel/home/AdminHomeClasses";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {AdminHomeResponseType} from "@/components/pages/admin-panel/home/AdminHome.types";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";


function AdminPanelPage() {

  const {
    data, isFetching, error
  } = useFetchData<AdminHomeResponseType>({
    axiosConfig: {
      url: APIES.ADMIN_HOME
    },
    disableThrowErrorToast: true
  })

  return (
    <AdminLayout>
      <RenderLogic isLoading={isFetching} error={error}>
        <div className='flex flex-col gap-y-4'>
          <AdminHomeReport data={data?.stats} />

          <AdminHomeUsers data={data?.latestUsers} />

          <AdminHomeClasses data={data?.latestClasses} />
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminPanelPage;