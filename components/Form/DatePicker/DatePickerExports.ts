import {InputProps} from "../Input/types/InputProps";
import {DateObject} from "react-multi-date-picker";

export const datePickerWeekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export type CustomDatePickerProps = {
  onChangeDate: (value: any) => void;
  datePickerProps?: any;
  inputProps?: Partial<InputProps>;
  value?: Date | string | DateObject;
  removeCloseIcon?: boolean;
  mobileMode?: boolean;
  isMiladi?: boolean;
  hasTimePicker?: boolean;
  hasFormattedOnChange?: boolean;
};