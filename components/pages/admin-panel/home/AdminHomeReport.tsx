'use client'

import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import ReportCard from "@/components/others/Card/ReportCard";
import {AdminHomeResponseType} from "@/components/pages/admin-panel/home/AdminHome.types";

type Props = {
  data: AdminHomeResponseType['stats'] | undefined;
}

function AdminHomeReport(
  {data}: Props
) {

  //TODO should fetch this data from api
  const reportKeyValues: KeyValueProps[] = useMemo(function () {
    if (!data) return []

    return [
      {
        title: 'تعداد کل کلاس‌ها',
        value: data?.totalClasses
      },
      {
        title: 'تعداد کل متعلمان',
        value: data?.totalStudents
      },
      {
        title: 'تعداد کل جلسات برگزار شده',
        value: data?.totalSessions
      },
      {
        title: 'میانگین درصد حضور متعلمان در جلسات',
        value: `${data?.averageAttendancePercentage}%`
      },
    ]
  }, [data])

  return (
    <ReportCard title='گزارش عملکرد کلی' keyValues={reportKeyValues}/>
  );
}

export default AdminHomeReport;