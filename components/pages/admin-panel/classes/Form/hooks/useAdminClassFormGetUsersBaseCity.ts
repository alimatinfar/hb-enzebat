import {useWatch} from "react-hook-form";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {SelectOptionType} from "@/components/Form/Select/select-exports";
import {AdminUserResponseStructureType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import getUrlWithParams from "@/utils/getUrlWithParams";
import APIES from "@/request/constances/apies";
import useFetchData from "@/request/hooks/useFetchData";
import {useCallback, useMemo} from "react";
import {Role} from "@/app/generated/prisma/enums";
import {
  ReactHookFormWrapperProps
} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";


type Props = {
  formMethods: ReactHookFormWrapperProps['formMethods']
}

function useAdminClassFormGetUsersBaseCity(
  {formMethods}: Props
) {

  const cityValue = useWatch({
    name: selectCityFieldName,
    control: formMethods.control
  }) as (undefined | SelectOptionType)

  const {
    data: usersData, isFetching: usersLoading, error
  } = useFetchData<AdminUserResponseStructureType>({
    axiosConfig: {
      url: getUrlWithParams(APIES.ADMIN_USERS, {cityId: cityValue?.id})
    },
    options: {
      enabled: !!cityValue
    }
  })

  const getUsersBaseRole: (currentRole: Role) => SelectOptionType[] = useCallback(function (currentRole: Role) {
    const usersList = usersData?.users || []

    return usersList?.filter(user => {
      return user.roles?.map(role => role.role)?.includes(currentRole)
    })?.map(user => ({
      id: user.id, name: `${user.firstName} ${user.lastName}`
    }))
  }, [usersData])

  const teachers = useMemo(function () {
    return getUsersBaseRole(Role.TEACHER)
  }, [getUsersBaseRole])

  const students = useMemo(function () {
    return getUsersBaseRole(Role.STUDENT)
  }, [getUsersBaseRole])

  return {
    usersLoading, teachers, students
  }
}

export default useAdminClassFormGetUsersBaseCity;