'use client'

import React, {useMemo} from 'react';
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import {TeacherClassType} from "@/components/pages/teacher-panel/home/TeacherPanelHomeExports";
import Card from "@/components/others/Card/Card";
import ArrowIcon from "@/components/svg/ArrowIcon";
import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";

function TeacherPanelHomePage() {

  const {
    data, isFetching, error
  } = useFetchData({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classes: TeacherClassType[] = useMemo(() => data?.classes || [], [data])

  return (
    <PanelLayout hasBack>
      <PageTitle>
        دروس
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching}
      >
        <div className='space-y-4'>
          {classes.map((item, index) => (
            <Card key={index} className='flex items-center justify-between space-x-2' isClickable>
              <span className='font-medium text-xl'>
                {item?.name}
              </span>

              <ArrowIcon className='rotate-90' />
            </Card>
          ))}
        </div>
      </RenderLogic>
    </PanelLayout>
  );
}

export default TeacherPanelHomePage;