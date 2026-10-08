'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminUserCard from "@/components/pages/admin-panel/users/AdminUserCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import FilterSection from "@/components/Form/FilterSection/FilterSection";
import SearchField from "@/components/pages/admin-panel/users/FilterFields/SearchField/SearchField";
import SelectCityField from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField";
import ScrollPagination from "@/components/others/ScrollPagination/ScrollPagination";
import {USERS_ROWS_PER_PAGE} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import useAdminUsersPage from "@/components/pages/admin-panel/users/hooks/useAdminUsersPage";
import SuspenseLoading from "@/components/others/Loading/SuspenseLoading";

function AdminUsersPageContent() {

  const {
    usersList, allCount, page, setPage, activeFilterCount,
    onSubmitFilter, formMethodsFilter, resetFilters,
    isFetching, error, isEmpty, goToAddUserPage
  } = useAdminUsersPage()

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
        emptyText='کاربری ثبت نشده است'
      >
        <ScrollPagination
          allCount={allCount} rowsPerPage={USERS_ROWS_PER_PAGE}
          currentPage={page} setPage={setPage}
          loading={false} overflowElement={null}
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
        </ScrollPagination>
      </RenderLogic>
    </AdminLayout>
  )
}

// useSearchParams (داخل useFilter) حین prerender باید داخل مرز Suspense باشد
function AdminUsersPage() {
  return (
    <SuspenseLoading>
      <AdminUsersPageContent/>
    </SuspenseLoading>
  )
}

export default AdminUsersPage;
