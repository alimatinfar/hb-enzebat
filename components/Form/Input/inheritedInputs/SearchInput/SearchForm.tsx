import React from "react";
import {FormInputProps} from "@/components/Form/Input/types/InputProps";
import {useController, useFormContext} from "react-hook-form";
import SearchInputRender from "./SearchInputRender";

export type SearchFormPropsType = {
  defaultValue?: string
} & FormInputProps

function SearchForm({inputProps, rules, fieldName, defaultValue}: SearchFormPropsType) {

  const {control} = useFormContext()

  const {
    field: {onChange, onBlur, name, value, ref},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: defaultValue || "",
  });

  return (
    <SearchInputRender
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

export default SearchForm
