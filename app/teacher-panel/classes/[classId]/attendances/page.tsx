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
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import ReportCard from "@/components/others/Card/ReportCard";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import Button from "@/components/Form/Button/Button";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";
import useGetQueryParam from "@/hooks/useGetQueryParam";
import QUERY_PARAMS from "@/constances/queryParams";
import getUrlWithParams from "@/utils/getUrlWithParams";
import EditIcon from "@/components/svg/EditIcon";
import AddCircleIcon from "@/components/svg/AddCircleIcon";
import AttendanceCard from "@/components/pages/teacher-panel/AttendanceCard/AttendanceCard";


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

  const classInfo = data?.class

  const classInfoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!classInfo) return []

    return [
      {title: 'شناسه', value: classInfo.id},
      {title: 'شهر', value: classInfo.city?.name || '—'},
      {title: 'نام کلاس', value: classInfo.name},
      {title: 'نوع کلاس', value: classInfo.isVirtual ? 'مجازی' : 'حضوری'},
      {title: 'تعداد دانش آموزان', value: classInfo._count?.students ?? 0},
    ]
  }, [classInfo])

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
        {`${classInfo?.name || nameOfClass || ''}`}
      </PageTitle>

      {classInfo && (
        <div className='mb-4'>
          <ReportCard title='اطلاعات کلاس' keyValues={classInfoKeyValues}/>
        </div>
      )}

      <PageTitle small>
        جلسات
      </PageTitle>

      <RenderLogic
        error={error} isLoading={isFetching} isEmpty={attendancesList.length === 0}
        emptyText='جلسه ای ثبت نشده است، با دکمه افزودن جلسه در پایین صفحه، جلسه جدید ایجاد کنید'
      >
        <div className='space-y-4'>
          {attendancesList.map((item, index) => (
            <AttendanceCard item={item} key={index}>
              <Link href={ROUTER_LINKS.TEACHER_PANEL_CLASSES_ATTENDANCE_DETAIL(String(classId), String(item.id))}>
                <Button
                  variant='outlined' size='sm' rightIcon={<EditIcon textColor='text-primary'/>}
                >
                  مشاهده و ویرایش
                </Button>
              </Link>
            </AttendanceCard>
          ))}
        </div>
      </RenderLogic>

      <Link href={addAttendanceLinkUrl}>
        <BottomFixedButton
          rightIcon={<AddCircleIcon/>}
        >
          افزودن جلسه
        </BottomFixedButton>
      </Link>
    </PanelLayout>
  );
}

export default TeacherPanelClassDetailPage;