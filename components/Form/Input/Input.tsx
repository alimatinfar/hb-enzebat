import React from "react";
import joinObjectValues from "../../../utils/joinObjectValues";
import {InputProps} from "./types/InputProps";
import useInputStyles from "./hooks/useInputStyles";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";
import InputEndAdornment from "./EndAdornment/InputEndAdornment";
import useInput from "./hooks/useInput";

export const inputWrapperId = 'input-wrapper'

function Input(
  {
    name, label, placeholder, value, defaultValue, autoCompleteOff, type, inputMode, disabled, wrapperClassName,
    inputClassName, labelClassName, errorMessage, onChange, onBlur, onKeyDown, inputRef, endAdornment, startAdornment,
    onClick, inputWrapperOnClick, justSelectOnClick, fileInput, endAdornmentOnClick, inputLtr, description, info,
    onKeyPress, rows, required, readOnly, hiddenErrorMessage, endAdornmentType, resizable, hasError, justEnglishLetter,
    justNumber, onEnter, maxLength, bySeparator, useTrim, hasDotKey, size='md', onFocus, autoCapitalize,
    justUpperCaseEnglish, upperCaseEnglish, isConflict, decimalCounts, endAdornmentClassName, endErrorMessage,
    hasRemoveValueIcon
  }: InputProps
) {

  const {
    fieldWrapperStyles, inputStyles, inputWrapperStyles
  } = useInputStyles({
    wrapperClassName, inputClassName, errorMessage, inputLtr, size, disabled, resizable, rows, readOnly, hasError,
    isConflict
  })

  const {
    inputProps
  } = useInput({
    maxLength, bySeparator, justNumber, useTrim, onChange, onKeyPress, onEnter, value, inputRef, onKeyDown, onBlur,
    inputStyles, inputMode, disabled, type, placeholder, readOnly, justSelectOnClick, justEnglishLetter,
    rows, defaultValue, onClick, autoCompleteOff, name, hasDotKey, onFocus, autoCapitalize, justUpperCaseEnglish,
    upperCaseEnglish, decimalCounts
  })

  return (
    <div
      className={joinObjectValues(fieldWrapperStyles)}>
      {label && (
        <InputLabel
          {...{label, name, required, disabled, info, readOnly}}
          classObject={labelClassName}
        />
      )}

      <div
        id={inputWrapperId}
        {...inputWrapperOnClick && {onClick: inputWrapperOnClick}}
        className={joinObjectValues(inputWrapperStyles)}
      >
        {startAdornment && (
          <div
            className={`h-full pr-2 flex items-center justify-center overflow-hidden`}>
            <div className='w-5 h-5'>
              {startAdornment}
            </div>
          </div>
        )}

        {rows ? (
          <textarea {...inputProps} />
        ) : <input {...inputProps} />}

        {fileInput || null}

        {(endAdornment) && (
          <InputEndAdornment
            {...{
              endAdornment, endAdornmentOnClick, endAdornmentType, disabled: Boolean(disabled), endAdornmentClassName,
            }}
          />
        )}

        {justSelectOnClick && (
          <div
            {...typeof justSelectOnClick === 'function' && {onClick: justSelectOnClick}} tabIndex={0}
              className={`w-full h-full absolute inset-0 cursor-pointer  border-1 rounded-lg duration-200 focus:border-primary/50
             ${errorMessage ? `border-red-500` : `border-gray-300 hover:border-gray-400 `}    `}/>
        )}
      </div>

      {!hiddenErrorMessage && (
        <InputErrorMessage
          {...{errorMessage, description, endErrorMessage}}
        />
      )}
    </div>
  );
}

export default Input;