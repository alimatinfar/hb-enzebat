import {useMemo, useState} from "react";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {AdminUserResponseStructureType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import {USERS_ROWS_PER_PAGE} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import convertPersianNumberToEnglish from "@/utils/convertPersianNumberToEnglish";

function useAdminUsersPage() {

  // کل لیست یک بار گرفته می‌شود؛ اسکرول پیجینیشن و سرچ سمت کلاینت انجام می‌شود
  const {data, isFetching, error} = useFetchData<AdminUserResponseStructureType>({
    axiosConfig: {
      url: APIES.ADMIN_USERS
    },
    disableThrowErrorToast: true
  })

  // هر «صفحه»، یک بخش ۲۰تایی از لیست فیلترشده است که با اسکرول اضافه می‌شود
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const usersList = useMemo(function () {
    if (!data) return []
    return data.users
  }, [data])

  const filteredUsersList = useMemo(function () {
    const query = convertPersianNumberToEnglish(searchQuery.trim()).toLowerCase()
    if (!query) return usersList

    return usersList.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return fullName.includes(query)
        || user.mobile.includes(query)
        || (user.city?.name || '').toLowerCase().includes(query)
    })
  }, [usersList, searchQuery])

  const visibleUsersList = useMemo(function () {
    return filteredUsersList.slice(0, page * USERS_ROWS_PER_PAGE)
  }, [filteredUsersList, page])

  function changeSearchQuery(value: string) {
    setSearchQuery(value)
    // با تغییر سرچ، از ۲۰ آیتم اول نتیجه شروع می‌شود
    setPage(1)
  }

  const router = useRouter()

  const goToAddUserPage = function () {
    router.push(ROUTER_LINKS.ADMIN_PANEL_USER_ADD)
  }

  return {
    usersList: visibleUsersList, allCount: filteredUsersList.length,
    page, setPage, searchQuery, changeSearchQuery,
    isFetching, error,
    isEmpty: !isFetching && !error && filteredUsersList.length === 0,
    goToAddUserPage
  }
}

export default useAdminUsersPage
