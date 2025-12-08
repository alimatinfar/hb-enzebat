import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function InfoIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      fill="none"
      viewBox="0 0 19 18"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-gray-400'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.207 8.438l.03-.016a.562.562 0 01.798.64l-.531 2.127a.562.562 0 00.797.64l.03-.017M16.52 9a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0zM9.77 6.187h.006v.006H9.77v-.005z"
      ></path>
    </svg>
  )
}

export default InfoIcon