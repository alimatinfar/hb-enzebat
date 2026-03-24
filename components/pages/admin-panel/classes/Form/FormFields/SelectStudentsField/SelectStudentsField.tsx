import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import SelectForm from "@/components/Form/Select/SelectForm";
import {
  selectStudentsFieldLabel, selectStudentsFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectStudentsField/SelectStudentsField.constances";

function SelectStudentsField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(selectStudentsFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectStudentsFieldName);

  return (
    <SelectForm
      fieldName={selectStudentsFieldName}
      inputProps={{
        errorMessage,
        label: selectStudentsFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      selectProps={{
        mode: 'multiple'
      }}
    />
  );
}

export default SelectStudentsField;