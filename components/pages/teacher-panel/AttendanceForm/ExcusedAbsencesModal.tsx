import {useMemo} from "react"
import Modal, {ModalProps} from "@/components/others/Modal/Modal";
import Button from "@/components/Form/Button/Button";
import {
  TeacherPanelStudentType
} from "@/components/pages/teacher-panel/AttendanceForm/TeacherPanelAttendanceFormExports";
import AttendanceStudentCard from "@/components/pages/teacher-panel/AttendanceForm/AttendanceStudentCard";

type Props = {
  finalSubmitHandler: () => void;
  toggleExcusedAbsencesHandler: (studnetId: TeacherPanelStudentType['id']) => void;
  presents: TeacherPanelStudentType['id'][];
  excusedAbsences: TeacherPanelStudentType['id'][];
  studentsList: TeacherPanelStudentType[];
  formLoading: boolean;
} & Pick<ModalProps, 'open' | 'onClose'>

function ExcusedAbsencesModal(
  {
    open, onClose, excusedAbsences, presents, studentsList, finalSubmitHandler,
    toggleExcusedAbsencesHandler, formLoading
  }: Props
) {

  const absencesStudents = useMemo(function () {
    return studentsList.filter(item => !presents.includes(item.id))
  }, [presents, studentsList])

  return (
    <Modal
      open={open} onClose={onClose} title='ثبت غیبت موجه'
    >
      <div className='flex flex-col space-y-4'>
        <p>
          افرادی که غیبت موجه داشتند را ثبت کنید
        </p>

        <div className='flex flex-col space-y-2 max-h-80 overflow-y-auto'>
          {absencesStudents.map((student) => (
            <AttendanceStudentCard
              key={student.id} student={student} activeList={excusedAbsences}
              togglePresentHandler={toggleExcusedAbsencesHandler}
              cardProps={{backgroundClass: 'bg-gray-50'}}
            />
          ))}
        </div>

        <Button onClick={finalSubmitHandler} loading={formLoading}>
          ثبت
        </Button>
      </div>
    </Modal>
  );
}

export default ExcusedAbsencesModal;