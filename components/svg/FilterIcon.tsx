import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function FilterIcon({textColor, className}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-gray-700'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.885 10h9.23M3.835 5.833h13.333m-8.205 8.334h3.077"
      ></path>
    </svg>
  )
}

export default FilterIcon