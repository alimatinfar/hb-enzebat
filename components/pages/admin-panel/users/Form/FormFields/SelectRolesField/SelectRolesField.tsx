import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import SelectForm from "@/components/Form/Select/SelectForm";
import {
  SELECT_ROLES_OPTIONS,
  selectRolesFieldLabel, selectRolesFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/SelectRolesField/SelectRolesField.constances";

function SelectRolesField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(selectRolesFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectRolesFieldName);

  return (
    <SelectForm
      fieldName={selectRolesFieldName}
      inputProps={{
        errorMessage,
        label: selectRolesFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      selectProps={{
        mode: 'multiple',
         options: SELECT_ROLES_OPTIONS
      }}
    />
  );
}

export default SelectRolesField;