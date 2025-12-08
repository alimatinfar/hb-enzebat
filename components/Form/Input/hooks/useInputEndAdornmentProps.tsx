import {InputEndAdornmentProps} from "@/components/Form/Input/EndAdornment/InputEndAdornment";
import {InputProps} from "@/components/Form/Input/types/InputProps";
import {useCallback, useMemo, useState} from "react";
import CloseIcon from "@/components/svg/CloseIcon";


type Props = Pick<InputProps,
  'hasRemoveValueIcon' | 'disabled' | 'value' | 'onChange'
> & InputEndAdornmentProps

function useInputEndAdornmentProps(
  {
    endAdornment, endAdornmentOnClick, disabled, endAdornmentClassName, endAdornmentType, hasRemoveValueIcon, value,
    onChange
  }: Props
) {

  const [inputElement, setInputElement] = useState<any>();

  const removeValueHandler = useCallback(function () {
    if (!inputElement) return
    inputElement.target.value = ''
    onChange && onChange(inputElement)
  }, [inputElement, onChange])

  const hasCloseIcon = useMemo(() => {
    const inputValue = inputElement?.target?.value || ''
    return hasRemoveValueIcon && !!inputValue
  }, [hasRemoveValueIcon, inputElement])

  const onChangeValueForEndAdornment = useCallback(function (e:any) {
    onChange && onChange(e)
    setInputElement(e)
  }, [])

  return {
    endAdornmentProps: {
      endAdornment: hasCloseIcon ? <CloseIcon /> : endAdornment,
      endAdornmentOnClick: hasCloseIcon ? removeValueHandler : endAdornmentOnClick,
      endAdornmentType: hasCloseIcon ? 'icon' : endAdornmentType,
      disabled: Boolean(disabled),
      endAdornmentClassName,
    },
    onChangeValueForEndAdornment
  }
}

export default useInputEndAdornmentProps