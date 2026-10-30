'use client'

import React, {useMemo, useState} from 'react';
import {useParams} from "next/navigation";
import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReportCard from "@/components/others/Card/ReportCard";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import EmptyState from "@/components/others/RenderLogic/EmptyState";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import StudentSessionCard
  from "@/components/pages/student-panel/StudentSessionCard";
import StudentSessionsFilter, {
  StudentSessionsFilterValue
} from "@/components/pages/student-panel/StudentSessionsFilter";
import {
  StudentClassDetailResponseType, StudentSessionType
} from "@/components/pages/student-panel/StudentPanel.types";

function StudentPanelClassDetailPage() {

  const {classId} = useParams()

  const [sessionsFilter, setSessionsFilter] = useState<StudentSessionsFilterValue>('ALL')

  const {
    data, isFetching, error
  } = useFetchData<StudentClassDetailResponseType>({
    axiosConfig: {
      url: APIES.STUDENT_PANEL_CLASS_DETAIL(String(classId))
    },
    disableThrowErrorToast: true
  })

  const classInfo = data?.class
  const stats = data?.stats

  const sessions: StudentSessionType[] = useMemo(function () {
    return data?.sessions || []
  }, [data])

  const sessionsCounts = useMemo(function () {
    return {
      ALL: sessions.length,
      PRESENT: sessions.filter(session => session.status === 'PRESENT').length,
      EXCUSED: sessions.filter(session => session.status === 'EXCUSED').length,
      ABSENT: sessions.filter(session => session.status === 'ABSENT').length,
    }
  }, [sessions])

  const filteredSessions: StudentSessionType[] = useMemo(function () {
    if (sessionsFilter === 'ALL') return sessions

    return sessions.filter(session => session.status === sessionsFilter)
  }, [sessions, sessionsFilter])

  const classInfoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!classInfo) return []

    return [
      {title: 'شناسه', value: classInfo.id},
      {title: 'نام کلاس', value: classInfo.name},
      {title: 'شهر', value: classInfo.city?.name || '—'},
      {title: 'نوع کلاس', value: classInfo.isVirtual ? 'مجازی' : 'حضوری'},
      {title: 'تعداد دانش آموزان', value: classInfo.studentsCount},
    ]
  }, [classInfo])

  const teacherKeyValues: KeyValueProps[] = useMemo(function () {
    if (!classInfo) return []

    const teacher = classInfo.teacher
    const teacherFullName = `${teacher?.firstName || ''} ${teacher?.lastName || ''}`.trim()

    return [
      {title: 'نام و نام خانوادگی', value: teacherFullName || '—'},
      {title: 'موبایل', value: teacher?.mobile || '—'},
    ]
  }, [classInfo])

  const statsKeyValues: KeyValueProps[] = useMemo(function () {
    if (!stats) return []

    return [
      {title: 'تعداد جلسات', value: stats.totalSessions},
      {title: 'حاضر', value: stats.presentCount},
      {title: 'غایب موجه', value: stats.excusedCount},
      {title: 'غایب', value: stats.absentCount},
      {title: 'درصد حضور', value: `${stats.attendancePercent}%`},
    ]
  }, [stats])

  return (
    <PanelLayout hasBack>
      <PageTitle>
        {classInfo ? `کلاس ${classInfo.name}` : 'اطلاعات کلاس'}
      </PageTitle>

      <RenderLogic error={error} isLoading={isFetching}>
        {classInfo && (
          <div className='flex flex-col gap-y-4'>
            <ReportCard title='اطلاعات کلاس' keyValues={classInfoKeyValues}/>

            <ReportCard title='اطلاعات معلم' keyValues={teacherKeyValues}/>

            <ReportCard title='وضعیت حضور من' keyValues={statsKeyValues}/>

            <div>
              <p className='font-semibold mb-2'>
                جلسات کلاس
              </p>

              {sessions.length === 0 ? (
                <EmptyState title='هنوز جلسه‌ای برای این کلاس تشکیل نشده است'/>
              ) : (
                <div className='space-y-3'>
                  {sessions.map(session => (
                    <StudentSessionCard key={session.id} session={session}/>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </RenderLogic>
    </PanelLayout>
  );
}

export default StudentPanelClassDetailPage;
