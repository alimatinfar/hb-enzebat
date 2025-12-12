import React from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";

type Props = {
  isClickable?: boolean;
} & ChildrenAndClassNamePropsType

function Card(
  {children, className, isClickable}: Props
) {
  return (
    <div className={`
      ${className || ''} bg-gray-3 p-4 rounded-lg border border-gray-300 duration-200
      ${isClickable && 'hover:border-gray-400 cursor-pointer'}
    `}>
      {children}
    </div>
  );
}

export default Card;