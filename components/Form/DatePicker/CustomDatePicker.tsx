import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

import DatePicker, {DateObject} from "react-multi-date-picker";
import useCustomDatePicker from "./hooks/useCustomDatePicker";
import DatePickerRender from "./DatePickerRender";
import {CustomDatePickerProps, datePickerWeekDays} from "./DatePickerExports";
import "react-multi-date-picker/styles/layouts/mobile.css"
import {lazy, useMemo} from "react";

const TimePicker = lazy(() => import("react-multi-date-picker/plugins/time_picker"));


function CustomDatePicker(
  {
    onChangeDate, datePickerProps = {}, inputProps, removeCloseIcon, value, mobileMode = true, isMiladi, hasTimePicker,
    hasFormattedOnChange
  }: CustomDatePickerProps
) {

  const format = useMemo(() => hasTimePicker ? "YYYY/MM/DD | HH:mm" : "YYYY/MM/DD", [hasTimePicker])

  const {
    valueDate, formattedValueDate, datePickerRef, setValueDate, removeCloseIconShouldBeRemoved, onChangeHandler
  } = useCustomDatePicker({
    onChangeDate, datePickerProps, inputProps, removeCloseIcon, value, hasTimePicker, format
  })

  return (
    <DatePicker
      format={format}
      {...(valueDate
        ? {
          value: datePickerProps?.range
            ? formattedValueDate
            : hasFormattedOnChange ? new Date(valueDate) : new DateObject(valueDate),
        }
        : {})}
      plugins={[
        ...hasTimePicker ? [(
          <TimePicker
            hideSeconds position="bottom"
          />
        )] : []
      ]}
      weekDays={datePickerWeekDays}
      ref={datePickerRef}
      offsetY={-10}
      portal
      render={(datePickerValue, openCalendar, onChange) => {
        return (
          <DatePickerRender
            datePickerValue={datePickerValue} openCalendar={openCalendar} onChange={onChange}
            onChangeDate={onChangeDate} datePickerProps={datePickerProps} inputProps={inputProps}
            setValueDate={setValueDate} removeCloseIconShouldBeRemoved={Boolean(removeCloseIconShouldBeRemoved)}
          />
        )
      }}
      onChange={onChangeHandler}
      calendar={isMiladi ? gregorian : persian}
      locale={isMiladi ? gregorian_fa : persian_fa}
      calendarPosition="bottom-left"
      // className="primarydate"
      containerClassName="w-full"
      onOpenPickNewDate={false}
      readOnly={Boolean(inputProps?.readOnly)}
      {...mobileMode && {className: "rmdp-mobile"}}
      {...(datePickerProps?.maxDate && (!valueDate || valueDate?.length === 0)) && {currentDate: datePickerProps?.maxDate}}
      {...(datePickerProps || {})}
    />
  );
}

export default CustomDatePicker;
