'use client'

import {useMemo, useState} from "react";
import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import Card from "@/components/others/Card/Card";
import KeyValue from "@/components/others/KeyValue/KeyValue";


type ReportResponseType = {
  totalStudents: number
  totalClasses: number
  totalSessions: number
  averageAttendancePercent: number
}

function ReportsPage() {

  const [cityId, setCityId] = useState<string | undefined>()

  const {
    data,
    isFetching,
    refetch
  } = useFetchData<ReportResponseType>({
    axiosConfig: {
      url: APIES.ADMIN_REPORT,
      ...cityId && {params: {cityId}}
    }
  })

  const report = useMemo(() => data ?? null, [data])

  const fields = report ? [
    { title: 'تعداد کل دانش‌آموزان', value: report.totalStudents },
    { title: 'تعداد کل کلاس‌ها', value: report.totalClasses },
    { title: 'تعداد کل جلسات برگزار شده', value: report.totalSessions },
    { title: 'میانگین درصد حضور', value: `${report.averageAttendancePercent}%` },
  ] : []

  return (
    <div className='p-4 flex flex-col gap-6'>

      {/* فیلتر شهر - فقط برای ادمین کل */}
      <Card className='gap-4'>
        <div className='flex gap-4 items-end'>
          {/*<div className='w-64'>*/}
          {/*  <Select*/}
          {/*    label='فیلتر بر اساس شهر'*/}
          {/*    value={cityId}*/}
          {/*    onChange={(value: any) => setCityId(value)}*/}
          {/*    options={[*/}
          {/*      { label: 'همه شهرها', value: '' },*/}
          {/*      { label: 'شهر 1', value: '1' },*/}
          {/*      { label: 'شهر 2', value: '2' },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</div>*/}

          {/*<Button onClick={() => refetch()}>*/}
          {/*  اعمال فیلتر*/}
          {/*</Button>*/}
        </div>
      </Card>

      {/* کارت گزارش */}
      <Card className='gap-4'>
        {isFetching && <div>در حال دریافت اطلاعات...</div>}

        {!isFetching && fields.map((field, index) => (
          <KeyValue
            key={index}
            title={field.title}
            value={field.value}
          />
        ))}
      </Card>

    </div>
  );
}

export default ReportsPage;