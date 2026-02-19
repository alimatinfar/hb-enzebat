'use client'

import useFetchData from "@/request/hooks/useFetchData";
import APIES from "@/request/constances/apies";
import {useCallback, useMemo, useState} from "react";
import Card from "@/components/others/Card/Card";
import KeyValue from "@/components/others/KeyValue/KeyValue";
import ButtonWithConfirm from "@/components/Form/Button/inherited/ButtonWithConfirm";
import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import toastPromise from "@/utils/promises/toastPromise";


type UserResponseType = {
  id: 1,
  mobile: string,
  password: string,
  firstName: string,
  lastName: string,
  cityId: 1,
  roles: [
    {
      id: 1,
      role: string,
      userId: 1
    }
  ],
  city: {
    id: 1,
    name: string
  }
}

function UsersListPage() {

  const {
    data, isFetching, error, refetch
  } = useFetchData<{ users: UserResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_USER
    },
    disableThrowErrorToast: true
  })


  const usersList = useMemo(function () {
    if (!data) return []
    return data.users
  }, [data])

  //delete
  const [activeDeleteUserId, setActiveDeleteUserId] = useState<UserResponseType['id']>()

  const {mutate: deleteMutate, isPending: deleteLoading} = useMutateData<NextSuccessResponseProps<any>, null>({
    axiosConfig: {
      url: `${APIES.ADMIN_USER}/${activeDeleteUserId}/delete`, method: 'DELETE'
    },
  })

  const onDeleteHandler = useCallback(function () {
    deleteMutate(null, {
      onSuccess: async (response) => {
        toastPromise().then((toast: any) => toast.success('حذف کاربر با موفقیت انجام شد'))
        refetch().then()
      },
    })
  }, [deleteMutate])

  return (
    <div className='p-4 flex flex-col gap-4'>
      {usersList.map(item => {

        const fields = [
          {title: 'شناسه', value: item.id},
          {title: 'نام و نام خانوادگی', value: `${item.firstName} ${item.lastName}`},
          {title: 'موبایل', value: item.mobile},
          {title: 'شهر', value: item.city?.name},
          {title: 'نقش ها', value: item.roles?.map(role => role.role).join(', ')},
        ]

        return (
          <Card key={item.id} className='gap-2'>
            {fields.map((field, index) => (
              <KeyValue key={index} title={field.title} value={field.value} />
            ))}
            <ButtonWithConfirm
              buttonProps={{
                onClick: () => setActiveDeleteUserId(item.id),
                size: 'sm', variant: 'outlined'
              }}
              modalProps={{
                title: 'حذف کاربر', loading: deleteLoading, onConfirmHandler: onDeleteHandler,
                description: 'آیا از حذف این کاربر مطمئن هستید؟',
              }}
            >
              حذف
            </ButtonWithConfirm>
          </Card>
        )
      })}
    </div>
  );
}

export default UsersListPage;