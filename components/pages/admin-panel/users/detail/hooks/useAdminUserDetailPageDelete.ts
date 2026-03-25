import useMutateData from "@/request/hooks/useMutateData";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import APIES from "@/request/constances/apies";
import {useCallback} from "react";
import toastPromise from "@/utils/promises/toastPromise";
import {useParams, useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

function useAdminUserDetailPageDelete() {

  const {userId} = useParams()
  const router = useRouter()

  const {mutate: deleteMutate, isPending: deleteLoading} = useMutateData<NextSuccessResponseProps<any>, null>({
    axiosConfig: {
      url: APIES.ADMIN_DELETE_USER(String(userId)), method: 'DELETE'
    },
  })

  const onDeleteHandler = useCallback(function () {
    deleteMutate(null, {
      onSuccess: async () => {
        toastPromise().then((toast: any) => toast.success('حذف کاربر با موفقیت انجام شد'))
         router.replace(ROUTER_LINKS.ADMIN_PANEL_USERS)
      },
    })
  }, [deleteMutate, router])

  return {
    deleteLoading, onDeleteHandler
  }
}

export default useAdminUserDetailPageDelete;