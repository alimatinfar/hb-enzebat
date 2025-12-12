import getJalaliDateObject from "@/utils/date/getJalaliDateObject";

function getJalaliFormattedDateTime(value: string | Date) {
  return value == null ? '-' : getJalaliDateObject(value).format('YYYY/MM/DD | HH:mm')
}

export default getJalaliFormattedDateTime