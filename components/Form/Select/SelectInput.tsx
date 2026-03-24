import SelectArrowAndCloseEndAdornment from "./SelectArrowAndCloseEndAdornment";
import Input from "../Input/Input";
import React from "react";
import {SelectProps} from "./select-exports";
import {InputProps} from "../Input/types/InputProps";


type SelectInputProps = {
  toggleDropDown: () => void,
  disabled: boolean,
  closeIconShouldBeRemoved: boolean,
  value: any,
  dropDownOpen: boolean,
  clearInput: () => void,
  onQuery: InputProps['onChange'],
  name: InputProps['name'],
  inputProps?: InputProps,
} & Pick<SelectProps, 'loading'>

function SelectInput(
  {
    toggleDropDown, disabled, closeIconShouldBeRemoved, value, dropDownOpen,
    clearInput, onQuery, name, inputProps, loading
  }: SelectInputProps
) {
  return (
    <Input
      autoCompleteOff
      inputWrapperOnClick={toggleDropDown}
      {...!disabled && {
        endAdornment: (
          <SelectArrowAndCloseEndAdornment
            loading={loading}
            hasNotValue={
              closeIconShouldBeRemoved ? true : !value
            }
            dropDownOpen={dropDownOpen}
          />
        ),
        endAdornmentOnClick: (value && !closeIconShouldBeRemoved) ? clearInput : toggleDropDown
      }}
      onChange={onQuery}
      name={name}
      placeholder='انتخاب کنید'
      {...inputProps}
    />
  )
}

export default SelectInput