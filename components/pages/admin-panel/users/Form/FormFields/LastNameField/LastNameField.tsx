import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import InputForm from "@/components/Form/Input/InputForm";
import React from "react";
import {
  lastNameFieldLabel, lastNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/LastNameField/LastNameField.constances";

function LastNameField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(lastNameFieldLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(lastNameFieldName);

  return (
    <InputForm
      fieldName={lastNameFieldName}
      inputProps={{
        errorMessage,
        label: lastNameFieldLabel,
        placeholder: lastNameFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
    />
  );
}

export default LastNameField;