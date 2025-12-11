import React from 'react';
import StringFormField from "@/components/Form/FormLayout/StringFormField";

export const mobileFieldName = 'mobile'
export const mobileFieldLabel = 'موبایل'
export type MobileFieldType = string;

function MobileField() {
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
    />
  );
}

export default MobileField;