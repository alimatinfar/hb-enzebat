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
import {useParams, useRouter} from "next/navigation";
import useAdminClassFormGetUsersBaseCity
  from "@/components/pages/admin-panel/classes/Form/hooks/useAdminClassFormGetUsersBaseCity";
import {useMemo} from "react";
import useAdminClassFormEdit from "@/components/pages/admin-panel/classes/Form/hooks/useAdminClassFormEdit";

function useAdminClassForm() {

  const {classId} = useParams()

  const isEditMode = useMemo(() => classId != null, [classId])

  const router = useRouter()

  const {mutate, isPending: formLoading} = useMutateData<NextSuccessResponseProps<any>, AdminClassFormBodyData>({
    axiosConfig: {
      url: isEditMode ? APIES.ADMIN_EDIT_CLASS(String(classId)) : APIES.ADMIN_ADD_CLASS,
      method: isEditMode ? 'PUT' : 'POST'
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
        toastPromise().then((toast: any) => toast.success(`کلاس با موفقیت ${isEditMode ? 'ویرایش' : 'ایجاد'} شد`))
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

  const {
    classNameValue, detailInfoLoading
  } = useAdminClassFormEdit({
    setValue: formMethods.setValue, isEditMode, classId: String(classId)
  })

  return {
    formMethods, onSubmit, usersLoading, teachers, students, formLoading,
    classNameValue, detailInfoLoading, isEditMode
  }
}

export default useAdminClassForm;