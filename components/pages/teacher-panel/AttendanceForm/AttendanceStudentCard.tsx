import CheckBox from "@/components/Form/CheckBox/CheckBox";
import Card, {CardProps} from "@/components/others/Card/Card";
import {
  TeacherPanelStudentType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";
import {AttendanceFormProps} from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";


type Props = {
  student: TeacherPanelStudentType;
  activeList: TeacherPanelStudentType['id'][];
  togglePresentHandler: (studentId: TeacherPanelStudentType['id']) => void;
  cardProps?: Partial<CardProps>;
} & Pick<AttendanceFormProps, 'viewMode'>

function AttendanceStudentCard(
  {student, togglePresentHandler, activeList, cardProps, viewMode}: Props
) {
  return (
    <Card
      key={student.id} className='flex items-center space-x-2'
      {...!viewMode && {
        isClickable: true,
        onClick: () => togglePresentHandler(student.id)
      }}
      {...cardProps}
    >
      <CheckBox
        value={activeList.some(item => item === student.id)}
        removeCursorPointer={viewMode}
      />

      <p>
        {`${student.firstName} ${student.lastName}`}
      </p>
    </Card>
  );
}

export default AttendanceStudentCard;