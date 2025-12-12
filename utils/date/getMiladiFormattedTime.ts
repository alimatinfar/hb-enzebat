import {DateObject} from "react-multi-date-picker";

function getMiladiFormattedTime(value:string | Date) {
  return new DateObject(new Date(value)).format('HH:mm')
}

export default getMiladiFormattedTime