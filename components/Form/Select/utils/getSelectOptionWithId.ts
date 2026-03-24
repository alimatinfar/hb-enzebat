import {SelectOptionType} from "@/components/Form/Select/select-exports";


type Props = {
  options: SelectOptionType[]
  id: SelectOptionType['id']
}

function getSelectOptionWithId(
  {options, id}: Props
) {
  return options.find(option => option.id === id)
}

export default getSelectOptionWithId