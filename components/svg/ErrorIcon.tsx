import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function ErrorIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      fill="none"
      viewBox="0 0 17 16"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-red-500'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.77 8.6V5.61m0 5.206v.027m3.78 2.49H4.99a2.266 2.266 0 01-2.179-1.616c-.117-.398.027-.814.247-1.167l3.78-6.816c.885-1.423 2.977-1.423 3.863 0l3.78 6.816c.22.353.364.769.246 1.167a2.266 2.266 0 01-2.178 1.616z"
      ></path>
    </svg>
  )
}

export default ErrorIcon