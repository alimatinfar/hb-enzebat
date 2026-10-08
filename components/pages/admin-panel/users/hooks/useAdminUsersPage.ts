import {useEffect, useMemo, useState} from "react";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {
  AdminUserResponseStructureType,
  AdminUsersFilterType
} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import {USERS_ROWS_PER_PAGE} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import {selectCityFieldName} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {searchFieldName} from "@/components/pages/admin-panel/users/FilterFields/SearchField/SearchField.constances";
import useFilter from "@/components/Form/FilterSection/hooks/useFilter";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import convertPersianNumberToEnglish from "@/utils/convertPersianNumberToEnglish";

// دیفالت‌های صریح فیلدها تا resetFilters بتواند اینپوت‌ها را هم پاک کند
const defaultUsersFilterFormData: AdminUsersFilterType = {
  [searchFieldName]: '',
  [selectCityFieldName]: '',
}

function useAdminUsersPage() {

  // کل لیست یک بار گرفته می‌شود؛ اسکرول پیجینیشن، سرچ و فیلتر شهر سمت کلاینت انجام می‌شود
  const {data, isFetching, error} = useFetchData<AdminUserResponseStructureType>({
    axiosConfig: {
      url: APIES.ADMIN_USERS
    },
    disableThrowErrorToast: true
  })

  const {
    filters, onSubmitFilter, formMethodsFilter, resetFilters, activeFilterCount
  } = useFilter<AdminUsersFilterType>({
    defaultFilterFormData: defaultUsersFilterFormData
  })

  // هر «صفحه»، یک بخش ۲۰تایی از لیست فیلترشده است که با اسکرول اضافه می‌شود
  const [page, setPage] = useState(1)

  const usersList = useMemo(function () {
    if (!data) return []
    return data.users
  }, [data])

  const searchQuery = filters.data?.[searchFieldName] || ''

  const selectedCity = filters.data?.[selectCityFieldName]
  const selectedCityId = selectedCity && typeof selectedCity === 'object'
    ? selectedCity.id
    : undefined

  const filteredUsersList = useMemo(function () {
    let list = usersList

    if (selectedCityId) {
      list = list.filter(user => user.city?.id === Number(selectedCityId))
    }

    const query = convertPersianNumberToEnglish(searchQuery.trim()).toLowerCase()
    if (!query) return list

    return list.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return fullName.includes(query)
        || user.mobile.includes(query)
        || (user.city?.name || '').toLowerCase().includes(query)
    })
  }, [usersList, searchQuery, selectedCityId])

  const visibleUsersList = useMemo(function () {
    return filteredUsersList.slice(0, page * USERS_ROWS_PER_PAGE)
  }, [filteredUsersList, page])

  // با اعمال فیلتر (submit فرم)، از ۲۰ آیتم اول شروع می‌شود
  useEffect(function () {
    setPage(1)
  }, [filters.data])

  const router = useRouter()

  const goToAddUserPage = function () {
    router.push(ROUTER_LINKS.ADMIN_PANEL_USER_ADD)
  }

  return {
    usersList: visibleUsersList, allCount: filteredUsersList.length,
    page, setPage,
    onSubmitFilter, formMethodsFilter, resetFilters, hasActiveFilter: activeFilterCount > 0,
    isFetching, error,
    isEmpty: !isFetching && !error && filteredUsersList.length === 0,
    hasFilter: Boolean(searchQuery.trim()) || Boolean(selectedCityId),
    goToAddUserPage
  }
}

export default useAdminUsersPage
