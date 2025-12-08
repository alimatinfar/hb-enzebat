import convertPersianNumberToEnglish from "../../../../utils/convertPersianNumberToEnglish";
import removeSeparator from "../../../../utils/separator/removeSeparator";
import joinObjectValues from "../../../../utils/joinObjectValues";
import {InputProps} from "../types/InputProps";
import setSeparator from "@/utils/inputOperations/setSeparator";
import inputOnKeyDownJustNumber from "@/utils/inputOperations/inputOnKeyDownJustNumber";
import onInputJustUpperCaseEnglish from "@/utils/inputOperations/onInputJustUpperCaseEnglish";
import onInputJustEnglishLetters from "@/utils/inputOperations/onInputJustEnglishLetters";
import onInputUpperCaseEnglish from "@/utils/inputOperations/onInputUpperCaseEnglish";
import onInputLimitedDecimals from "@/utils/inputOperations/onInputLimitedDecimals";

type Props = {
  inputStyles: Object;
} & Pick<
  InputProps,
  "maxLength" | "bySeparator" | "justNumber" | "useTrim" | "onChange" | "onKeyPress" | "onEnter" | "inputRef" |
  "value" | "autoCompleteOff" | "defaultValue" | "onClick" | "rows" | "readOnly" | "justSelectOnClick" |
  "placeholder" | "inputMode" | "type" | "disabled" | "onBlur" | "onKeyDown" | "name" | "hasDotKey" | "onFocus" |
  "autoCapitalize" | "justEnglishLetter" | "justUpperCaseEnglish" | "upperCaseEnglish" | "decimalCounts"
>;

function useInput(
  {
    maxLength, bySeparator, justNumber, useTrim, onChange, onKeyPress, onEnter, value, inputRef, onKeyDown, onBlur,
    inputStyles, inputMode, disabled, type, placeholder, readOnly, justSelectOnClick, rows, justUpperCaseEnglish,
    defaultValue, onClick, autoCompleteOff, name, hasDotKey, onFocus, autoCapitalize, justEnglishLetter, decimalCounts,
    upperCaseEnglish
  }: Props
) {


  function changePersianNumberToEnglish(e: any) {
    e.target.value = convertPersianNumberToEnglish(e.target.value);
  }

  function onChangeHandler(e: any) {
    const value = removeSeparator(e.target.value);
    if (maxLength && value.length > maxLength) return;
    if (bySeparator) setSeparator({event: e});
    if (justNumber) changePersianNumberToEnglish(e);
    if (useTrim) e.target.value = e.target.value?.trim();

    onChange && onChange(e);
  }

  function onKeyPressHandler(e: any) {
    onKeyPress && onKeyPress(e);

    if (justNumber) inputOnKeyDownJustNumber({event:e, hasDotKey});
    // if (justEnglishLetter) inputOnKeyDownJustEnglishLetters({event:e});

    const keyCode = e.which;
    const isEnterKey = keyCode === 13;

    if (isEnterKey && onEnter) {
      onEnter();
      e.preventDefault();
    }
  }

  function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (justEnglishLetter) onInputJustEnglishLetters(e)
    if (justUpperCaseEnglish) onInputJustUpperCaseEnglish(e)
    if (upperCaseEnglish) onInputUpperCaseEnglish(e)
    if (decimalCounts) onInputLimitedDecimals(e, decimalCounts)
  }

  const inputProps = {
    ...(name && {id: name}),
    ...(inputRef && {ref: inputRef}),
    ...(value != null ? {value} : {}),
    ...(autoCompleteOff && {autoComplete: "new-password"}),
    ...(defaultValue && {defaultValue}),
    ...(onClick && {onClick}),
    ...(onFocus && {onFocus}),
    ...(rows && {rows}),
    ...(autoCapitalize && {autoCapitalize}),
    onChange: onChangeHandler,
    ...((justSelectOnClick || readOnly) && {readOnly: true}),
    placeholder: placeholder || "",
    inputMode: inputMode || (justNumber ? 'numeric' : "text"),
    type: type || "text",
    disabled: Boolean(disabled),
    className: joinObjectValues(inputStyles),
    onBlur,
    onKeyDown,
    onInput: onInputHandler,
    onKeyPress: onKeyPressHandler,
    ...value && {title: value},
  };

  return {inputProps};
}

export default useInput;
