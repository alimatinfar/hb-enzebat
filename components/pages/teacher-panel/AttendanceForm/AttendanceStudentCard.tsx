import CheckBox from "@/components/Form/CheckBox/CheckBox";
import Card, {CardProps} from "@/components/others/Card/Card";
import {
  TeacherPanelStudentType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";


type Props = {
  student: TeacherPanelStudentType;
  activeList: TeacherPanelStudentType['id'][];
  togglePresentHandler: (studentId: TeacherPanelStudentType['id']) => void;
  cardProps?: Partial<CardProps>;
}

function AttendanceStudentCard(
  {student, togglePresentHandler, activeList, cardProps}: Props
) {
  return (
    <Card
      key={student.id} className='flex items-center space-x-2' isClickable
      onClick={() => togglePresentHandler(student.id)} {...cardProps}
    >
      <CheckBox
        value={activeList.some(item => item === student.id)}
      />

      <p>
        {`${student.firstName} ${student.lastName}`}
      </p>
    </Card>
  );
}

export default AttendanceStudentCard;