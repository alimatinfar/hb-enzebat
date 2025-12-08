import React from 'react';
import StringFormField from "@/components/Form/FormLayout/StringFormField";

export const userNameFieldName = 'userName'
export const userNameFieldLabel = 'نام کاربری'
export type UserNameFieldType = string;

function UserNameField() {
  return (
    <StringFormField
      fieldName={userNameFieldName} fieldLabel={userNameFieldLabel}
      inputProps={{
        placeholder: userNameFieldLabel,
        maxLength: 20,
        inputLtr: true,
        useTrim: true
      }}
    />
  );
}

export default UserNameField;