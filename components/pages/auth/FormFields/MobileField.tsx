import React from 'react';
import StringFormField from "@/components/Form/FormLayout/StringFormField";
import FORM_PATTERNS from "@/constances/form/formPatterns";

export const mobileFieldName = 'mobile'
export const mobileFieldLabel = 'موبایل'
export type MobileFieldType = string;


type Props = {
  hasValidation?: boolean;
}

function MobileField(
  {hasValidation}: Props
) {
  return (
    <StringFormField
      fieldName={mobileFieldName} fieldLabel={mobileFieldLabel}
      inputProps={{
        placeholder: mobileFieldLabel,
        maxLength: 11,
        inputLtr: true,
        useTrim: true,
        justNumber: true
      }}
      {...hasValidation && {
        rules: {
          pattern: FORM_PATTERNS.MOBILE
        }
      }}
    />
  );
}

export default MobileField;