import {ReactNode} from "react";
import {InputEndAdornmentProps} from "../EndAdornment/InputEndAdornment";

type ValueType = string | number

type WrapperClassNameType = {
  margin?: string;
  extra?: string;
  border?: string;
  borderRadius?: string;
  shadow?: string;
  background?: string;
  height?: string;
}

type InputClassNameType = {
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  textAlign?: string;
  textColor?: string;
  background?: string;
  extra?: string;
}

type LabelClassNameType = {
  fontWeight?: string;
  color?: string;
  extra?: string;
}


export type InputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: ValueType;
  defaultValue?: ValueType;
  autoCompleteOff?: boolean;
  type?: 'text' | 'password';
  inputMode?: 'text' | 'numeric';
  disabled?: boolean;
  info?: string;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  onChange?: (e: any) => void;
  onBlur?: () => void;
  onKeyDown?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  wrapperClassName?: WrapperClassNameType;
  inputClassName?: InputClassNameType;
  labelClassName?: LabelClassNameType;
  hasRemoveValueIcon?: boolean;

  inputRef?: any;
  endErrorMessage?: ReactNode;
  startAdornment?: ReactNode;
  onClick?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  inputWrapperOnClick?: () => void;
  justSelectOnClick?: () => void | boolean;
  fileInput?: ReactNode;
  rows?: number;
  resizable?: boolean;
  required?: boolean
  readOnly?: boolean,
  inputLtr?: boolean,
  maxLength?: number;
  bySeparator?: boolean;
  justNumber?: boolean;
  justEnglishLetter?: boolean;
  justUpperCaseEnglish?: boolean;
  upperCaseEnglish?: boolean;
  hasDotKey?: boolean;
  useTrim?: boolean;
  onEnter?: () => void;
  hiddenErrorMessage?: boolean;
  autoCapitalize?: "characters" | "sentences" | "words" | "none";
  size?: 'md';
  isConflict?: boolean;
  decimalCounts?: number;
} & Partial<InputEndAdornmentProps>

export type FormInputProps = {
  fieldName: string;
  rules?: any;
  inputProps?: Partial<InputProps>;
}