import React from 'react';
import {IconPropsType} from "@/types/IconPropsType";

function UserIcon({className, textColor, height, width}: IconPropsType) {
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
        strokeWidth="2"
        d="M2.4 20.512c0-3.775 3.155-6.836 9.6-6.836s9.6 3.06 9.6 6.836c0 .601-.438 1.088-.978 1.088H3.379c-.54 0-.979-.487-.979-1.088ZM15.6 6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
      ></path>
    </svg>
  );
}

export default UserIcon;