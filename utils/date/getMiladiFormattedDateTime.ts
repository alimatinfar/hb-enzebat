import {DateObject} from "react-multi-date-picker";

function getMiladiFormattedDateTime(value:string | Date) {
  return new DateObject(new Date(value)).format('YYYY/MM/DD | HH:mm')
}

export default getMiladiFormattedDateTime