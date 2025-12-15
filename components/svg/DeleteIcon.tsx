import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function DeleteIcon({textColor, className, height, width}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "24"}
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-gray-500'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.053.682.108 1.022.167m-1.022-.166L18.16 19.674a2.25 2.25 0 01-2.244 2.076H8.084a2.25 2.25 0 01-2.244-2.076L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397M4.772 5.79a43.48 43.48 0 00-1.022.165m1.022-.165a48.111 48.111 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.967 51.967 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.2v.917m7.5 0a48.668 48.668 0 00-7.5 0"
      ></path>
    </svg>
  )
}

export default DeleteIcon