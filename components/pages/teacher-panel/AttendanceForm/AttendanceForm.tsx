'use client'

import React from 'react';
import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import AttendanceDateField from "@/components/pages/teacher-panel/AttendanceForm/FormFields/AttendanceDateField";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import useAttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/hooks/useAttendanceForm";
import Card from "@/components/others/Card/Card";
import CheckBox from "@/components/Form/CheckBox/CheckBox";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";
import AddCircleIcon from "@/components/svg/AddCircleIcon";
import EditIcon from "@/components/svg/EditIcon";


export type AttendanceFormProps = {
  editMode?: boolean;
}

function AttendanceForm(
  {editMode}: AttendanceFormProps
) {

  const {
    formMethods, onSubmit, studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
    formLoading, attendanceInfoLoading, attendanceInfoError
  } = useAttendanceForm({
    editMode
  })

  return (
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
                  <Card
                    key={student.id} className='flex items-center space-x-2' isClickable
                    onClick={() => togglePresentHandler(student.id)}
                  >
                    <CheckBox
                      value={presents.some(item => item === student.id)}
                    />

                    <p>
                      {`${student.firstName} ${student.lastName}`}
                    </p>
                  </Card>
                ))}
              </div>
            </RenderLogic>
          </div>

          <BottomFixedButton
            loading={formLoading} type='submit'
            rightIcon={editMode ? <EditIcon textColor='text-white' /> : <AddCircleIcon />}
          >
            {editMode ? 'ویرایش' : 'ثبت'} جلسه
          </BottomFixedButton>
        </>
      </RenderLogic>
    </ReactHookFormWrapper>
  );
}

export default AttendanceForm;