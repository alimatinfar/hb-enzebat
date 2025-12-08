import {InputProps} from "../types/InputProps";
import {useMemo} from "react";


export const inputSizes = {
  'md': 'h-11',
}

function useInputStyles(
  {
    wrapperClassName, errorMessage, inputClassName, inputLtr,
    size = 'md', disabled, resizable, rows, readOnly, hasError, isConflict
  }: Pick<InputProps,
    'wrapperClassName' | 'errorMessage' | 'inputClassName' | 'inputLtr' | 'size' | 'disabled' | 'resizable' | 'rows' |
    'readOnly' | 'hasError' | 'isConflict'
  >
) {


  const backgroundColor = 'bg-gray-3'
  const borderColor = `
    border-gray-4 [&:has(input:enabled)]:hover:border-black/80 [&:has(input:focus)]:border-black
  `

  const fieldWrapperStyles = useMemo(() => ({
    default: `flex flex-col`,
  }), []);

  const inputWrapperStyles = useMemo(() => ({
    default: `
    flex items-center shadow-base border block w-full overflow-hidden appearance-none duration-200
    `,
    background: isConflict ? 'bg-orange-100' : (disabled || readOnly) ? 'bg-gray-100' : backgroundColor,
    shadow: 'shadow-xs',
    border: borderColor,
    borderRadius: 'rounded-lg',
    height: rows ? '' : inputSizes[size],
    ...wrapperClassName,
    ...(errorMessage || hasError) ? {border:'border-red-500'} : {}
  }), [
    isConflict, disabled, readOnly, errorMessage, hasError, rows, inputSizes, size, wrapperClassName,
    backgroundColor, borderColor
  ]);

  const placeholderColor = 'placeholder:text-gray-5'
  const textColor = 'text-gray-800'

  const inputStyles = useMemo(() => ({
    default: `
     ${inputLtr ? 'ltr' : ''} ${resizable ? '' : 'resize-none'}
     h-full w-full outline-none text-ellipsis focus:text-clip scroll-thin placeholder:text-right placeholder:rtl
     placeholder:text-base ${placeholderColor}
    `,
    background: backgroundColor,
    padding: 'px-2 py-3',
    fontSize: `text-base`,
    fontWeight: `font-medium`,
    // textAlign: `text-right`,
    textColor: textColor,
    ...inputClassName,
  }), [inputLtr, resizable, inputClassName, backgroundColor, placeholderColor, textColor])

  return {
    fieldWrapperStyles, inputWrapperStyles, inputStyles
  }
}

export default useInputStyles;