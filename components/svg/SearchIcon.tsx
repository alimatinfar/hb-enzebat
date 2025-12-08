import React from 'react';
import {IconPropsType} from "@/types/IconPropsType";

function SearchIcon({textColor, className}: IconPropsType) {
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
        className={`stroke-current ${textColor || 'text-gray-500'}`}
        strokeLinecap="round"
        strokeWidth="2"
        d="M14.106 14.2 17 17m-.933-7.467A6.533 6.533 0 1 1 3 9.533a6.533 6.533 0 0 1 13.067 0Z"
      ></path>
    </svg>
  );
}

export default SearchIcon;