import { useState } from 'react';

type Props = {
  callAfterTypingHandler: (value:any) => void;
  time?: number;
  minLength?: number;
}

function useCallFuncWithDelayAfterOnChange(
  { callAfterTypingHandler, time = 1000, minLength }: Props
) {

  const [typingTimer, setTypingTimer] = useState<any>(null)

  const onChangeHandler = (value:any) => {
    clearTimeout(typingTimer)
    const typingTimerIns = setTimeout(function () {
      if (minLength && value.length < minLength && value.length > 0) return

      callAfterTypingHandler(value)
    }, time)
    setTypingTimer(typingTimerIns)
  }

  return onChangeHandler
}

export default useCallFuncWithDelayAfterOnChange;