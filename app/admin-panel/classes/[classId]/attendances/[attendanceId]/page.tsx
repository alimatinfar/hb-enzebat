'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import {useParams} from "next/navigation";
import useFetchData from "@/request/hooks/useFetchData";
import {
  TeacherClassAttendanceResponseType
} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import APIES from "@/request/constances/apies";

function AdminClassAttendanceDetailPage() {

  const {classId, attendanceId} = useParams();

  const {
    data, isFetching, error
  } = useFetchData<TeacherClassAttendanceResponseType>({
    axiosConfig: {
      url: APIES.ADMIN_CLASS_DETAIL_ATTENDANCE_DETAIL(String(classId), String(attendanceId))
    },
    disableThrowErrorToast: true
  })

  return (
    <AdminLayout>
      admin attendance detail {attendanceId}
    </AdminLayout>
  );
}

export default AdminClassAttendanceDetailPage;