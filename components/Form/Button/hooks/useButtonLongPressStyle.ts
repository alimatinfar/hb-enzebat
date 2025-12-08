import {ButtonColorsType, ButtonProps, ButtonVariantsType} from "@/components/Form/Button/ButtonTypes";
import {PartialRecord} from "@/types/PartialRecord";
import {useMemo} from "react";

function useButtonLongPressStyle(
  {variant, color}: Pick<ButtonProps, 'variant' | 'color'>
) {

  const buttonLongPressStyles: Record<ButtonColorsType, PartialRecord<ButtonVariantsType, string>> = {
    //TODO should be changed
    'primary': {
      'filled': 'bg-primary-filled-long-press',
      'link': '',
      'default': '',
      'outlined': 'bg-primary-outlined-long-press',
    },
    'red': {
      'filled': '',
      'link': '',
      'default': '',
      'outlined': '',
    },
    'white': {
      'default': '',
    },
  }

  const longPressElementBackgroundColor = useMemo(function () {
    return (color && variant) ? buttonLongPressStyles?.[color]?.[variant] : ''
  }, [color, variant])

  return {
    longPressElementBackgroundColor
  }
}

export default useButtonLongPressStyle