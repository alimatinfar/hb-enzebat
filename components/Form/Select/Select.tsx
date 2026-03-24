import React from "react";
import useSelect from "./hooks/useSelect";
import InputForMultiSelectMode from "./InputForMultiSelectMode";
import SelectDropDown from "./SelectDropDown";
import {SelectProps} from "./select-exports";
import SelectInput from "./SelectInput";


function Select(props: SelectProps) {

  const {
    name, inputProps, value, mode, removeCloseIcon, disabled, optionStartAdornment, optionEndAdornment
  } = props;

  const {
    inputWrapperRef, toggleDropDown, dropDownOpen, optionOnClick, onQuery, filteredOptions, onRemoveHandler,
    clearInput, dropDownStyle, dropDownRef, selectDropDownRef,
    currentPage, rowsPerPage, allCount, setPage, loading, overlayLoading
  } = useSelect(props);

  const closeIconShouldBeRemoved = removeCloseIcon || inputProps?.required;

  return (
    <div ref={inputWrapperRef}>
      {mode === "multiple" ? (
        <InputForMultiSelectMode
          size="md" value={value} dropDownOpen={dropDownOpen} wrapperOnClick={toggleDropDown}
          name={name} label={inputProps?.label} inputRef={inputProps?.inputRef} onQuery={onQuery}
          errorMessage={inputProps?.errorMessage} onBlur={inputProps?.onBlur}
          hiddenErrorMessageElement={Boolean(inputProps?.hiddenErrorMessage)} required={inputProps?.required}
          onRemoveHandler={onRemoveHandler} onKeyDown={inputProps?.onKeyDown} placeholder={inputProps?.placeholder}
          clearInput={clearInput} disabled={Boolean(disabled)}
        />
      ) : (
        <SelectInput
          toggleDropDown={toggleDropDown} disabled={Boolean(disabled)}
          closeIconShouldBeRemoved={Boolean(closeIconShouldBeRemoved)} value={value}
          dropDownOpen={dropDownOpen} clearInput={clearInput} onQuery={onQuery} name={name}
          inputProps={inputProps} loading={loading}
        />
      )}

      <SelectDropDown
        {...{
          ref: selectDropDownRef, optionStartAdornment, optionEndAdornment,
          dropDownRef, dropDownStyle, dropDownOpen, filteredOptions, mode, value, optionOnClick,
          setPage, currentPage, loading, rowsPerPage, overlayLoading, allCount,
        }}
      />
    </div>
  );
}

export default Select;
