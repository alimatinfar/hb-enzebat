import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function getJalaliDateObject(value: string | Date) {
  return new DateObject(new Date(value)).convert(persian, persian_fa)
}

export default getJalaliDateObject