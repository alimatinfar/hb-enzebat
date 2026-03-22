import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import InputForm from "@/components/Form/Input/InputForm";
import React from "react";
import {
  classNameFieldLabel,
  classNameFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/ClassNameField/ClassNameField.constances";

function ClassNameField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(classNameFieldLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(classNameFieldName);

  return (
    <InputForm
      fieldName={classNameFieldName}
      inputProps={{
        errorMessage,
        label: classNameFieldLabel,
        placeholder: classNameFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
    />
  );
}

export default ClassNameField;