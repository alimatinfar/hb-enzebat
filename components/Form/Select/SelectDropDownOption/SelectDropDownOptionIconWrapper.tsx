import React, {ReactNode} from 'react';


type Props = {
  children: ReactNode;
  className?: string;
}

function SelectDropDownOptionIconWrapper({children, className}: Props) {
  return (
    <div className={`w-5 h-5 ${className || ''}`}>
      {children}
    </div>
  )
}

export default SelectDropDownOptionIconWrapper