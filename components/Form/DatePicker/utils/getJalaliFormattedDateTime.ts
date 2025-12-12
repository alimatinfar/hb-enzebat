import getJalaliDateObject from "@/components/Form/DatePicker/utils/getJalaliDateObject";

function getJalaliFormattedDateTime(value: string | Date) {
  return value == null ? '-' : getJalaliDateObject(value).format('YYYY/MM/DD | HH:mm')
}

export default getJalaliFormattedDateTime