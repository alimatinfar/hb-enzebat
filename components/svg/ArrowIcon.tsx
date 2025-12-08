import React from "react";
import {IconPropsType} from "@/types/IconPropsType";


function ArrowIcon({className, textColor}: IconPropsType) {
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
        className={`stroke-current duration-200 ${textColor || 'text-gray-500'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 8l5 4.58L15 8"
      ></path>
    </svg>
  )
}

export default ArrowIcon;
