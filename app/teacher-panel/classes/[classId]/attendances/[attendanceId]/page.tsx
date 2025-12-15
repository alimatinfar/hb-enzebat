'use client'

import React, {useCallback} from 'react';
import {useParams, useRouter} from "next/navigation";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import PanelLayout from "@/components/layouts/PanelLayout";
import AttendanceForm from "@/components/pages/teacher-panel/AttendanceForm/AttendanceForm";
import Button from "@/components/Form/Button/Button";
import DeleteIcon from "@/components/svg/DeleteIcon";
import DeleteModal from "@/components/others/Modal/InheritedModals/DeleteModal";
import APIES from "@/request/constances/apies";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import toastPromise from "@/utils/promises/toastPromise";
import useModalOpenBoolean from "@/hooks/modal/useModalOpenBoolean";


function AttendanceDetailPage() {

  const {classId, attendanceId} = useParams()

  const {mutate, isPending: deleteLoading} = useMutateData<NextSuccessResponseProps<any>, any>({
    axiosConfig: {
      url: APIES.TEACHER_PANEL_CLASS_ATTENDANCE_DELETE(String(classId), String(attendanceId)), method: 'DELETE'
    },
  })

  const {
    shouldBeRemoved, open, openModalHandler, closeModal,
  } = useModalOpenBoolean(false)

  const router = useRouter()

  const deleteHandler = useCallback(async function () {
    mutate({}, {
      onSuccess: async () => {
        const toast: any = await toastPromise()
        toast.success(`جلسه با موفقیت حذف شد`)
        router.back()
      },
    })
  }, [mutate])

  return (
    <PanelLayout hasBack hasBottomFixedButton>
      <PageTitle>
        <div className='flex items-center space-x-2 w-full'>
          <p className='flex-1'>
            مشاهده و ویرایش جلسه
          </p>

          <div>
            <Button
              variant='link' size='sm' fullWidth onClick={openModalHandler}
              rightIcon={<DeleteIcon width='20' height='20' textColor='text-primary'/>}
            >
              حذف
            </Button>
          </div>
        </div>
      </PageTitle>

      <AttendanceForm editMode/>

      {!shouldBeRemoved && (
        <DeleteModal
          onConfirmHandler={deleteHandler} loading={deleteLoading} open={open}
          onClose={closeModal} title='حذف جلسه' description='آیا از حذف جلسه مطمئن هستید؟'
        />
      )}
    </PanelLayout>
  );
}

export default AttendanceDetailPage;