'use client'

import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminClassCard from "@/components/pages/admin-panel/classes/AdminClassCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import useAdminClassesPage from "@/components/pages/admin-panel/classes/hooks/useAdminClassesPage";
import FilterSection from "@/components/Form/FilterSection/FilterSection";
import SearchField from "@/components/pages/admin-panel/users/FilterFields/SearchField/SearchField";
import SelectCityField from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField";
import SuspenseLoading from "@/components/others/Loading/SuspenseLoading";


function AdminClassesPageContent() {

  const {
    goToAddClassPage, isFetching, error, filteredClassesList,
    onSubmitFilter, formMethodsFilter, resetFilters,
    isEmpty, activeFilterCount
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

      <FilterSection
        onSubmit={onSubmitFilter} formMethods={formMethodsFilter} defaultOpen
        activeFilterCount={activeFilterCount} onResetFilters={resetFilters}
      >
        <div className='flex flex-col gap-4'>
          {/* فیلد سرچ متصل به RHF، مثل بقیه فیلدهای فرم */}
          <SearchField/>

          {/* فیلتر شهر فقط برای ادمین کل نمایش داده می‌شود */}
          <SelectCityField required={false}/>
        </div>
      </FilterSection>

      <RenderLogic
        isLoading={isFetching} error={error}
        isEmpty={isEmpty} hasFilter={!!activeFilterCount}
        emptyText='کلاسی ثبت نشده است'
      >
        <div className='flex flex-col gap-4'>
          {filteredClassesList.map(item => {
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

// useSearchParams (داخل useFilter) حین prerender باید داخل مرز Suspense باشد
function AdminClassesPage() {
  return (
    <SuspenseLoading>
      <AdminClassesPageContent/>
    </SuspenseLoading>
  )
}

export default AdminClassesPage;