import React from "react";
import {SelectOptionOnClickType, SelectOptionType, SelectProps} from "../select-exports";
import SelectDropDownOptionIconWrapper from "./SelectDropDownOptionIconWrapper";


type Props = {
  option: SelectOptionType,
  optionOnClick: SelectOptionOnClickType,
  isActive: boolean,
  mode: SelectProps['mode'],
  optionStartAdornment: SelectProps['optionStartAdornment'],
  optionEndAdornment: SelectProps['optionEndAdornment'],
}

function SelectDropDownOption(
  {option, optionOnClick, isActive, mode, optionStartAdornment, optionEndAdornment}: Props
) {

  const titleHasElement = optionStartAdornment || optionEndAdornment || option.description
  const justHasDescription = (!optionStartAdornment && !optionEndAdornment) && option.description

  const descriptionElement = option.description ? (
    <span className={`${isActive ? 'text-blue-400' : 'text-gray-500'} mr-2 text-xs`}>
      {option.description}
    </span>
  ) : null

  const nameElement = (
    <span className=''>
      {option.name}
    </span>
  )

  const nameWithDescriptionElements = (
    <>
      {nameElement}
      {descriptionElement}
    </>
  )

  const nameWithDescriptionClassName = 'inline-block flex-1'
  const optionTitle = justHasDescription ? nameWithDescriptionElements : titleHasElement ? (
    <div className={nameWithDescriptionClassName}>
      {nameWithDescriptionElements}
    </div>
  ) : (
    <>
      {option.name}
    </>
  )

  const startAdornmentElement = optionStartAdornment ? (
    <SelectDropDownOptionIconWrapper>
      {optionStartAdornment}
    </SelectDropDownOptionIconWrapper>
  ) : null

  const endAdornmentElement = optionEndAdornment ? (
    <SelectDropDownOptionIconWrapper className='mr-auto'>
      {optionEndAdornment}
    </SelectDropDownOptionIconWrapper>
  ) : null

  return (
    <div
      onClick={(e: any) => optionOnClick(e, option)}
      className={`
      rounded duration-200 p-2 select-none break-word-force
      ${justHasDescription ? nameWithDescriptionClassName : 'flex items-center'} 
      ${titleHasElement ? 'space-x-reverse space-x-2' : ''}
      ${
        isActive
          ? `text-primary bg-primary/5 ${mode != 'single' && "cursor-pointer"}`
          : `hover:bg-gray-100 cursor-pointer text-black`
      }
      `}
      key={String(option.id)}
    >
      {startAdornmentElement}
      {optionTitle}
      {endAdornmentElement}
    </div>
  )
}

export default SelectDropDownOption