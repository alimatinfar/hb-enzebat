import SearchIcon from "@/components/svg/SearchIcon";
import Input from "@/components/Form/Input/Input";
import React from "react";
import {InputProps} from "@/components/Form/Input/types/InputProps";

function SearchInputRender(props: InputProps) {
  return (
    <Input
      hiddenErrorMessage
      startAdornment={<SearchIcon />}
      placeholder='جستجو...'
      {...props}
    />
  )
}

export default SearchInputRender