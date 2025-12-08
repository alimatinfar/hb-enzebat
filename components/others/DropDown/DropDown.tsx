import React from "react";
import {Types} from "../../../types/types";
import useDropDown from "./hooks/useDropDown";
import {SetStateType} from "../../../types/SetStateType";


export type DropDownProps = {
  dropDownOpen: boolean;
  setDropDownOpen: SetStateType<boolean>;
  children: Types['children'];
  dropDownElement: Types['children'];
  origin?: 'right' | 'left';
  offset?: number;
}

function DropDown(
  {
    children, dropDownElement, origin = 'right', dropDownOpen, setDropDownOpen, offset
  }: DropDownProps
) {

  const {
    childrenRef, childrenOnClick, shouldBeRemoved, dropDownStyle, dropDownRef,
    dropDownOnClick, showWithAnimation
  } = useDropDown({
    origin, dropDownOpen, setDropDownOpen, offset
  })

  return (
    <div ref={childrenRef} onClick={childrenOnClick}>
      {children}

      {!shouldBeRemoved && (
        <div
          style={dropDownStyle} onClick={dropDownOnClick} ref={dropDownRef}
          className={`fixed duration-200 shadow z-50 bg-white rounded-xl origin-top ${showWithAnimation ? '' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          {dropDownElement}
        </div>
      )}
    </div>
  )
}

export default DropDown