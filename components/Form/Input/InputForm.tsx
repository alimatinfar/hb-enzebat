import React, {useEffect} from "react";
import {FormInputProps} from "@/components/Form/Input/types/InputProps";
import Input from "./Input";
import {useController, useFormContext} from "react-hook-form";

export type InputFormPropsType = {
  defaultValue?: string
} & FormInputProps

function InputForm({inputProps, rules, fieldName, defaultValue}: InputFormPropsType) {

  const {control, trigger, formState: {isSubmitted}} = useFormContext()

  const {
    field: {onChange, onBlur, name, value, ref},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: defaultValue || "",
  });

  useEffect(() => {
    if (rules?.validate && isSubmitted) trigger(fieldName).then()
  }, [value]);

  return (
    <Input
      name={name}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required={Boolean(rules?.required)}
      {...inputProps}
    />
  );
}

export default InputForm;