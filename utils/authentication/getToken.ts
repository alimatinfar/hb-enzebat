import Cookies from 'js-cookie'
import {decrypt} from "./EncryptDecrypt";
import {COOKIES_KEY} from "@/constances/cookiesKeys";


function getToken(): string | undefined {
  const cookieToken = Cookies.get(COOKIES_KEY.TOKEN)
  if (!cookieToken) return

  try {
    const decryptedToken = decrypt(cookieToken)
    return JSON.parse(decryptedToken)
  } catch (err) {
    return
  }
}

export default getToken;