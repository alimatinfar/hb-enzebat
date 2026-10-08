import React, {lazy} from "react";
import useSelect from "./hooks/useSelect";
import InputForMultiSelectMode from "./InputForMultiSelectMode";
import {SelectProps} from "./select-exports";
import SelectInput from "./SelectInput";

const SelectOptionsModal = lazy(() => import("./SelectOptionsModal"));


function Select(props: SelectProps) {

  const {
    name, inputProps, value, mode, removeCloseIcon, optionStartAdornment, optionEndAdornment
  } = props;

  const {
    inputWrapperRef, toggleDropDown, dropDownOpen, closeDropDown, optionOnClick, onQuery, filteredOptions,
    onRemoveHandler, clearInput, submitDraftHandler, selectDropDownRef,
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
          clearInput={clearInput} disabled={Boolean(inputProps?.disabled)} loading={loading}
        />
      ) : (
        <SelectInput
          toggleDropDown={toggleDropDown}
          closeIconShouldBeRemoved={Boolean(closeIconShouldBeRemoved)} value={value}
          dropDownOpen={dropDownOpen} clearInput={clearInput} onQuery={onQuery} name={name}
          inputProps={inputProps} loading={loading}
        />
      )}

      {dropDownOpen && (
        <SelectOptionsModal
          {...{
            modalRef: selectDropDownRef, open: dropDownOpen, onClose: closeDropDown,
            title: inputProps?.label, optionStartAdornment, optionEndAdornment,
            filteredOptions, mode, value, optionOnClick, onSubmitDraft: submitDraftHandler, onQuery,
            setPage, currentPage, loading, rowsPerPage, overlayLoading, allCount,
          }}
        />
      )}
    </div>
  );
}

export default Select;
