'use client'

import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";
import ReportCard from "@/components/others/Card/ReportCard";

function AdminHomeReport() {

  //TODO should fetch this data from api
  const reportKeyValues: KeyValueProps[] = useMemo(function () {
    return [
      {
        title: 'تعداد کل کلاس‌ها',
        value: 0
      },
      {
        title: 'تعداد کل متعلمان',
        value: 0
      },
      {
        title: 'تعداد کل جلسات برگزار شده',
        value: 0
      },
      {
        title: 'میانگین درصد حضور متعلمان در جلسات',
        value: `${50}%`
      },
    ]
  }, [])

  return (
    <ReportCard title='گزارش عملکرد کلی' keyValues={reportKeyValues}/>
  );
}

export default AdminHomeReport;