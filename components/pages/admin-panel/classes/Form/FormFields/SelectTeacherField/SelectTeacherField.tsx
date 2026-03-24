import SelectForm from "@/components/Form/Select/SelectForm";
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import {
  selectTeacherFieldLabel,
  selectTeacherFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField.constances";
import useGetSelectCityFieldValue from "@/components/pages/admin-panel/classes/Form/hooks/useGetSelectCityFieldValue";
import {SelectOptionType} from "@/components/Form/Select/select-exports";


type Props = {
  loading: boolean;
  options: SelectOptionType[]
}

function SelectTeacherField(
  {loading, options}: Props
) {

  const requiredErrorMessage = useGetRequiredErrorMessage(selectTeacherFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectTeacherFieldName);

  const {firstSelectCityInputProps} = useGetSelectCityFieldValue()

  return (
    <SelectForm
      fieldName={selectTeacherFieldName}
      inputProps={{
        errorMessage,
        label: selectTeacherFieldLabel,
        ...firstSelectCityInputProps
      }}
      rules={{
        required: requiredErrorMessage
      }}
      selectProps={{
        loading,
        options
      }}
    />
  );
}

export default SelectTeacherField;