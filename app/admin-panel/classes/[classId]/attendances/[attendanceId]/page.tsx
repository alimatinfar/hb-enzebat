'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import {useParams} from "next/navigation";
import useFetchData from "@/request/hooks/useFetchData";
import {
  TeacherClassAttendanceResponseType
} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import APIES from "@/request/constances/apies";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import AttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";
import React from "react";

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
    <AdminLayout hasBack>
      <PageTitle>
        جزئیات جلسه
      </PageTitle>

      <AttendanceForm viewMode/>
    </AdminLayout>
  );
}

export default AdminClassAttendanceDetailPage;