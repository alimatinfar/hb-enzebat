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

type Props = {
  attendanceInfo: TeacherPanelAttendanceInfoResponseType | undefined;
} & Pick<AttendanceFormProps, 'editMode'>

function useAttendanceFormPresents(
  {editMode, attendanceInfo}: Props
) {

  const {classId} = useParams()

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

  useEffect(() => {
    if (!attendanceInfo || !editMode) return
    setPresents(attendanceInfo?.presents?.map(item => item.id))
  }, [attendanceInfo]);

  return {
    studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
  }
}

export default useAttendanceFormPresents;