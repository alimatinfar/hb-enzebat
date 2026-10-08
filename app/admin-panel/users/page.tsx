'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import AdminUserCard from "@/components/pages/admin-panel/users/AdminUserCard";
import PageTitleWithAddButton from "@/components/others/PageTitle/PageTitleWithAddButton";
import SearchInput from "@/components/Form/Input/inheritedInputs/SearchInput/SearchInput";
import ScrollPagination from "@/components/others/ScrollPagination/ScrollPagination";
import {USERS_ROWS_PER_PAGE} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import useAdminUsersPage from "@/components/pages/admin-panel/users/hooks/useAdminUsersPage";

function AdminUsersPage() {

  const {
    usersList, allCount, page, setPage, searchQuery, changeSearchQuery,
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

      <div className='mb-4'>
        <SearchInput
          // سرچ کلاینت‌ساید و لحظه‌ای هنگام تایپ
          inputProps={{
            value: searchQuery,
            onChange: (e:any) => changeSearchQuery(e.target.value)
          }}
          searchHandler={changeSearchQuery}
        />
      </div>

      <RenderLogic
        isLoading={isFetching} error={error}
        isEmpty={isEmpty} hasFilter={Boolean(searchQuery.trim())}
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

export default AdminUsersPage;
