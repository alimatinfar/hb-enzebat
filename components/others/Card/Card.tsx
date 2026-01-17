import React from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";

export type CardProps = {
  isClickable?: boolean;
  onClick?: ButtonProps['onClick'];
  backgroundClass?: string;
} & ChildrenAndClassNamePropsType

function Card(
  {children, className, isClickable, onClick, backgroundClass}: CardProps
) {
  return (
    <div
      {...onClick && {onClick}}
      className={`
      ${className || ''} p-4 rounded-lg border border-gray-300 duration-200
      ${isClickable && 'hover:border-gray-400 cursor-pointer select-none'} ${backgroundClass || 'bg-gray-3'}
    `}>
      {children}
    </div>
  );
}

export default Card;