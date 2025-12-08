import React, {useState} from 'react';
import StringFormField from "@/components/Form/FormLayout/StringFormField";
import EyeOpenOutlineIcon from "@/components/svg/EyeOpenOutlineIcon";
import EyeCloseOutlineIcon from "@/components/svg/EyeCloseOutlineIcon";

export const passwordFieldName = 'password'
export const passwordFieldLabel = 'رمز عبور'
export type PasswordFieldType = string;

function PasswordField() {

  const [eyeOpen, setEyeOpen] = useState<boolean>(false)

  return (
    <StringFormField
      fieldName={passwordFieldName} fieldLabel={passwordFieldLabel}
      inputProps={{
        endAdornment: eyeOpen ? <EyeOpenOutlineIcon /> : <EyeCloseOutlineIcon />,
        placeholder: passwordFieldLabel,
        maxLength: 25,
        type: eyeOpen ? 'text' : 'password',
        inputLtr: true,
        autoCompleteOff: true,
        useTrim: true
      }}
    />
  );
}

export default PasswordField;