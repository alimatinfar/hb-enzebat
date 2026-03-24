import SelectForm from "@/components/Form/Select/SelectForm";
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import {
  selectTeacherFieldLabel,
  selectTeacherFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectTeacherField/SelectTeacherField.constances";

function SelectTeacherField() {

  const requiredErrorMessage = useGetRequiredErrorMessage(selectTeacherFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectTeacherFieldName);

  return (
    <SelectForm
      fieldName={selectTeacherFieldName}
      inputProps={{
        errorMessage,
        label: selectTeacherFieldLabel
      }}
      rules={{
        required: requiredErrorMessage
      }}
    />
  );
}

export default SelectTeacherField;