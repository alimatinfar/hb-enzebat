import Cookies from 'js-cookie'
import {encrypt} from "./EncryptDecrypt";
import {COOKIES_KEY} from "@/constances/cookiesKeys";


async function setToken(token:string, isMainServer?: boolean) {
  if (!token) return
  const encryptedToken = encrypt(JSON.stringify(token));

  const config:any = {
    ...isMainServer ? {
      secure: true,
      sameSite: 'strict',
    } : {},
    expires: 1
  }

  Cookies.set(COOKIES_KEY.TOKEN, encryptedToken, config)
}

export default setToken;