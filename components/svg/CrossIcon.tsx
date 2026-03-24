import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function CrossIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-red-500'}`}
        strokeLinecap="round"
        strokeWidth="2"
        d="M8.333 1.667L1.667 8.333m6.666 0L1.667 1.667"
      ></path>
    </svg>
  )
}

export default CrossIcon