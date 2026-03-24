import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import InputForm from "@/components/Form/Input/InputForm";
import React from "react";
import {
  firstNameFieldLabel, firstNameFieldName
} from "@/components/pages/admin-panel/users/Form/FormFields/FirstNameField/FirstNameField.constances";

function FirstNameField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(firstNameFieldLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(firstNameFieldName);

  return (
    <InputForm
      fieldName={firstNameFieldName}
      inputProps={{
        errorMessage,
        label: firstNameFieldLabel,
        placeholder: firstNameFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
    />
  );
}

export default FirstNameField;