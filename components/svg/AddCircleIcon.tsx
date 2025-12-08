import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function AddCircleIcon({className, textColor}: IconPropsType) {
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
        className={`fill-current duration-200 ${textColor || 'text-white'}`}
        d="M11 6.25a1 1 0 1 0-2 0zm-2 7.5a1 1 0 1 0 2 0zM13.75 11a1 1 0 1 0 0-2zm-7.5-2a1 1 0 0 0 0 2zm10.25 1a6.5 6.5 0 0 1-6.5 6.5v2a8.5 8.5 0 0 0 8.5-8.5zM10 16.5A6.5 6.5 0 0 1 3.5 10h-2a8.5 8.5 0 0 0 8.5 8.5zM3.5 10A6.5 6.5 0 0 1 10 3.5v-2A8.5 8.5 0 0 0 1.5 10zM10 3.5a6.5 6.5 0 0 1 6.5 6.5h2A8.5 8.5 0 0 0 10 1.5zM9 6.25V10h2V6.25zM9 10v3.75h2V10zm4.75-1H10v2h3.75zM10 9H6.25v2H10z"
      ></path>
    </svg>
  )
}

export default AddCircleIcon