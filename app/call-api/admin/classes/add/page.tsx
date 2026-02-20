'use client'

import useMutateData from "@/request/hooks/useMutateData";
import { NextSuccessResponseProps } from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import { useCallback } from "react";
import Button from "@/components/Form/Button/Button";
import toastPromise from "@/utils/promises/toastPromise";


type BodyDataType = {
  name: string;
  teacherId: number;
  cityId?: number;
}

function AdminAddClass() {

  const { mutate, isPending } =
    useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
      axiosConfig: {
        url: APIES.ADMIN_ADD_CLASS,
        method: 'POST'
      },
    })

  const onClickHandler = useCallback(function () {

    const data: BodyDataType = {
      name: "اصول فقه",
      teacherId: 56,   // آیدی یک کاربر با نقش TEACHER
      cityId: 2       // فقط اگر ADMIN هستی لازم است
    }

    mutate(data, {
      onSuccess: async () => {
        toastPromise().then((toast: any) =>
          toast.success('کلاس با موفقیت ایجاد شد')
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

export default AdminAddClass;