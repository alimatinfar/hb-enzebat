'use client'

import React, {useMemo} from 'react';
import PageTitle from "@/components/others/PageTitle/PageTitle";
import PanelLayout from "@/components/layouts/PanelLayout";
import {useParams, useSearchParams} from "next/navigation";
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
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import getJalaliFormattedDate from "@/components/Form/DatePicker/utils/getJalaliFormattedDate";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";
import useGetQueryParam from "@/hooks/useGetQueryParam";
import QUERY_PARAMS from "@/constances/queryParams";
import getUrlWithParams from "@/utils/getUrlWithParams";


function TeacherPanelClassDetailPage() {

  const {classId} = useParams()
  const nameOfClass = useGetQueryParam({queryName: QUERY_PARAMS.CLASS_NAME})

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

  const addAttendanceLinkUrl = useMemo(function () {
    const linkUrl = ROUTER_LINKS.TEACHER_PANEL_CLASSES_ATTENDANCES_ADD(String(classId))
    const linkParams = {
      [QUERY_PARAMS.CLASS_NAME]: nameOfClass
    }
    return getUrlWithParams(linkUrl, linkParams)
  }, [nameOfClass, classId])

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        {`جلسات ${nameOfClass || ''}`}
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching}
      >
        <div className='space-y-4'>
          {attendancesList.map((item, index) => (
            <Card key={index} className='flex flex-col space-y-2'>
              <span className='text-xl font-medium'>
                {getJalaliFormattedDate(item.date)}
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

      <Link href={addAttendanceLinkUrl}>
        <BottomFixedButton>
          افزودن جلسه
        </BottomFixedButton>
      </Link>
    </PanelLayout>
  );
}

export default TeacherPanelClassDetailPage;