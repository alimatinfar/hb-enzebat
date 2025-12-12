'use client'

import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import React from "react";
import {useParams} from "next/navigation";
import useGetQueryParam from "@/hooks/useGetQueryParam";
import QUERY_PARAMS from "@/constances/queryParams";


function TeacherPanelAddAttendancePage() {

  const {classId} = useParams()
  const nameOfClass = useGetQueryParam({queryName: QUERY_PARAMS.CLASS_NAME})

  return (
    <PanelLayout hasBack>
      <PageTitle>
        {`افزودن جلسه ${nameOfClass || ''}`}
      </PageTitle>
    </PanelLayout>
  );
}

export default TeacherPanelAddAttendancePage;