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
import Button from "@/components/Form/Button/Button";
import EditIcon from "@/components/svg/EditIcon";
import DeleteIcon from "@/components/svg/DeleteIcon";
import Link from "next/link";
import ROUTER_LINKS from "@/constances/routerLinks";


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
      url: APIES.ADMIN_USERS
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
      url: APIES.ADMIN_DELETE_USER(String(activeDeleteUserId)), method: 'DELETE'
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

            <div className='grid grid-cols-2 gap-4 mt-4'>
              <Link href={ROUTER_LINKS.CALL_API_ADMIN_EDIT_USER(item.id)}>
                <Button
                  rightIcon={<EditIcon textColor='text-primary' />}
                  variant='link' size='sm'
                >
                  ویرایش
                </Button>
              </Link>

              <ButtonWithConfirm
                buttonProps={{
                  onClick: () => setActiveDeleteUserId(item.id),
                  size: 'sm', variant: 'link',
                  rightIcon: <DeleteIcon textColor='text-primary' width={20} height={20} />
                }}
                modalProps={{
                  title: 'حذف کاربر', loading: deleteLoading, onConfirmHandler: onDeleteHandler,
                  description: 'آیا از حذف این کاربر مطمئن هستید؟',
                }}
              >
                حذف
              </ButtonWithConfirm>
            </div>
          </Card>
        )
      })}
    </div>
  );
}

export default UsersListPage;