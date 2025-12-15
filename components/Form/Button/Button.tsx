'use client'

import joinObjectValues from "@/utils/joinObjectValues";
import useButtonStyles from "./hooks/useButtonStyles";
import Loading from "../../others/Loading/Loading";
import useDisplayWithAnimation from "../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";
import ButtonIconWrapper from "./ButtonIconWrapper";
import {ButtonProps} from "./ButtonTypes";
import useButtonLongPress from "@/components/Form/Button/hooks/useButtonLongPress";
import ButtonLongPressElement from "@/components/Form/Button/ButtonLongPressElement";


const Button = (
  {
    children, onClick, type, className, variant = 'filled', size = 'md', color = 'primary', disabled, loading, fullWidth,
    rightIcon, leftIcon, justIcon, hiddenBorderRight, hiddenBorderLeft, readOnly, longPress, longPressTime = 1500
  }: ButtonProps
) => {

  const {
    buttonLongPressProps, longPressIsPressing
  } = useButtonLongPress({longPress, longPressTime, onClick})

  const {buttonStyles, buttonLoadingProps} = useButtonStyles({
    className, variant, size, color, fullWidth, justIcon, hiddenBorderRight, hiddenBorderLeft, readOnly,
    longPress
  })

  const {shouldBeRemoved: loadingShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(loading)})

  const isDisabled = disabled || loading

  return (
    <button
      {...buttonLongPressProps}
      {...isDisabled && {disabled: true}}
      type={type || 'button'}
      {...(onClick && !readOnly && !longPress) ? {onClick} : {}}
      className={joinObjectValues(buttonStyles)}
    >
      <div className='relative z-[1] w-full'>
        {!loadingShouldBeRemoved && (
          <div
            className={`${loading ? '' : 'opacity-0 scale-90'} flex items-center justify-center duration-200 absolute inset-0`}>
            <Loading {...buttonLoadingProps}/>
          </div>
        )}
        <div dir='rtl'
             className={`${loading ? 'opacity-0 scale-90' : ''} relative flex items-center justify-center space-x-1.5`}>
          <ButtonIconWrapper>
            {rightIcon}
          </ButtonIconWrapper>

          <div className={justIcon ? 'flex items-center justify-center w-5 h-5 overflow-hidden' : ''}>
            {children}
          </div>

          <ButtonIconWrapper>
            {leftIcon}
          </ButtonIconWrapper>
        </div>
      </div>


      {longPress && (
        <ButtonLongPressElement
          isPressing={longPressIsPressing}
          variant={variant} color={color} longPressTime={longPressTime}
        />
      )}
    </button>
  );
}

export default Button