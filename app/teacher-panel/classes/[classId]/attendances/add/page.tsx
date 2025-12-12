'use client'

import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import ReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import AttendanceDateField from "@/components/pages/teacher-panel/addAttendance/FormFields/AttendanceDateField";
import useTeacherPanelAddAttendancePage
  from "@/components/pages/teacher-panel/addAttendance/hooks/useTeacherPanelAddAttendancePage";
import Card from "@/components/others/Card/Card";
import CheckBox from "@/components/Form/CheckBox/CheckBox";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import BottomFixedButton from "@/components/Form/Button/inherited/BottomFixedButton";


function TeacherPanelAddAttendancePage() {

  const {
    nameOfClass, formMethods, onSubmit, studentsList, presents, togglePresentHandler, studentsLoading, studentsError,
    addLoading
  } = useTeacherPanelAddAttendancePage()

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        {`افزودن جلسه ${nameOfClass || ''}`}
      </PageTitle>

      <ReactHookFormWrapper
        formMethods={formMethods} onSubmit={onSubmit}
      >
        <AttendanceDateField/>

        <div className='flex flex-col space-y-4 mt-2 pt-2 border-t border-gray-300'>
          <p className='text-gray-500'>
            حاضرین را انتخاب کنید
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
          loading={addLoading} type='submit'
        >
          ثبت جلسه
        </BottomFixedButton>
      </ReactHookFormWrapper>
    </PanelLayout>
  );
}

export default TeacherPanelAddAttendancePage;