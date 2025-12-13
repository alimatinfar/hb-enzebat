import {DateObject} from "react-multi-date-picker";

function getMiladiFormattedDate(value:string | Date | DateObject) {
  // @ts-ignore
  return new DateObject(new Date(value)).format('YYYY-MM-DD')
}

export default getMiladiFormattedDate