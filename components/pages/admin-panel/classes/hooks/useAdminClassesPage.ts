import useFetchData from "@/request/hooks/useFetchData";
import {AdminClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import APIES from "@/request/constances/apies";
import {useMemo} from "react";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import useFilter from "@/components/Form/FilterSection/hooks/useFilter";

function useAdminClassesPage() {

  const {
    onSubmitFilter, formMethodsFilter
  } = useFilter({defaultFilterFormData: {}})

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

  return {
    goToAddClassPage, isFetching, error, classesList,

    onSubmitFilter, formMethodsFilter
  }
}

export default useAdminClassesPage;