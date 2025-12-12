import Input from "../Input/Input";
import DatepickerIcon from "../../svg/DatepickerIcon";
import {CustomDatePickerProps} from "./DatePickerExports";
import {lazy} from "react";

const CloseIcon = lazy(() => import("../../svg/CloseIcon"));

type Props = {
  datePickerValue: any,
  openCalendar: () => void,
  onChange: (value: any) => void,
  setValueDate: (value: any) => void,
  removeCloseIconShouldBeRemoved: boolean,
} & Pick<CustomDatePickerProps, 'datePickerProps' | 'onChangeDate' | 'inputProps'>

function DatePickerRender(
  {
    datePickerValue, openCalendar, onChange, datePickerProps, onChangeDate, inputProps, setValueDate,
    removeCloseIconShouldBeRemoved
  }: Props
) {

  function onChangeInputHandler(event: any) {
    const value = event.target.value;
    event.target.value = event.target.value.trim();
    const limitLength = datePickerProps?.onlyYearPicker ? 4 : 10;
    if (value.length > limitLength) return;

    onChange(event);
  }

  function openCalendarHandler() {
    // if (datePickerProps?.maxDate && !value) setValueDate(datePickerProps?.maxDate);
    openCalendar();
  }

  function endAdornmentOnClick() {
    if (datePickerValue && !removeCloseIconShouldBeRemoved) {
      setValueDate(null);
      onChangeDate('');
    } else {
      openCalendarHandler();
    }
  }

  return (
    <Input
      endAdornment={
        (inputProps?.disabled || inputProps?.readOnly) ? undefined : datePickerValue &&
        !removeCloseIconShouldBeRemoved ? (
          <CloseIcon/>
        ) : (
          <DatepickerIcon/>
        )
      }
      {...(!inputProps?.disabled && {
        endAdornmentOnClick,
      })}
      onChange={onChangeInputHandler}
      value={datePickerValue}
      onClick={openCalendarHandler}
      {...inputProps}
    />
  );
}

export default DatePickerRender