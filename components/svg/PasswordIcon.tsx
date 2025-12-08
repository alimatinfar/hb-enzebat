import React from "react";
import {IconPropsType} from "@/types/IconPropsType";


function PasswordIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g clipPath="url(#clip0_2291_32990)">
        <path
          className={`stroke-current duration-200 ${textColor || 'text-gray-500'}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_2291_32990">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default PasswordIcon