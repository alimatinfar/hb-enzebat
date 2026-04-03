import Card from "@/components/others/Card/Card";
import KeyValue from "@/components/others/KeyValue/KeyValue";
import getJalaliFormattedDate from "@/components/Form/DatePicker/utils/getJalaliFormattedDate";
import {TeacherClassAttendanceType} from "@/components/pages/teacher-panel/classDetail/TeacherPanelClassDetailExports";
import {ReactNode} from "react";


type Props = {
  item: TeacherClassAttendanceType;
  children: ReactNode;
}

function AttendanceCard(
  {item, children}: Props
) {
  return (
    <Card className='flex flex-col space-y-2.5'>
      <span className='text-xl font-medium'>
        {getJalaliFormattedDate(item.date)}
      </span>

      <KeyValue
        title='تعداد حاضرین به کل' value={`${item.presentCount} از ${item.totalStudents}`}
      />
      <KeyValue
        title='تعداد غائبین موجه' value={`${item.excusedAbsencesCount} از ${(item.totalStudents - item.presentCount)}`}
      />

      {children}
    </Card>
  );
}

export default AttendanceCard;