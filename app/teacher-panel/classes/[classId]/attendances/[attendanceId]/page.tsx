'use client'

import React from 'react';
import {useParams} from "next/navigation";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import PanelLayout from "@/components/layouts/PanelLayout";

function AttendanceDetailPage() {

  const {attendanceId} = useParams()
  console.log({attendanceId})

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        {`جزئیات جلسه`}
      </PageTitle>
      attendance detail page
    </PanelLayout>
  );
}

export default AttendanceDetailPage;