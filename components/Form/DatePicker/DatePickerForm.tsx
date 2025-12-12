import CustomDatePicker from "./CustomDatePicker";
import { FormInputProps } from "@/types/FormInputProps";
import { useController, useFormContext } from "react-hook-form";
import {CustomDatePickerProps} from "./DatePickerExports";
import {getFormattedDateTime} from "@/components/Form/DatePicker/utils/getFormattedDate";
import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";

type Props = {
  datePickerProps?: any;
  customDatePickerProps?: Partial<CustomDatePickerProps>;
  onSelect?: (value: string | string[]) => void;
  defaultValue?: string | Date;
  hasFormattedOnChange?: boolean;
} & FormInputProps;

function DatePickerForm(
  {
    fieldName, fieldLabel, rules, inputProps, datePickerProps, customDatePickerProps, onSelect, defaultValue, hasFormattedOnChange
  }: Props
) {

  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(fieldName);

  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: fieldName,
    control,
    rules: rules,
    defaultValue: defaultValue || "",
  });
  function onChangeHandler(value: string | string[]) {
    const finalValue = hasFormattedOnChange ? (value ? getFormattedDateTime({value: value}) : value) : value
    onChange(finalValue);
    onSelect && onSelect(finalValue);
  }

  return (
    <CustomDatePicker
      value={value || {}}
      onChangeDate={onChangeHandler}
      inputProps={{
        name,
        onBlur,
        inputRef: ref,
        required: Boolean(rules?.required),
        placeholder: 'انتخاب کنید',
        autoCompleteOff: true,
        errorMessage,
        ...inputProps,
      }}
      hasFormattedOnChange={hasFormattedOnChange}
      datePickerProps={datePickerProps}
      removeCloseIcon={!!rules.required}
      {...customDatePickerProps && customDatePickerProps}
    />
  );
}

export default DatePickerForm;
