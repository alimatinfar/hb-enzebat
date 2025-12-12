import getJalaliDateObject from "@/components/Form/DatePicker/utils/getJalaliDateObject";

function getJalaliFormattedDate(value:string | Date) {
  return value == null ? '-' : getJalaliDateObject(value).format('YYYY/MM/DD')
}

export default getJalaliFormattedDate