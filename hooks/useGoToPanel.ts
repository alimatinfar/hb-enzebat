import {useRouter} from "next/navigation";
import getAccessiblePanels from "@/utils/authentication/getAccessiblePanels";
import ROUTER_LINKS from "@/constances/routerLinks";
import useLogout from "@/request/hooks/useLogout";


function useGoToPanel() {

  const router = useRouter()
  const {logoutHandler} = useLogout()

  function goToPanel() {
    const accessiblePanels = getAccessiblePanels()

    if (accessiblePanels.length === 1) {
      router.replace(accessiblePanels[0]?.link)
      return
    } else if (accessiblePanels.length < 1) {
      logoutHandler()
      return
    } else {
      router.replace(ROUTER_LINKS.SELECT_PANEL)
    }
  }

  return {
    goToPanel
  }
}

export default useGoToPanel;