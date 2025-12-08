import React from "react";
import {InputProps} from "./types/InputProps";
import {useMemo} from "react";
import ErrorIcon from "../../svg/ErrorIcon";

type Props = {
  errorMessage: InputProps['errorMessage'];
  endErrorMessage?: InputProps['endErrorMessage'];
} & Pick<InputProps, 'description'>

function InputErrorMessage({errorMessage, description, endErrorMessage}: Props) {

  const wrapperClass = 'min-h-[20px]'

  const errorMessageElement = useMemo(function () {

    const text = errorMessage || description || ''
    const className = `
      ${wrapperClass} flex-1 text-[12px] font-medium flex items-center ${errorMessage ? 'text-red-500' : 'text-gray-400'} mt-0.5
    `

    return endErrorMessage ? (
      <div className={`${className} flex items-center justify-between space-x-1 `}>
        <span>{text}</span>
        {endErrorMessage}
      </div>
      ) : (
      <p className={className}>
        {text}
      </p>
    )
  }, [errorMessage, description, wrapperClass, endErrorMessage])

  return errorMessage ? (
    <div className={`${wrapperClass} flex items-center space-x-1`}>
      <ErrorIcon />
      {errorMessageElement}
    </div>
  ) : errorMessageElement
}

export default InputErrorMessage