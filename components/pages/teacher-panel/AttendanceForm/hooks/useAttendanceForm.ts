import {AttendanceFormProps} from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";
import useAttendanceFormPresents from "@/components/pages/teacher-panel/AttendanceForm/hooks/useAttendanceFormPresents";
import useAttendanceFormSubmit from "@/components/pages/teacher-panel/AttendanceForm/hooks/useAttendanceFormSubmit";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useParams} from "next/navigation";
import {
  TeacherPanelAttendanceInfoResponseType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";

function useAttendanceForm(
  {editMode}: Pick<AttendanceFormProps, 'editMode'>
) {

  const {classId, attendanceId} = useParams()

  const {
    data: attendanceInfo, isFetching: attendanceInfoLoading, error: attendanceInfoError
  } = useFetchData<TeacherPanelAttendanceInfoResponseType>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASS_ATTENDANCE_INFO(String(classId), String(attendanceId))
    },
    disableThrowErrorToast: true,
    options: {
      enabled: !!editMode
    }
  })

  const {
    studentsList, studentsLoading, studentsError, togglePresentHandler, presents,
    excusedAbsences, excusedAbsencesModalShouldBeRemoved,
    excusedAbsencesOpen, openExcusedAbsencesModalHandler, closeExcusedAbsencesModal, toggleExcusedAbsencesHandler
  } = useAttendanceFormPresents({editMode, attendanceInfo})

  const {
    formMethods, onSubmit, formLoading, finalSubmitHandler
  } = useAttendanceFormSubmit({
    editMode, presents, defaultDateValue: attendanceInfo?.date || '', openExcusedAbsencesModalHandler,
    excusedAbsences
  })

  return {
    formMethods, onSubmit, studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
    formLoading, attendanceInfoLoading, attendanceInfoError, excusedAbsences,
    excusedAbsencesModalShouldBeRemoved, excusedAbsencesOpen,
    closeExcusedAbsencesModal, toggleExcusedAbsencesHandler, finalSubmitHandler
  }
}

export default useAttendanceForm;