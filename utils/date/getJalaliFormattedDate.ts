import getJalaliDateObject from "@/utils/date/getJalaliDateObject";

function getJalaliFormattedDate(value:string | Date) {
  return value == null ? '-' : getJalaliDateObject(value).format('YYYY/MM/DD')
}

export default getJalaliFormattedDate