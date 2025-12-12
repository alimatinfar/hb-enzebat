import React from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";

type Props = {
  isClickable?: boolean;
  onClick?: ButtonProps['onClick'];
} & ChildrenAndClassNamePropsType

function Card(
  {children, className, isClickable, onClick}: Props
) {
  return (
    <div
      {...onClick && {onClick}}
      className={`
      ${className || ''} bg-gray-3 p-4 rounded-lg border border-gray-300 duration-200
      ${isClickable && 'hover:border-gray-400 cursor-pointer select-none'}
    `}>
      {children}
    </div>
  );
}

export default Card;