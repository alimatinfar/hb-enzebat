import {useFormContext, useWatch} from "react-hook-form";
import {
  selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import {InputProps} from "@/components/Form/Input/types/InputProps";
import getTokenData from "@/utils/authentication/getTokenData";
import {useEffect} from "react";
import hasRole from "@/utils/authentication/hasRole";

function useGetSelectCityFieldValue() {

  const {setValue, control} = useFormContext();
  const tokenData = getTokenData()

  useEffect(() => {
    if (!hasRole("CITY_ADMIN")) return
    setValue(selectCityFieldName, tokenData?.city?.id)
  }, []);

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