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
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";


type ClassResponseType = {
  id: number,
  name: string,
  cityId: number | null,
  teacher: {
    id: number,
    firstName: string,
    lastName: string,
    mobile: string
  },
  city: {
    id: number,
    name: string
  } | null,
  _count: {
    students: number,
    attendance: number
  }
}

function ClassesListPage() {

  const {
    data, isFetching, error, refetch
  } = useFetchData<{ classes: ClassResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_CLASSES
    },
    disableThrowErrorToast: true
  })

  const classesList = useMemo(function () {
    if (!data) return []
    return data.classes
  }, [data])

  // delete
  const [activeDeleteClassId, setActiveDeleteClassId] = useState<ClassResponseType['id']>()

  const {mutate: deleteMutate, isPending: deleteLoading} =
    useMutateData<NextSuccessResponseProps<any>, null>({
      axiosConfig: {
        url: APIES.ADMIN_DELETE_CLASS(String(activeDeleteClassId)),
        method: 'DELETE'
      },
    })

  const onDeleteHandler = useCallback(function () {
    deleteMutate(null, {
      onSuccess: async () => {
        toastPromise().then((toast: any) =>
          toast.success('حذف کلاس با موفقیت انجام شد')
        )
        refetch().then()
      },
    })
  }, [deleteMutate, refetch])

  return (
    <RenderLogic
      isEmpty={classesList.length === 0} error={error} isLoading={isFetching}
    >
      <div className='p-4 flex flex-col gap-4'>
        {classesList.map(item => {

          const fields = [
            {title: 'شناسه', value: item.id},
            {title: 'نام کلاس', value: item.name},
            {
              title: 'معلم',
              value: `${item.teacher?.firstName ?? ''} ${item.teacher?.lastName ?? ''}`
            },
            {title: 'موبایل معلم', value: item.teacher?.mobile},
            {title: 'تعداد دانش‌آموزان', value: item._count?.students},
            {title: 'تعداد جلسات تشکیل شده', value: item._count?.attendance},
          ]

          return (
            <Card key={item.id} className='gap-2'>
              {fields.map((field, index) => (
                <KeyValue key={index} title={field.title} value={String(field.value)}/>
              ))}

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <Link href={ROUTER_LINKS.CALL_API_ADMIN_EDIT_CLASS(item.id)}>
                  <Button
                    rightIcon={<EditIcon textColor='text-primary'/>}
                    variant='link'
                    size='sm'
                  >
                    ویرایش
                  </Button>
                </Link>

                <ButtonWithConfirm
                  buttonProps={{
                    onClick: () => setActiveDeleteClassId(item.id),
                    size: 'sm',
                    variant: 'link',
                    rightIcon: (
                      <DeleteIcon
                        textColor='text-primary'
                        width={20}
                        height={20}
                      />
                    )
                  }}
                  modalProps={{
                    title: 'حذف کلاس',
                    loading: deleteLoading,
                    onConfirmHandler: onDeleteHandler,
                    description: 'آیا از حذف این کلاس مطمئن هستید؟',
                  }}
                >
                  حذف
                </ButtonWithConfirm>
              </div>
            </Card>
          )
        })}
      </div>
    </RenderLogic>
  );
}

export default ClassesListPage;