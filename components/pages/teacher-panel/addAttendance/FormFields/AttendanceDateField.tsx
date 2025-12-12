import React from 'react';
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import {CustomDatePickerProps} from "@/components/Form/DatePicker/DatePickerExports";
import DatePickerForm from "@/components/Form/DatePicker/DatePickerForm";

export const attendanceDateFieldName = 'attendanceDate'
export const attendanceDateFieldLabel = 'تاریخ جلسه'
export type AttendanceDateFieldType = CustomDatePickerProps['value'];

function AttendanceDateField() {

  const requiredErrorMessage = useGetRequiredErrorMessage(attendanceDateFieldLabel || '');

  return (
    <DatePickerForm
      fieldName={attendanceDateFieldName}
      fieldLabel={attendanceDateFieldLabel}
      inputProps={{
        label: attendanceDateFieldLabel,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      defaultValue={new Date()}
      hasFormattedOnChange
    />
  );
}

export default AttendanceDateField;