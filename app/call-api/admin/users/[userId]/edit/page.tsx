'use client'

import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import {useCallback} from "react";
import {Role} from "@/app/generated/prisma/enums";
import toastPromise from "@/utils/promises/toastPromise";
import Button from "@/components/Form/Button/Button";
import {useParams} from "next/navigation";

type BodyDataType = {
  mobile: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  cityId?: number;
}

function EditPage() {

  const {userId} = useParams()

  const {mutate, isPending} = useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
    axiosConfig: {
      url: APIES.ADMIN_EDIT_USER(String(userId)), method: 'PUT'
    },
  })

  const onClickHandler = useCallback(function () {
    const data: BodyDataType = {
      mobile: "111223",
      password: "123456",
      // firstName: "محمدعلی",
      lastName: "متعلم پلاس",
      roles: [Role.TEACHER],
      cityId: 2
    }

    mutate(data, {
      onSuccess: async (response) => {
        toastPromise().then((toast: any) => toast.success('عملیات با موفقیت انجام شد'))
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

export default EditPage;