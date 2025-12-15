'use client'

import React from 'react';
import {useParams} from "next/navigation";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import PanelLayout from "@/components/layouts/PanelLayout";
import AttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";

function AttendanceDetailPage() {

  const {attendanceId} = useParams()

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        {`مشاهده و ویرایش جلسه`}
      </PageTitle>

      <AttendanceForm editMode />
    </PanelLayout>
  );
}

export default AttendanceDetailPage;