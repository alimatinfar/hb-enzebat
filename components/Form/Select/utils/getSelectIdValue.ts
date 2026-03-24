import {SelectOptionType} from "@/components/Form/Select/select-exports";

function getSelectIdValue(value: SelectOptionType | '') {
  return value ? value.id : null
}

export default getSelectIdValue;