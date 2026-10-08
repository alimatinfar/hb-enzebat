import {useMemo} from "react";
import useFetchData from "@/request/hooks/useFetchData";
import {
  AdminClassResponseType,
  AdminClassesFilterType
} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import APIES from "@/request/constances/apies";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import useFilter from "@/components/Form/FilterSection/hooks/useFilter";
import {selectCityFieldName} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {searchFieldName} from "@/components/pages/admin-panel/users/FilterFields/SearchField/SearchField.constances";
import convertPersianNumberToEnglish from "@/utils/convertPersianNumberToEnglish";

// دیفالت‌های صریح فیلدها تا resetFilters بتواند اینپوت‌ها را هم پاک کند
const defaultClassesFilterFormData: AdminClassesFilterType = {
  [searchFieldName]: '',
  [selectCityFieldName]: '',
}

function useAdminClassesPage() {

  // کل لیست یک بار گرفته می‌شود؛ سرچ و فیلتر شهر سمت کلاینت انجام می‌شود
  const {
    filters, onSubmitFilter, formMethodsFilter, resetFilters, activeFilterCount
  } = useFilter<AdminClassesFilterType>({
    defaultFilterFormData: defaultClassesFilterFormData
  })

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

  const searchQuery = filters.data?.[searchFieldName] || ''

  const selectedCity = filters.data?.[selectCityFieldName]
  const selectedCityId = selectedCity && typeof selectedCity === 'object'
    ? selectedCity.id
    : undefined

  const filteredClassesList = useMemo(function () {
    let list = classesList

    if (selectedCityId) {
      list = list.filter(item => item.city?.id === Number(selectedCityId))
    }

    const query = convertPersianNumberToEnglish(searchQuery.trim()).toLowerCase()
    if (!query) return list

    return list.filter(item =>
      item.name.toLowerCase().includes(query)
      || (item.city?.name || '').toLowerCase().includes(query)
    )
  }, [classesList, searchQuery, selectedCityId])

  const router = useRouter()

  const goToAddClassPage = function () {
    router.push(ROUTER_LINKS.ADMIN_PANEL_CLASS_ADD)
  }

  return {
    goToAddClassPage, isFetching, error,
    filteredClassesList,
    onSubmitFilter, formMethodsFilter, resetFilters,
    isEmpty: !isFetching && !error && filteredClassesList.length === 0,
    activeFilterCount
  }
}

export default useAdminClassesPage;
