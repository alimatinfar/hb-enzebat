import Cookies from 'js-cookie'
import {COOKIES_KEY} from "@/constances/cookiesKeys";

function removeToken() {
  Cookies.remove(COOKIES_KEY.TOKEN)
}

export default removeToken;