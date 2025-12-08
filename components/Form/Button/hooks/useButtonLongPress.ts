import {useState} from "react";
import toastPromise from "@/utils/promises/toastPromise";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";

export type LongPressIsPressing = boolean


function useButtonLongPress(
  {longPress, longPressTime, onClick}: Pick<ButtonProps, 'longPress' | 'longPressTime' | 'onClick'>
) {

  const [isPressing, setIsPressing] = useState<LongPressIsPressing>(false);
  const [startTime, setStartTime] = useState(0);
  const [timeoutInstance, setTimeoutInstance] = useState<any>();

  const startLongPress = () => {
    setIsPressing(true);
    setStartTime(Date.now());

    const timeout = setTimeout(function () {
      onClick && onClick()
    }, longPressTime)

    setTimeoutInstance((prev: any) => {
      if (prev) clearTimeout(prev)
      return timeout
    })
  }

  const stopLongPress = () => {
    if (Date.now() - startTime < longPressTime!) {
      toastPromise().then((toast: any) => toast.warning("جهت اجرای عملیات دکمه را نگه دارید!", {
        toastId: 'longPressWarning'
      }));
    }
    clearTimeout(timeoutInstance)
    setIsPressing(false);
    setStartTime(0);
  }

  // useEffect(() => {
  //   let interval: any;
  //   if (isPressing) {
  //     const elapsed = Date.now() - startTime;
  //     const percentage = Math.min((elapsed / longPressTime) * 100, 100);
  //     setProgress(percentage);
  //     let timeout;
  //     if (percentage === 100) {
  //       setIsPressing(false);
  //       timeout = setTimeout(function () {
  //         onClick && onClick()
  //       }, longPressTime + 500)
  //     }
  //
  //     timeout && clearTimeout(timeout);
  //   }
  //   return () => clearInterval(interval);
  // }, [isPressing, startTime]);

  const buttonLongPressProps = longPress ? {
    onPointerDown: startLongPress,
    onPointerUp: stopLongPress,
    onPointerLeave: stopLongPress,
  } : {}

  return {
    buttonLongPressProps, longPressIsPressing: isPressing
  }
}

export default useButtonLongPress