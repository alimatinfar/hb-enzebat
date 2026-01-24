import {useRouter} from "next/navigation";
import getAccessiblePanels from "@/utils/authentication/getAccessiblePanels";
import ROUTER_LINKS from "@/constances/routerLinks";


function useGoToPanel() {

  const router = useRouter()

  function goToPanel() {
    const accessiblePanels = getAccessiblePanels()
    console.log({accessiblePanels})
    if (accessiblePanels.length === 1) {
      router.push(accessiblePanels[0]?.link)
      return
    }

    router.push(ROUTER_LINKS.SELECT_PANEL)
  }

  return {
    goToPanel
  }
}

export default useGoToPanel;