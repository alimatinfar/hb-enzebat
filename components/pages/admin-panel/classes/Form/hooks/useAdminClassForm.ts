import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import APIES from "@/request/constances/apies";
import {
  AdminClassFormBodyData,
  AdminClassFormType
} from "@/components/pages/admin-panel/classes/Form/AdminClassForm.types";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import toastPromise from "@/utils/promises/toastPromise";
import {
  classNameFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField.constances";
import {
  selectTeacherFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField.constances";
import getSelectIdValue from "@/components/Form/Select/utils/getSelectIdValue";
import {
  selectStudentsFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField.constances";
import {useRouter} from "next/navigation";
import useAdminClassFormGetUsersBaseCity
  from "@/components/pages/admin-panel/classes/Form/hooks/useAdminClassFormGetUsersBaseCity";

function useAdminClassForm() {

  const router = useRouter()

  const {mutate, isPending: formLoading} = useMutateData<NextSuccessResponseProps<any>, AdminClassFormBodyData>({
    axiosConfig: {
      url: APIES.ADMIN_ADD_CLASS,
      method: 'POST'
    },
  })

  const onSubmitHandler = function (formData: AdminClassFormType) {
    const data: AdminClassFormBodyData = {
      name: formData[classNameFieldName],
      teacherId: Number(getSelectIdValue(formData[selectTeacherFieldName])),
      cityId: Number(getSelectIdValue(formData[selectCityFieldName])),
      studentIds: formData[selectStudentsFieldName] ? formData[selectStudentsFieldName]?.map(item => Number(item.id)) : []
    }

    mutate(data, {
      onSuccess: async () => {
        toastPromise().then((toast: any) => toast.success('کلاس با موفقیت ایجاد شد'))
         router.back()
      },
    })
  }

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper<AdminClassFormType>({
    onSubmitHandler
  })

  const {
    usersLoading, teachers, students
  } = useAdminClassFormGetUsersBaseCity({
    formMethods
  })

  return {
    formMethods, onSubmit, usersLoading, teachers, students, formLoading
  }
}

export default useAdminClassForm;