import {ButtonColorsType, ButtonProps, ButtonVariantsType} from "../ButtonTypes";
import {PartialRecord} from "@/types/PartialRecord";


type Props = Partial<ButtonProps>

function useButtonStylesColors({readOnly, longPress}: Props) {

  const defaultButtonClass = `
   border-gray-300 bg-white enabled:hover:bg-gray-100 disabled:text-gray-300 shadow-xs
  `

  const buttonStylesColors: Record<ButtonColorsType, PartialRecord<ButtonVariantsType, string>> = {
    //TODO should be changed
    'primary': {
      'filled': `
      bg-primary
      ${readOnly ? '' : 'enabled:hover:bg-primary-600'} disabled:bg-primary-300 text-white border-transparent
      `,
      'link': `text-primary  border-transparent bg-transparent disabled:text-primary-300 ${readOnly ? '' : 'enabled:hover:bg-primary/10'}`,
      'default': `text-gray-900 border-blue-200 bg-blue-50 disabled:text-gray-300 ${readOnly ? '' : 'enabled:hover:bg-blue-100'}`,
      'outlined':
        `text-primary border-primary ${(longPress || readOnly) ? '' : 'enabled:hover:bg-primary/10'} 
         disabled:bg-primary-50 disabled:border-primary-200 disabled:text-primary-200 bg-transparent`,
    },
    'red': {
      'filled': `text-white border-transparent bg-red-500 disabled:bg-red-300 ${readOnly ? '' : 'enabled:hover:bg-red-600'}`,
      'link': `text-red-500 border-transparent bg-transparent disabled:text-red-300 ${readOnly ? '' : 'enabled:hover:bg-red-50'}`,
      'default': `text-red-500 border-red-300 bg-red-50 ${readOnly ? '' : 'enabled:hover:bg-red-100'}`,
      'outlined':
        `text-red-500 border-red-500 bg-transparent ${readOnly ? '' : 'enabled:hover:bg-red-50'}
         disabled:bg-red-50 disabled:border-red-200 disabled:text-red-200`,
    },
    'white': {
      'default': defaultButtonClass,
    },
  }

  return {buttonStylesColors, defaultButtonClass}
}

export default useButtonStylesColors