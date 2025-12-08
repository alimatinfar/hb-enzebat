import {getErrorResponseData, getErrorStatus, getResponseErrorMessage} from "@/request/utils/getResponse";
import {useCallback, useState} from "react";
import useLogout from "@/request/hooks/useLogout";


export type DisableThrowErrorToast = boolean | string[]

type ClientErrorType = {
  error: any;
  status: 403 | 500 | null;
}

function useRequestErrorHandling() {

  const {logoutHandler} = useLogout()

  const [clientError, setClientError] = useState<ClientErrorType>({
    error: null, status: null
  })

  // useEffect(() => {
  //   if (!clientError.error || !clientError.status) return
  //   throw new Response(clientError.error, {status: ERROR_STATES_KEYS[clientError.status]})
  // }, [clientError]);

  const requestErrorHandling = useCallback(async function (
    error: any, disableThrowErrorToast?:DisableThrowErrorToast
  ) {
    const errorStatusCode = getErrorStatus(error)

    const {toast} = await import("react-toastify");

    if (errorStatusCode === 401) {
      logoutHandler()
      return toast.error?.('توکن شما منضی شده است', {toastId: 'logout-error'})
    }
    if (errorStatusCode === 403) {
      logoutHandler()
      return toast.error?.('شما به این قسمت دسترسی ندارید', {toastId: 'logout-error'})
    }
    // if (errorStatusCode >= 500) {
    //   setClientError({error, status: 500})
    // }

    const errorResponseData = getErrorResponseData(error)

    if (typeof disableThrowErrorToast === 'boolean' && disableThrowErrorToast) return

    const disableThrowToastIsArray = Array.isArray(disableThrowErrorToast)

    if (disableThrowToastIsArray) return

    toast.error?.(getResponseErrorMessage(error))
  }, [getErrorResponseData])

  return {
    requestErrorHandling
  }
}

export default useRequestErrorHandling