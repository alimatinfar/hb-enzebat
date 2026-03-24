import React from "react";
import InputLabel from "../Input/InputLabel";
import {InputProps} from "../Input/types/InputProps";
import joinObjectValues from "../../../utils/joinObjectValues";
import useInputStyles from "../Input/hooks/useInputStyles";
import {SelectOptionType} from "./select-exports";
import Chips from "../../others/Chips/Chips";
import InputEndAdornment from "../Input/EndAdornment/InputEndAdornment";
import SelectArrowAndCloseEndAdornment from "./SelectArrowAndCloseEndAdornment";
import InputErrorMessage from "../Input/InputErrorMessage";

export const multiSelectInputWrapperId = 'multi-select-input-wrapper'

export const multiSelectWrapperSizes = {
  'md': 'min-h-[44px]',
}

type Props = {
  label: InputProps['label'];
  name: InputProps['name'];
  required: InputProps['required'];
  errorMessage: InputProps['errorMessage'];
  loading?: boolean;
  value: any;
  onRemoveHandler: (tagId:SelectOptionType['id']) => void;
  onKeyDown: InputProps['onKeyDown'];
  onBlur: InputProps['onBlur'];
  inputRef: InputProps['inputRef'];
  onQuery: InputProps['onChange'];
  placeholder: InputProps['placeholder'];
  size: InputProps['size'];
  disabled: InputProps['disabled'];
  dropDownOpen: boolean;
  hiddenErrorMessageElement: boolean;
  wrapperOnClick: () => void;
  clearInput: () => void;
}

function InputForMultiSelectMode(
  {
    name, label, required, errorMessage, value, onRemoveHandler, onBlur, onKeyDown, inputRef, onQuery, placeholder,
    dropDownOpen, hiddenErrorMessageElement, wrapperOnClick, clearInput, size='md', disabled, loading
  }: Props
) {

  const wrapperClassName = {
    height: multiSelectWrapperSizes[size]
  }

  const inputClassName = {
    extra: 'flex-1 min-w-[100px] py-1'
  }

  const {inputStyles, inputWrapperStyles} = useInputStyles({
    errorMessage, wrapperClassName, inputClassName, disabled
  })

  return (
    <div className='flex flex-col'>
      <InputLabel {...{label, name, required}}/>

      <div
        id={multiSelectInputWrapperId}
        onClick={wrapperOnClick}
        className={joinObjectValues(inputWrapperStyles)}>
        <div
          className='flex items-center w-full break-word-force'
        >
          <div className='flex items-center flex-wrap flex-1 max-h-40 scroll-thin overflow-y-auto'>
            {value && value?.map((tag: SelectOptionType) => (
              <div key={String(tag.id)} className='p-1'>
                <Chips
                  text={String(tag?.name) || ''}
                  onClose={() => onRemoveHandler(tag.id)}
                />
              </div>
            ))}

            <input
              {...{onKeyDown, onChange: onQuery, ref: inputRef, onBlur, id:name}}
              {...value?.length === 0 ? {placeholder} : {}}
              className={joinObjectValues({
                ...inputStyles, padding: 'px-2 py-1.5'
              })}
              autoComplete='off'
            />
          </div>

          <InputEndAdornment
            endAdornment={(
              <SelectArrowAndCloseEndAdornment
                hasNotValue={value?.length === 0 || !value}
                dropDownOpen={dropDownOpen} loading={loading}
              />
            )}
            endAdornmentOnClick={() => value?.length !== 0 ? clearInput() : wrapperOnClick()}
            disabled={Boolean(disabled)}
          />
        </div>
      </div>

      {!hiddenErrorMessageElement && <InputErrorMessage errorMessage={errorMessage}/>}
    </div>
  )
}

export default InputForMultiSelectMode