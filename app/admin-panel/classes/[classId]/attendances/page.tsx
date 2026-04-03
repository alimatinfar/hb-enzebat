'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import useFetchData from "@/request/hooks/useFetchData";
import {
  TeacherClassAttendanceResponseType, TeacherClassAttendanceType
} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import APIES from "@/request/constances/apies";
import {useParams} from "next/navigation";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import React, {useMemo} from "react";
import AttendanceCard from "@/components/pages/teacher-panel/AttendanceCard/AttendanceCard";
import ROUTER_LINKS from "@/constances/routerLinks";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import CardRowLink from "@/components/others/Card/CardRowLink";

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

  const attendancesList: TeacherClassAttendanceType[] = useMemo(function () {
    return data?.attendanceList || []
  }, [data])

  const nameOfClass = useMemo(function () {
    return data?.class?.name || ''
  }, [data])

  return (
    <AdminLayout>
      <PageTitle>
        {`جلسات ${nameOfClass || ''}`}
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching} isEmpty={attendancesList.length === 0}
        emptyText='جلسه ای ثبت نشده است'
      >
        <div className='space-y-4'>
          {attendancesList.map((item, index) => (
            <AttendanceCard item={item} key={index}>
              <div className='py-2 border-t border-gray-300'>
                <CardRowLink link={ROUTER_LINKS.ADMIN_PANEL_CLASS_ATTENDANCE_DETAIL(String(classId), String(item.id))}>
                  مشاهده جزئیات
                </CardRowLink>
              </div>
            </AttendanceCard>
          ))}
        </div>
      </RenderLogic>
    </AdminLayout>
  );
}

export default AdminClassAttendancesPage;