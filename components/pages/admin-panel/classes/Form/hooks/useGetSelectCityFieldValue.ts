import {useFormContext, useWatch} from "react-hook-form";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {InputProps} from "@/components/Form/Input/types/InputProps";

function useGetSelectCityFieldValue() {

  const {control} = useFormContext()
  const cityValue = useWatch({name: selectCityFieldName, control})

  const firstSelectCityInputProps: Partial<InputProps> = {
    placeholder: cityValue ? 'انتخاب کنید' : 'ابتدا شهر را انتخاب کنید',
    disabled: !cityValue
  }

  return {
    cityValue, firstSelectCityInputProps
  }
}

export default useGetSelectCityFieldValue;