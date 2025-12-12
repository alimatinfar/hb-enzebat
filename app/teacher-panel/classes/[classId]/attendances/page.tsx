'use client'

import React, {useMemo} from 'react';
import PageTitle from "@/components/others/PageTitle/PageTitle";
import PanelLayout from "@/components/layouts/PanelLayout";
import {useParams} from "next/navigation";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {
  TeacherClassAttendanceResponseType,
  TeacherClassAttendanceType
} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import Card from "@/components/others/Card/Card";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import KeyValue from "@/components/others/KeyValue/KeyValue";
import Button from "@/components/Form/Button/Button";

function TeacherPanelClassDetailPage() {

  const {classId} = useParams()

  const {
    data, isFetching, error
  } = useFetchData<TeacherClassAttendanceResponseType>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASS_ATTENDANCES(String(classId))
    },
    disableThrowErrorToast: true
  })

  const attendancesList: TeacherClassAttendanceType[] = useMemo(function () {
    return data?.attendanceList || []
  }, [data])

  return (
    <PanelLayout hasBack>
      <PageTitle>
        {`جلسات ${data?.class?.name || ''}`}
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching}
      >
        <div className='space-y-4'>
          {attendancesList.map((item, index) => (
            <Card key={index} className='flex flex-col space-y-2'>
              <span className='text-xl font-medium'>
                {item.date}
              </span>

              <KeyValue
                title='تعداد حاضرین به کل' value={`${item.presentCount} از ${item.totalStudents}`}
              />

              <Button
                variant='link'
              >
                مشاهده و ویرایش
              </Button>
            </Card>
          ))}
        </div>
      </RenderLogic>
    </PanelLayout>
  );
}

export default TeacherPanelClassDetailPage;