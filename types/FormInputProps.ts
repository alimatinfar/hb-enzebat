import {InputProps} from "@/components/Form/Input/types/InputProps";

export type FormInputProps = {
  fieldName: string;
  rules?: any;
  inputProps?: Partial<InputProps>;
}