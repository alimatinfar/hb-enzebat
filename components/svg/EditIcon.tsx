import React from 'react';
import {IconPropsType} from "@/types/IconPropsType";


function EditIcon({className, textColor, width, height}: IconPropsType) {
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
        className={`stroke-current ${textColor || 'text-gray-500'}`}
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.325 4.907a1 1 0 0 1 1.414 0l2.353 2.35a1 1 0 0 1 0 1.415l-9.957 9.963a1 1 0 0 1-.51.273L4.2 19.8l.893-4.42a1 1 0 0 1 .273-.509z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default EditIcon;