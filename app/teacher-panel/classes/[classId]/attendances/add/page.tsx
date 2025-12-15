'use client'

import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import useGetQueryParam from "@/hooks/useGetQueryParam";
import QUERY_PARAMS from "@/constances/queryParams";
import AttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";


function TeacherPanelAddAttendancePage() {

  const nameOfClass = useGetQueryParam({queryName: QUERY_PARAMS.CLASS_NAME})

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        {`افزودن جلسه ${nameOfClass || ''}`}
      </PageTitle>

      <AttendanceForm />
    </PanelLayout>
  );
}

export default TeacherPanelAddAttendancePage;