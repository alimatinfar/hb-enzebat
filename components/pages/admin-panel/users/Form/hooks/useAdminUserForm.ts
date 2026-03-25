import {mobileFieldName} from "@/components/pages/auth/FormFields/MobileField";
import {passwordFieldName} from "@/components/pages/auth/FormFields/PasswordField";
import {useParams, useRouter} from "next/navigation";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import {
  AdminUserFormBodyDataType,
  AdminUserFormType
} from "@/components/pages/admin-panel/users/Form/AdminUserForm.types";
import APIES from "@/request/constances/apies";
import {
  firstNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/FirstNameField/FirstNameField.constances";
import {
  lastNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/LastNameField/LastNameField.constances";
import {
  selectRolesFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/SelectRolesField/SelectRolesField.constances";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import getSelectIdValue from "@/components/Form/Select/utils/getSelectIdValue";
import toastPromise from "@/utils/promises/toastPromise";
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import useAdminUserFormEdit from "@/components/pages/admin-panel/users/Form/hooks/useAdminUserFormEdit";
import {useMemo} from "react";

function useAdminUserForm() {

  const {userId} = useParams()

  const isEditMode = useMemo(() => userId != null, [userId])

  const router = useRouter()

  const {mutate, isPending: formLoading} = useMutateData<NextSuccessResponseProps<any>, AdminUserFormBodyDataType>({
    axiosConfig: {
      url: isEditMode ? APIES.ADMIN_EDIT_USER(String(userId)) : APIES.ADMIN_ADD_USER,
      method: isEditMode ? 'PUT' : 'POST'
    },
  })

  const onSubmitHandler = function (formData: AdminUserFormType) {
    const data: AdminUserFormBodyDataType = {
      mobile: formData[mobileFieldName],
      password: formData[passwordFieldName],
      firstName: formData[firstNameFieldName],
      lastName: formData[lastNameFieldName],
      roles: formData[selectRolesFieldName] ? formData[selectRolesFieldName]?.map(item => String(item.id)) : [],
      cityId: Number(getSelectIdValue(formData[selectCityFieldName]))
    }

    mutate(data, {
      onSuccess: async () => {
        toastPromise().then((toast: any) => toast.success(`${isEditMode ? 'ویرایش' : 'افزودن'} کاربر با موفقیت انجام شد`))
        router.back()
      },
    })
  }

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper<AdminUserFormType>({
    onSubmitHandler
  })

  const {
    fullName, detailInfoLoading
  } = useAdminUserFormEdit({
    setValue: formMethods.setValue, isEditMode, userId: String(userId)
  })

  return {
    formMethods, onSubmit, formLoading, fullName, detailInfoLoading, isEditMode
  }
}

export default useAdminUserForm;