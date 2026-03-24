import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import SelectForm from "@/components/Form/Select/SelectForm";
import {
  selectCityFieldLabel, selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";

function SelectCityField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(selectCityFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectCityFieldName);

  return (
    <SelectForm
      fieldName={selectCityFieldName}
      inputProps={{
        errorMessage,
        label: selectCityFieldLabel
      }}
      rules={{
        required: requiredErrorMessage
      }}
    />
  );
}

export default SelectCityField;