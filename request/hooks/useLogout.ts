import {useCallback} from "react";
import removeToken from "@/utils/authentication/removeToken";
import ROUTER_LINKS from "@/constances/routerLinks";
import {usePathname, useRouter} from "next/navigation";

function useLogout() {

  const router = useRouter()
  const pathname = usePathname()

  const logoutHandler = useCallback(function () {
    removeToken()
    const redirectUrl = pathname.includes('reservation') ? ROUTER_LINKS.RESERVATION_LOGIN : ROUTER_LINKS.LOGIN
    router.push(redirectUrl)
  }, [removeToken])

  return {
    logoutHandler
  }
}

export default useLogout;