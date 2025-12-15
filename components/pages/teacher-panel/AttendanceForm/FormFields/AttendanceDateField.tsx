import React from 'react';
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import {CustomDatePickerProps} from "@/components/Form/DatePicker/DatePickerExports";
import DatePickerForm, {DatePickerFormProps} from "@/components/Form/DatePicker/DatePickerForm";
import {InputProps} from "@/components/Form/Input/types/InputProps";

export const attendanceDateFieldName = 'attendanceDate'
export const attendanceDateFieldLabel = 'تاریخ جلسه'
export type AttendanceDateFieldType = CustomDatePickerProps['value'];


type Props = Pick<DatePickerFormProps, 'defaultValue'> & Pick<InputProps, 'disabled'>

function AttendanceDateField(
  {defaultValue, disabled}: Props
) {

  const requiredErrorMessage = useGetRequiredErrorMessage(attendanceDateFieldLabel || '');

  return (
    <DatePickerForm
      fieldName={attendanceDateFieldName}
      fieldLabel={attendanceDateFieldLabel}
      inputProps={{
        label: attendanceDateFieldLabel,
        disabled
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      defaultValue={defaultValue}
      hasFormattedOnChange
    />
  );
}

export default AttendanceDateField;