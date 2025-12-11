import React, {ReactNode} from "react";
import ErrorIcon from "../../../svg/ErrorIcon";
import Button from "../../Button/Button";


type EndAdornmentClassNameType = {
  bgHover?: string;
}

export type InputEndAdornmentProps = {
  endAdornment: ReactNode,
  endAdornmentType?: 'icon' | 'button' | 'simple',
  endAdornmentOnClick?: () => void,
  endAdornmentClassName?: EndAdornmentClassNameType;
}

type Props = {
  disabled: boolean,
} & InputEndAdornmentProps

function InputEndAdornment(
  {
    endAdornment, endAdornmentOnClick, endAdornmentType = 'icon', disabled, endAdornmentClassName
  }: Props
) {

  const endAdornmentElement = endAdornment ? endAdornment : (
    <ErrorIcon/>
  )

  function onClickHandler(e: any) {
    e.stopPropagation()
    endAdornmentOnClick && endAdornmentOnClick()
  }

  return (
    <div className='pl-2 flex items-center justify-center'>
      {endAdornmentType === 'icon' ? (
        <div
          className={`w-6 h-6 overflow-hidden p-0.5 rounded-lg 
          ${
            (disabled || !endAdornmentOnClick) ? '' :
            `cursor-pointer duration-200 ${endAdornmentClassName?.bgHover || 'hover:bg-gray-300'}`
          }
          `}
          {...!disabled && {onClick: onClickHandler}}
        >
          {endAdornmentElement}
        </div>
      ) : endAdornmentType === 'simple' ? (
          <span className='bg-gray-200 border border-gray-300 rounded px-1.5 py-1 text-sm'>
            {endAdornmentElement}
          </span>
        ) : (
        <Button variant='outlined' size='sm' className={{radius: 'rounded', extra: 'h-8'}} disabled={Boolean(disabled)}>
          {endAdornmentElement}
        </Button>
      )}
    </div>
  );
}

export default InputEndAdornment