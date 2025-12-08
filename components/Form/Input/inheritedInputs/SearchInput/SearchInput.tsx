import React from "react";
import {InputProps} from "@/components/Form/Input/types/InputProps";
import useCallFuncWithDelayAfterOnChange from "@/hooks/useCallFuncByDelayAfterOnChange";
import SearchInputRender from "@/components/Form/Input/inheritedInputs/SearchInput/SearchInputRender";


export type SearchInputProps = {
  inputProps?: InputProps;
  searchHandler: (value:string) => void;
  minLength?: number;
}

function SearchInput({inputProps = {}, searchHandler, minLength}: SearchInputProps) {

  const onQuery = useCallFuncWithDelayAfterOnChange({
    callAfterTypingHandler: searchHandler, minLength
  })

  function onChangeHandler(e:any) {
    onQuery(e.target.value)
    inputProps?.onChange && inputProps?.onChange(e)
  }

  return (
    <SearchInputRender
      onChange={onChangeHandler}
      {...inputProps}
    />
  )
}

export default SearchInput