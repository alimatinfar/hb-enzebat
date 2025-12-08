import {ButtonColorsType, ButtonProps, ButtonVariantsType} from "../ButtonTypes";
import {PartialRecord} from "@/types/PartialRecord";
import {ColorNameType} from "@/constances/colors";
import {LoadingProps} from "../../../others/Loading/Loading";

function useButtonStylesLoadingColors(
  {color, variant, size}: Pick<ButtonProps, 'color' | 'variant' | 'size'>
) {

  const defaultButtonLoadingColor: ColorNameType = 'dark'

  const buttonStylesLoadingColors: PartialRecord<ButtonColorsType, PartialRecord<ButtonVariantsType, ColorNameType>> = {
    'primary': {
      'filled': 'white',
      'link': 'primary',
      'default': 'primary',
      'outlined': 'primary',
    },
    'red': {
      'filled': 'white',
      'link': 'red',
      'default': 'red',
      'outlined': 'red',
    },
  }

  const buttonLoadingProps: LoadingProps = {
    color: buttonStylesLoadingColors?.[color!]?.[variant!] || defaultButtonLoadingColor,
    size: size === 'sm' ? 'sm' : 'md'
  }

  return {buttonLoadingProps}
}

export default useButtonStylesLoadingColors