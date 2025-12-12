import {useEffect, useMemo, useRef, useState} from "react";
import {DateObject} from "react-multi-date-picker";
import {CustomDatePickerProps} from "../DatePickerExports";


type Props = {
  format: string;
} & CustomDatePickerProps

function useCustomDatePicker(
  {removeCloseIcon, inputProps, datePickerProps, onChangeDate, value, hasTimePicker}: Props
) {

  const datePickerRef = useRef<any>(null);

  const removeCloseIconShouldBeRemoved = removeCloseIcon;

  function onChangeHandler(date: any) {
    if (date == null) return;

    function getFormattedDate(value: any) {
      return new DateObject(value?.toDate());
    }

    if (datePickerProps?.range) {
      const onChangeValue = [
        ...(date[0] ? [getFormattedDate(date[0])] : []),
        ...(date[1] ? [getFormattedDate(date[1])] : []),
      ];

      onChangeDate(onChangeValue);
      // onChangeDate(date);
    } else {
      const miladiDate = new DateObject(date?.toDate());

      onChangeDate(miladiDate);
    }
  }

  const [valueDate, setValueDate] = useState<any>();

  useEffect(() => {
    setValueDate(value);
  }, [value]);

  const formattedValueDate = useMemo(
    function () {
      if (!datePickerProps?.range || !valueDate) return;
      return [
        ...(valueDate[0] ? [new DateObject(valueDate[0])] : []),
        ...(valueDate[1] ? [new DateObject(valueDate[1])] : []),
      ];
    },
    [valueDate, datePickerProps?.range]
  );

  // useEffect(
  //   function () {
  //     console.log({
  //       valueDate: [new DateObject(valueDate[0]), new DateObject(valueDate[1])],
  //     });
  //   },
  //   [valueDate]
  // );

  return {
    valueDate, formattedValueDate, datePickerRef, setValueDate, removeCloseIconShouldBeRemoved, onChangeHandler
  }
}

export default useCustomDatePicker