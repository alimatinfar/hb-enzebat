'use client'

import React, {useMemo} from 'react';
import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import StudentClassCard from "@/components/pages/student-panel/StudentClassCard";
import {
  StudentClassesResponseType, StudentClassType
} from "@/components/pages/student-panel/StudentPanel.types";

function StudentPanelClassesPage() {

  const {
    data, isFetching, error
  } = useFetchData<StudentClassesResponseType>({
    axiosConfig: {
      url: APIES.STUDENT_PANEL_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classes: StudentClassType[] = useMemo(function () {
    return data?.classes || []
  }, [data])

  return (
    <PanelLayout>
      <PageTitle>
        کلاس‌های من
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching} isEmpty={classes.length === 0}
        emptyText='شما در هیچ کلاسی عضو نیستید'
      >
        <div className='space-y-4'>
          {classes.map(item => (
            <StudentClassCard key={item.id} item={item}/>
          ))}
        </div>
      </RenderLogic>
    </PanelLayout>
  );
}

export default StudentPanelClassesPage;
