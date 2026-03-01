import {Role} from "@/app/generated/prisma/enums";
import getTokenData from "@/utils/authentication/getTokenData";

function hasRole(role: typeof Role[keyof typeof Role]) {

  const tokenData = getTokenData()

  return tokenData?.roles?.includes(role)
}

export default hasRole;