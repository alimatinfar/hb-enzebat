'use client'

import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminClassCard from "@/components/pages/admin-panel/classes/AdminClassCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import useAdminClassesPage from "@/components/pages/admin-panel/classes/hooks/useAdminClassesPage";


function AdminClassesPage() {

  const {
    goToAddClassPage, isFetching, error, classesList
  } = useAdminClassesPage()

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