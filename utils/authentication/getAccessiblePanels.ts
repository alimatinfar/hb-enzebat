import getTokenData from "@/utils/authentication/getTokenData";
import {PANELS} from "@/constances/panels";


function getAccessiblePanels() {
  const tokenData = getTokenData()

  const allPanels = Object.values(PANELS)

  return allPanels.filter(panel => {
    return panel.roles.some(role => {
      return tokenData?.roles?.includes(role)
    })
  })
}

export default getAccessiblePanels;