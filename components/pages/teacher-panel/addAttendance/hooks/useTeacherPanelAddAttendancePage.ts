import {useParams, useRouter} from "next/navigation";
import useGetQueryParam from "@/hooks/useGetQueryParam";
import QUERY_PARAMS from "@/constances/queryParams";
import {useCallback, useMemo, useState} from "react";
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {
  attendanceDateFieldName,
  AttendanceDateFieldType
} from "@/components/pages/teacher-panel/addAttendance/FormFields/AttendanceDateField";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {
  TeacherPanelStudentsResponseType, TeacherPanelStudentType
} from "@/components/pages/teacher-panel/addAttendance/TeacherPanelAddAttendancePageExports";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import {mobileFieldName} from "@/components/pages/auth/FormFields/MobileField";
import {passwordFieldName} from "@/components/pages/auth/FormFields/PasswordField";
import ROUTER_LINKS from "@/constances/routerLinks";
import setToken from "@/utils/authentication/setToken";
import toastPromise from "@/utils/promises/toastPromise";
import getMiladiFormattedDate from "@/components/Form/DatePicker/utils/getMiladiFormattedDate";

type FormDataType = {
  [attendanceDateFieldName]: AttendanceDateFieldType;
}

type BodyDataType = {
  date: string;
  presents: TeacherPanelStudentType['id'][];
}

function useTeacherPanelAddAttendancePage() {

  const {classId} = useParams()
  const nameOfClass = useGetQueryParam({queryName: QUERY_PARAMS.CLASS_NAME})

  const [presents, setPresents] = useState<TeacherPanelStudentType['id'][]>([])

  const togglePresentHandler = useCallback(function (studentId: TeacherPanelStudentType['id']) {
    setPresents(prev => {
      if (prev.some(item => item === studentId)) {
        return prev.filter(item => item !== studentId)
      } else {
        return [...prev, studentId]
      }
    })
  }, [setPresents])

  const {
    data: studentsData, isFetching: studentsLoading, error: studentsError
  } = useFetchData<TeacherPanelStudentsResponseType>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASS_STUDENTS(String(classId))
    },
    disableThrowErrorToast: true
  })
  const studentsList = useMemo(function () {
    return studentsData?.students || []
  }, [studentsData])

  //add attendance
  const {mutate, isPending: addLoading} = useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASS_ATTENDANCES_ADD(String(classId)), method: 'POST'
    },
  })

  const router = useRouter()

  const onSubmitHandler = useCallback(async function (formData: FormDataType) {
    const toast: any = await toastPromise()
    if (presents.length === 0) return toast.error(' حاضرین را انتخاب نمایید', {toastId: 'select-presents'})

    const data: BodyDataType = {
      date: String(getMiladiFormattedDate(formData[attendanceDateFieldName] || '')),
      presents
    }

    mutate(data, {
      onSuccess: async (response) => {
        toast.success('جلسه با موفقیت ثبت شد')
        router.back()
      },
    })
  }, [mutate, presents])

  const {
    onSubmit, formMethods
  } = useReactHookFormWrapper({
    onSubmitHandler
  })


  return {
    nameOfClass, formMethods, onSubmit, studentsList, presents, togglePresentHandler, studentsLoading,
    studentsError, addLoading
  }
}

export default useTeacherPanelAddAttendancePage;