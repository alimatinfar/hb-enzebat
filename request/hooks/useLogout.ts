'use client'

import {useCallback} from "react";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import removeToken from "@/utils/authentication/removeToken";

function useLogout() {

  const router = useRouter()

  const logoutHandler = useCallback(function () {
    removeToken()
    router.push(ROUTER_LINKS.LOGIN)
  }, [router])

  return {
    logoutHandler
  }
}

export default useLogout;