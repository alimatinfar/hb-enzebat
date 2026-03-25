import {useParams} from "next/navigation";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {AdminUserDetailResponseStructureType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";
import {useEffect, useMemo} from "react";
import setDefaultValuesFromObject
  from "@/components/Form/FormLayout/ReactHookFormWrapper/utils/setDefaultValuesFromObject";
import {ReactHookFormWrapperProps} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {
  firstNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/FirstNameField/FirstNameField.constances";
import {AdminUserFormType} from "@/components/pages/admin-panel/users/Form/AdminUserForm.types";
import {
  lastNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/LastNameField/LastNameField.constances";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {
  SELECT_ROLES_OPTIONS,
  selectRolesFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/SelectRolesField/SelectRolesField.constances";
import {mobileFieldName} from "@/components/pages/auth/FormFields/MobileField";
import {passwordFieldName} from "@/components/pages/auth/FormFields/PasswordField";
import getSelectOptionLabelWithId from "@/components/Form/Select/utils/getSelectOptionLabelWithId";


type Props = {
  setValue: ReactHookFormWrapperProps['formMethods']['setValue'];
  isEditMode: boolean;
  userId: string | undefined;
}

function useAdminUserFormEdit(
  {setValue, isEditMode, userId}: Props
) {

  const {
    data, isFetching
  } = useFetchData<AdminUserDetailResponseStructureType>({
    axiosConfig: {
      url: APIES.ADMIN_USER_DETAIL(String(userId))
    },
    options: {
      enabled: isEditMode
    }
  })

  const fullName = useMemo(function () {
    const user = data?.user
    return user ? `${user.firstName} ${user.lastName}` : ''
  }, [data])

  useEffect(() => {
    if (!isEditMode || !data?.user) return
    const user = data?.user

    const defaultValues: AdminUserFormType = {
      [firstNameFieldName]: user.firstName,
      [lastNameFieldName]: user.lastName,
      [selectCityFieldName]: {id: user.city?.id, name: user.city?.name},
      [selectRolesFieldName]: user.roles?.map(item => {
        return {id: item.role, name: getSelectOptionLabelWithId({options: SELECT_ROLES_OPTIONS, id: item.role})}
      }),
      [mobileFieldName]: user.mobile,
      [passwordFieldName]: user.password,
    }

    setDefaultValuesFromObject({setValue, defaultValues})
  }, [data, isEditMode]);

  return {
    fullName, detailInfoLoading: isFetching, isEditMode
  }
}

export default useAdminUserFormEdit;