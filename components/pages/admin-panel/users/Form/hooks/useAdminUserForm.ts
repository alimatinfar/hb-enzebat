import {mobileFieldName} from "@/components/pages/auth/FormFields/MobileField";
import {passwordFieldName} from "@/components/pages/auth/FormFields/PasswordField";
import {useRouter} from "next/navigation";
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

function useAdminUserForm() {

  const router = useRouter()

  const {mutate, isPending: formLoading} = useMutateData<NextSuccessResponseProps<any>, AdminUserFormBodyDataType>({
    axiosConfig: {
      url: APIES.ADMIN_ADD_USER, method: 'POST'
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
        toastPromise().then((toast: any) => toast.success('عملیات با موفقیت انجام شد'))
        router.back()
      },
    })
  }

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper<AdminUserFormType>({
    onSubmitHandler
  })

  return {
    formMethods, onSubmit, formLoading
  }
}

export default useAdminUserForm;