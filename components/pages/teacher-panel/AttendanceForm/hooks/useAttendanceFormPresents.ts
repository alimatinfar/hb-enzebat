import {useCallback, useEffect, useMemo, useState} from "react";
import APIES from "@/request/constances/apies";
import {
  TeacherPanelAttendanceInfoResponseType,
  TeacherPanelStudentsResponseType,
  TeacherPanelStudentType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";
import useFetchData from "@/request/hooks/useFetchData";
import {useParams} from "next/navigation";
import {AttendanceFormProps} from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";
import useModalOpenBoolean from "@/hooks/modal/useModalOpenBoolean";

type Props = {
  attendanceInfo: TeacherPanelAttendanceInfoResponseType | undefined;
} & Pick<AttendanceFormProps, 'editMode'>

function useAttendanceFormPresents(
  {editMode, attendanceInfo}: Props
) {

  const {classId} = useParams()

  const [presents, setPresents] = useState<TeacherPanelStudentType['id'][]>([])

  const [excusedAbsences, setExcusedAbsences] = useState<TeacherPanelStudentType['id'][]>([])

  const {
    shouldBeRemoved: excusedAbsencesModalShouldBeRemoved,
    open: excusedAbsencesOpen, openModalHandler: openExcusedAbsencesModalHandler,
    closeModal: closeExcusedAbsencesModal,
  } = useModalOpenBoolean(false)

  const toggleExcusedAbsencesHandler = useCallback(function (studentId: TeacherPanelStudentType['id']) {
    setExcusedAbsences(prev => {
      if (prev.some(item => item === studentId)) {
        return prev.filter(item => item !== studentId)
      } else {
        return [...prev, studentId]
      }
    })
  }, [setPresents])

  const togglePresentHandler = useCallback(function (studentId: TeacherPanelStudentType['id']) {
    setPresents(prev => {
      if (prev.some(item => item === studentId)) {
        return prev.filter(item => item !== studentId)
      } else {
        if (excusedAbsences.some(item => item === studentId)) {
          setExcusedAbsences(prev => prev.filter(item => item !== studentId))
        }

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

  useEffect(() => {
    if (!attendanceInfo || !editMode) return
    setPresents(attendanceInfo?.presents?.map(item => item.id))
    setExcusedAbsences(attendanceInfo?.excusedAbsences?.map(item => item.id))
  }, [attendanceInfo]);

  return {
    studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
    excusedAbsences, excusedAbsencesModalShouldBeRemoved,
    excusedAbsencesOpen, openExcusedAbsencesModalHandler, closeExcusedAbsencesModal, toggleExcusedAbsencesHandler
  }
}

export default useAttendanceFormPresents;