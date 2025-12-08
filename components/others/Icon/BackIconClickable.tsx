import IconClickable from "./IconClickable";
import React from "react";
import ArrowBack from "../../svg/ArrowBack";


type Props = {
  onBackRoute: () => void
}

function BackIconClickable({onBackRoute}: Props) {
  return (
    <IconClickable rounded='rounded-md' onClick={onBackRoute}>
      <ArrowBack/>
    </IconClickable>
  )
}

export default BackIconClickable