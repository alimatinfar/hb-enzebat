import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import SelectForm from "@/components/Form/Select/SelectForm";
import {
  selectStudentsFieldLabel, selectStudentsFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField.constances";
import useGetSelectCityFieldValue from "@/components/pages/admin-panel/classes/Form/hooks/useGetSelectCityFieldValue";
import {SelectOptionType} from "@/components/Form/Select/select-exports";

type Props = {
  loading: boolean;
  options: SelectOptionType[]
}

function SelectStudentsField({loading, options}: Props) {
  const requiredErrorMessage = useGetRequiredErrorMessage(selectStudentsFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectStudentsFieldName);

  const {firstSelectCityInputProps} = useGetSelectCityFieldValue()

  return (
    <SelectForm
      fieldName={selectStudentsFieldName}
      inputProps={{
        errorMessage,
        label: selectStudentsFieldLabel,
        ...firstSelectCityInputProps
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      selectProps={{
        mode: 'multiple',
        loading,
        options
      }}
    />
  );
}

export default SelectStudentsField;