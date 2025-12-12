import {DateObject} from "react-multi-date-picker";


type Props = {
  value: string | undefined | null
}

function convertStringDateToDateObject({value}: Props) {
  return value ? new DateObject(new Date(String(value))) : ''
}

export default convertStringDateToDateObject