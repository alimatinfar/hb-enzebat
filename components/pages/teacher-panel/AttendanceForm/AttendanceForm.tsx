'use client'

import React, {lazy} from 'react';
import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import AttendanceDateField from "@/components/pages/teacher-panel/AttendanceForm/FormFields/AttendanceDateField";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import useAttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/hooks/useAttendanceForm";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import AddCircleIcon from "@/components/svg/AddCircleIcon";
import EditIcon from "@/components/svg/EditIcon";
import AttendanceStudentCard from "@/components/pages/teacher-panel/AttendanceForm/AttendanceStudentCard";

const ExcusedAbsencesModal = lazy(() => import("@/components/pages/teacher-panel/AttendanceForm/ExcusedAbsencesModal"));


export type AttendanceFormProps = {
  editMode?: boolean;
}

function AttendanceForm(
  {editMode}: AttendanceFormProps
) {

  const {
    formMethods, onSubmit, studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
    formLoading, attendanceInfoLoading, attendanceInfoError, excusedAbsences,
    excusedAbsencesModalShouldBeRemoved, excusedAbsencesOpen,
    closeExcusedAbsencesModal, toggleExcusedAbsencesHandler, finalSubmitHandler
  } = useAttendanceForm({
    editMode
  })

  return (
    <>
      <ReactHookFormWrapper
        formMethods={formMethods} onSubmit={onSubmit}
      >
        <RenderLogic
          isLoading={attendanceInfoLoading} error={attendanceInfoError}
        >
          <>
            <AttendanceDateField
              defaultValue={editMode ? '' : new Date()}
              disabled={editMode}
            />

            <div className='flex flex-col space-y-4 mt-2 pt-2 border-t border-gray-300'>
              <p className='text-gray-500'>
                حاضرین را انتخاب کنید ({presents.length})
              </p>

              <RenderLogic
                error={studentsError} isLoading={studentsLoading}
              >

                <div className='flex flex-col space-y-2'>
                  {studentsList.map((student) => (
                    <AttendanceStudentCard
                      key={student.id} student={student} activeList={presents}
                      togglePresentHandler={togglePresentHandler}
                    />
                  ))}
                </div>
              </RenderLogic>
            </div>

            <BottomFixedButton
              type='submit' disabled={studentsLoading || !!studentsError}
              rightIcon={editMode ? <EditIcon textColor='text-white'/> : <AddCircleIcon/>}
            >
              {editMode ? 'ویرایش' : 'ثبت'} جلسه
            </BottomFixedButton>
          </>
        </RenderLogic>
      </ReactHookFormWrapper>

      {!excusedAbsencesModalShouldBeRemoved && (
        <ExcusedAbsencesModal
          excusedAbsences={excusedAbsences} formLoading={formLoading}
          open={excusedAbsencesOpen} onClose={closeExcusedAbsencesModal} finalSubmitHandler={finalSubmitHandler}
          studentsList={studentsList} presents={presents} toggleExcusedAbsencesHandler={toggleExcusedAbsencesHandler}
        />
      )}
    </>
  );
}

export default AttendanceForm;