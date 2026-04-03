import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function ClassIcon({textColor, className, height, width}: IconPropsType) {
  return (
    <svg
      className={`stroke-current duration-200 ${textColor || 'text-gray-500'}`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
      <line x1="3" y1="18" x2="21" y2="18"></line>
      <line x1="9" y1="22" x2="15" y2="22"></line>
    </svg>
  )
}

export default ClassIcon;