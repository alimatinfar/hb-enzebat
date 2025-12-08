import React from "react";


type Props = {
  onClick?: () => void;
  wrapperRef?: any;
}

function MoreIcon({onClick, wrapperRef}: Props) {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 20 20"
        {...wrapperRef && {ref: wrapperRef}}
        {...onClick && {onClick}}
      >
        <path
          stroke="#111827"
          strokeWidth="1.5"
          d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        ></path>
      </svg>
  )
}

export default MoreIcon