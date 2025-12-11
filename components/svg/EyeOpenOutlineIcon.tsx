import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function EyeOpenOutlineIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g
        className={`stroke-current duration-200 ${textColor || 'text-black/30'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_362_12822)"
      >
        <path
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.574-3.007-9.964-7.178z"></path>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </g>
      <defs>
        <clipPath id="clip0_362_12822">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default EyeOpenOutlineIcon