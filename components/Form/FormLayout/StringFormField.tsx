import React from 'react';
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import InputForm, {InputFormPropsType} from "@/components/Form/Input/InputForm";


type Props = {
  fieldName: string;
  fieldLabel: string;
} & InputFormPropsType

function StringFormField(
  {fieldLabel, fieldName, rules, inputProps}: Props
) {

  const requiredErrorMessage = useGetRequiredErrorMessage(fieldLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(fieldName);

  return (
    <InputForm
      fieldName={fieldName}
      inputProps={{
        errorMessage,
        label: fieldLabel,
        placeholder: fieldLabel,
        ...inputProps
      }}
      rules={{
        required: requiredErrorMessage,
        ...rules
      }}
    />
  );
}

export default StringFormField;