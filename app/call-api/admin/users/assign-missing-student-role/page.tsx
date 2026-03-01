'use client'

import {useCallback} from "react";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import toastPromise from "@/utils/promises/toastPromise";
import Card from "@/components/others/Card/Card";
import ButtonWithConfirm from "@/components/Form/Button/inherited/ButtonWithConfirm";

function AssignMissingStudentRolePage() {

  const {mutate, isPending} = useMutateData<
    NextSuccessResponseProps<{ updatedCount: number }>,
    null
  >({
    axiosConfig: {
      url: APIES.ADMIN_ASSIGN_MISSING_STUDENT_ROLE,
      method: 'POST'
    },
  })

  const onConfirmHandler = useCallback(function () {

    mutate(null, {
      onSuccess: async (response) => {
        console.log({response})

        const updatedCount = response.updatedCount

        toastPromise().then((toast) =>
          toast.success(
            updatedCount === 0
              ? 'کاربری بدون نقش یافت نشد'
              : `${updatedCount} کاربر با موفقیت به دانش‌آموز تبدیل شدند`
          )

        )
      },
    })

  }, [mutate])

  return (
    <div className='p-4'>
      <Card className='flex flex-col gap-4'>

        <div className='text-lg font-bold'>
          تخصیص خودکار نقش دانش‌آموز
        </div>

        <div className='text-sm text-gray-600'>
          این عملیات به تمام کاربرانی که هیچ نقشی ندارند،
          نقش «دانش‌آموز» اختصاص می‌دهد.
        </div>

        <ButtonWithConfirm

          buttonProps={{
            loading: isPending,
          }}
          modalProps={{
            title: 'تخصیص نقش دانش‌آموز',
            description: 'آیا از اجرای این عملیات اطمینان دارید؟ این عملیات روی همه کاربران بدون نقش اعمال می‌شود.',
            onConfirmHandler,
            loading: isPending,
          }}
        >
          اجرای عملیات
        </ButtonWithConfirm>

      </Card>
    </div>
  );
}

export default AssignMissingStudentRolePage;