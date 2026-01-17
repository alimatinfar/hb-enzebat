import {useCallback, useEffect, useMemo} from "react";
import APIES from "@/request/constances/apies";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import {useParams, useRouter} from "next/navigation";
import toastPromise from "@/utils/promises/toastPromise";
import getMiladiFormattedDate from "@/components/Form/DatePicker/utils/getMiladiFormattedDate";
import {
  attendanceDateFieldName,
  AttendanceDateFieldType
} from "@/components/pages/teacher-panel/AttendanceForm/FormFields/AttendanceDateField";
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {AttendanceFormProps} from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";
import {
  TeacherPanelStudentType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";
import {CustomDatePickerProps} from "@/components/Form/DatePicker/DatePickerExports";

type FormDataType = {
  [attendanceDateFieldName]: AttendanceDateFieldType;
}

type BodyDataType = {
  date?: string;
  presents: TeacherPanelStudentType['id'][];
  excusedAbsences: TeacherPanelStudentType['id'][];
}

type Props = {
  presents: TeacherPanelStudentType['id'][];
  excusedAbsences: TeacherPanelStudentType['id'][];
  defaultDateValue: CustomDatePickerProps['value'];
  openExcusedAbsencesModalHandler: () => void;
} & Pick<AttendanceFormProps, 'editMode'>

function useAttendanceFormSubmit(
  {editMode, presents, excusedAbsences, defaultDateValue, openExcusedAbsencesModalHandler}:Props
) {

  const {classId, attendanceId} = useParams()

  const submitApiUrl = useMemo(function () {
    return editMode ?
      APIES.TEACHER_PANEL_CLASS_ATTENDANCE_EDIT(String(classId), String(attendanceId)) :
      APIES.TEACHER_PANEL_CLASS_ATTENDANCES_ADD(String(classId))
  }, [editMode])

  const {mutate, isPending: formLoading} = useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
    axiosConfig: {
      url: submitApiUrl, method: editMode ? 'PUT' : 'POST'
    },
  })

  const router = useRouter()

  const onSubmitHandler = useCallback(async function (formData: FormDataType) {
    openExcusedAbsencesModalHandler()
  }, [mutate, presents])

  const {
    onSubmit, formMethods
  } = useReactHookFormWrapper({
    onSubmitHandler
  })

  const {setValue, getValues} = formMethods

  const finalSubmitHandler = useCallback(async function () {
    const formData: FormDataType = getValues()

    const toast: any = await toastPromise()
    if (presents.length === 0) return toast.error(' حاضرین را انتخاب نمایید', {toastId: 'select-presents'})

    const data: BodyDataType = {
      ...editMode ? {} : {date: String(getMiladiFormattedDate(formData[attendanceDateFieldName] || ''))},
      presents,
      excusedAbsences,
    }

    mutate(data, {
      onSuccess: async () => {
        toast.success(`جلسه با موفقیت ${editMode ? 'ویرایش' : 'ثبت'} شد`)
        router.back()
      },
    })
  }, [mutate, presents, excusedAbsences, getValues])

  useEffect(function () {
    if (!defaultDateValue) return
    setValue(attendanceDateFieldName, defaultDateValue)
  }, [defaultDateValue, setValue])

  return {
    formMethods, onSubmit, formLoading, finalSubmitHandler
  }
}

export default useAttendanceFormSubmit;