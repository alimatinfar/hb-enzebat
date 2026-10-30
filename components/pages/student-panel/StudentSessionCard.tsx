import Card from "@/components/others/Card/Card";
import Chips from "@/components/others/Chips/Chips";
import getJalaliFormattedDate from "@/components/Form/DatePicker/utils/getJalaliFormattedDate";
import {studentAttendanceStatusMeta} from "@/components/pages/student-panel/StudentPanel.constances";
import {StudentSessionType} from "@/components/pages/student-panel/StudentPanel.types";

type Props = {
  session: StudentSessionType;
}

function StudentSessionCard({session}: Props) {

  const statusMeta = studentAttendanceStatusMeta[session.status]

  return (
    <Card className='flex items-center justify-between space-x-2'>
      <span className='font-medium'>
        {getJalaliFormattedDate(session.date)}
      </span>

      <Chips text={statusMeta.label} color={statusMeta.color}/>
    </Card>
  );
}

export default StudentSessionCard;
