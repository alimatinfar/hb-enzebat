'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import useFetchData from "@/request/hooks/useFetchData";
import {
  TeacherClassAttendanceResponseType
} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import APIES from "@/request/constances/apies";
import {useParams} from "next/navigation";

function AdminClassAttendancesPage() {

  const {classId} = useParams()

  const {
    data, isFetching, error
  } = useFetchData<TeacherClassAttendanceResponseType>({
    axiosConfig: {
      url: APIES.ADMIN_CLASS_DETAIL_ATTENDANCES(String(classId))
    },
    disableThrowErrorToast: true
  })

  return (
    <AdminLayout>
      admin attendances
    </AdminLayout>
  );
}

export default AdminClassAttendancesPage;