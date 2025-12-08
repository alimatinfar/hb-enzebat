import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function RefreshIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-black'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.908 14.592a7.083 7.083 0 0 1 6.438-11.947m4.281 2.746a7.085 7.085 0 0 1-7.355 11.083m5.952-9.945V3.873h2.656zm-8.69 6.033v2.656H3.877z"
      ></path>
    </svg>
  )
}

export default RefreshIcon