import {ButtonClassNameType, ButtonProps, ButtonSizesType} from "../ButtonTypes";
import useButtonStylesColors from "./useButtonStylesColors";
import useButtonStylesLoadingColors from "./useButtonStylesLoadingColors";


type Props  = Partial<ButtonProps>

function useButtonStyles(
  {
    className = {}, variant, size, color, fullWidth, justIcon,
    hiddenBorderRight, hiddenBorderLeft, readOnly, longPress
  }: Props
) {

  const {buttonStylesColors, defaultButtonClass} = useButtonStylesColors({readOnly, longPress})

  const {buttonLoadingProps} = useButtonStylesLoadingColors({
    color, variant, size
  })

  const buttonStylesSizes: Record<ButtonSizesType, string> = {
    'sm': !justIcon ? `px-3 py-1.5 text-sm` : 'p-1.5',
    'md': !justIcon ? `px-4 py-3 text-base` : 'p-2.5',
  }

  const buttonStyles: ButtonClassNameType = {
    default: `flex items-center justify-center font-semibold duration-200 select-none relative overflow-hidden w-full
     whitespace-nowrap  disabled:cursor-not-allowed ${readOnly ? 'cursor-default' : 'cursor-pointer'}
     ${hiddenBorderLeft ? '' : 'border-l'} ${hiddenBorderRight ? '' : 'border-r'} 
     border-y`,
    radius: `${hiddenBorderLeft ? '' : 'rounded-l-lg'} ${hiddenBorderRight ? '' : 'rounded-r-lg'} rounded-y-lg`,
    size: size ? buttonStylesSizes[size] : '',
    color: (color && variant) ? buttonStylesColors[color]?.[variant] : defaultButtonClass,
    width: `${fullWidth ? 'w-full' : ''}`,
    minWidth: (justIcon || fullWidth) ? '' : `min-w-[150px]`,
    ...className
  }

  return {buttonStyles, buttonLoadingProps}
}

export default useButtonStyles;