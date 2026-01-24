import getToken from "@/utils/authentication/getToken";
import parseJWT from "@/utils/authentication/parseJWT";
import {Role} from "@/app/generated/prisma/enums";

type TokenDataType = {
  exp: number;
  iat: number;
  id: number;
  mobile: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

function getTokenData() {
  const token = getToken()
  if (!token) return
  return parseJWT(token) as TokenDataType
}

export default getTokenData;