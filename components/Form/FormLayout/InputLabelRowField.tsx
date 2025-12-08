import React, {ReactNode} from "react";
import {InputProps} from "../Input/types/InputProps";
import {inputSizes} from "../Input/hooks/useInputStyles";

type Props = {
  label?: InputProps['label'];
  children: ReactNode;
}

function InputLabelRowField({label, children}: Props) {


  return (
    <div className='flex space-x-2'>
      {label && <p className={`w-40 ${inputSizes['md']} flex items-center text-gray-500`}>{label}</p>}
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default InputLabelRowField