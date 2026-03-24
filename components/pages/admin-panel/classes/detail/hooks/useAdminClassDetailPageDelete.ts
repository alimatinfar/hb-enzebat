import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import {useCallback, useState} from "react";
import toastPromise from "@/utils/promises/toastPromise";
import {useParams, useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import {AdminClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";

function useAdminClassDetailPageDelete() {

  const {classId} = useParams()

  const router = useRouter()

  const {mutate: deleteMutate, isPending: deleteLoading} = useMutateData<NextSuccessResponseProps<any>, null>({
      axiosConfig: {
        url: APIES.ADMIN_DELETE_CLASS(String(classId)),
        method: 'DELETE'
      },
    })

  const onDeleteHandler = useCallback(function () {
    deleteMutate(null, {
      onSuccess: async () => {
        toastPromise().then((toast: any) =>
          toast.success('حذف کلاس با موفقیت انجام شد')
        )
        router.replace(ROUTER_LINKS.ADMIN_PANEL_CLASSES)
      },
    })
  }, [deleteMutate, router])

  return {
    deleteLoading, onDeleteHandler
  }
}

export default useAdminClassDetailPageDelete;