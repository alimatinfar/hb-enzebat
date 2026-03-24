import {SelectOptionType} from "@/components/Form/Select/select-exports";
import getSelectOptionWithId from "@/components/Form/Select/utils/getSelectOptionWithId";


type Props = {
  options: SelectOptionType[]
  id: SelectOptionType['id']
}

function getSelectOptionLabelWithId(
  {options, id}: Props
) {
  return getSelectOptionWithId({options, id})?.name || ''
}

export default getSelectOptionLabelWithId