import React, {RefObject} from "react";
import {Types} from "../../../types/types";

type Props = {
  children: Types["children"];
  className?: string;
  onClick?: (e?:any) => void;
  rounded?: "rounded-full" | "rounded-md" | "rounded-lg";
  isButton?: boolean;
  wrapperRef?: RefObject<HTMLDivElement>;
  hoverClass?: string;
  primaryMode?: boolean;
};

function IconClickable(
  {children, className, onClick, rounded = "rounded-lg", wrapperRef, hoverClass, primaryMode}: Props
) {
  return (
    <div
      {...(onClick && {onClick})} {...wrapperRef && {ref: wrapperRef}}
      className={`
        ${className || ""} p-1.5 cursor-pointer ${rounded} duration-200 
        ${hoverClass || primaryMode ? 'hover:bg-primary' : 'hover:bg-gray-300'}
      `}
    >
      {children}
    </div>
  );
}

export default IconClickable;
