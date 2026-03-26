import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {ReactHookFormWrapperProps} from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {AdminClassDetailResponseStructureType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import {useEffect, useMemo} from "react";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import setDefaultValuesFromObject
  from "@/components/Form/FormLayout/ReactHookFormWrapper/utils/setDefaultValuesFromObject";
import {
  classNameFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField.constances";
import {
  selectTeacherFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField.constances";
import {
  selectStudentsFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField.constances";
import {AdminClassFormType} from "@/components/pages/admin-panel/classes/Form/AdminClassForm.types";

type Props = {
  setValue: ReactHookFormWrapperProps['formMethods']['setValue'];
  isEditMode: boolean;
  classId: string | undefined;
}

function useAdminClassFormEdit(
  {setValue, isEditMode, classId}: Props
) {

  const {
    data, isFetching
  } = useFetchData<AdminClassDetailResponseStructureType>({
    axiosConfig: {
      url: APIES.ADMIN_CLASS_DETAIL(String(classId))
    },
    options: {
      enabled: isEditMode
    }
  })

  const classInfo = data?.class

  const classNameValue = useMemo(function () {
    return classInfo ? classInfo?.name : ''
  }, [classInfo])

  useEffect(() => {
    if (!isEditMode || !classInfo) return

    const teacherInfo = classInfo?.teacher

    const defaultValues: AdminClassFormType = {
      [classNameFieldName]: classInfo?.name,
      [selectCityFieldName]: classInfo?.city,
      [selectTeacherFieldName]: {id: teacherInfo.id, name: `${teacherInfo?.firstName} ${teacherInfo?.lastName}`},
      [selectStudentsFieldName]: classInfo.students?.map((student) => ({
        id: student?.id, name: `${student?.firstName} ${student?.lastName}`
      })),
    }

    setDefaultValuesFromObject({setValue, defaultValues})
  }, [classInfo, isEditMode]);

  return {
    classNameValue, detailInfoLoading: isFetching
  }
}

export default useAdminClassFormEdit;