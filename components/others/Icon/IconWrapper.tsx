import React from 'react';
import {Types} from "../../../types/types";


type Props = {
  widthClass: string;
  children: Types['children'];
}

function IconWrapper({widthClass, children}: Props) {
  return (
    <div className={`${widthClass} aspect-square overflow-hidden`}>
      {children}
    </div>
  )
}

export default IconWrapper