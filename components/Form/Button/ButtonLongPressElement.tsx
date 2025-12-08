import React from "react";
import {LongPressIsPressing} from "@/components/Form/Button/hooks/useButtonLongPress";
import useButtonLongPressStyle from "@/components/Form/Button/hooks/useButtonLongPressStyle";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";


type Props  = {
  isPressing: LongPressIsPressing;
} & Pick<ButtonProps, 'variant' | 'color' | 'longPressTime'>

function ButtonLongPressElement(
  {isPressing, variant, color, longPressTime}: Props
) {

  const {
    longPressElementBackgroundColor
  } = useButtonLongPressStyle({variant, color})

  return (
    <div
      className={`absolute inset-0 z-0 ${longPressElementBackgroundColor} ${isPressing ? 'w-full' : 'w-0'}`}
      style={{
        transitionDuration: `${longPressTime}ms`
      }}
    ></div>
  )
}

export default ButtonLongPressElement