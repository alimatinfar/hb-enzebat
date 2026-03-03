'use client'

import Card from "@/components/others/Card/Card";
import KeyValue, {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import {useMemo} from "react";

function AdminHomeReport() {

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
    <Card backgroundClass='bg-white'>
      <p className='text-center font-semibold pb-2'>
        گزارش عملکرد کلی
      </p>

      <div className='flex flex-col gap-y-1'>
        {reportKeyValues.map(({title, value}, index) => (
          <KeyValue key={index} title={title} value={value} />
        ))}
      </div>
    </Card>
  );
}

export default AdminHomeReport;