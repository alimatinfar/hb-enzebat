'use client'

import useMutateData from "@/request/hooks/useMutateData";
import { NextSuccessResponseProps } from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import { useCallback } from "react";
import toastPromise from "@/utils/promises/toastPromise";
import Button from "@/components/Form/Button/Button";
import { useParams } from "next/navigation";


type BodyDataType = {
  name?: string;
  teacherId?: number;
  cityId?: number;
}

function EditClassPage() {

  const { classId } = useParams();

  const { mutate, isPending } =
    useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
      axiosConfig: {
        url: APIES.ADMIN_EDIT_CLASS(String(classId)),
        method: 'PUT'
      },
    })

  const onClickHandler = useCallback(function () {

    const data: BodyDataType = {
      name: "اصول فقه ۲",
      teacherId: 66,  // آیدی یک کاربر با نقش TEACHER
      cityId: 2      // فقط اگر ADMIN هستی لازم است
    }

    mutate(data, {
      onSuccess: async () => {
        toastPromise().then((toast: any) =>
          toast.success('ویرایش کلاس با موفقیت انجام شد')
        )
      },
    })

  }, [mutate])

  return (
    <div>
      <Button onClick={onClickHandler} loading={isPending}>
        call api
      </Button>
    </div>
  );
}

export default EditClassPage;