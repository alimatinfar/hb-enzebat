import React from "react";
import DropDown, {DropDownProps} from "../DropDown";
import {Types} from "../../../../types/types";
import DropDownActionsOptions from "./DropDownActionsOptions";


export type DropDownActionType = {
  onClick: (e?: any) => void;
  icon: Types['children'];
  title: string;
  titleClass?: string;
}

export type DropDownActionsProps = {
  children: Types['children'];
  actions: DropDownActionType[];
  minWidth?: string;
  dropDownOpen: DropDownProps['dropDownOpen'];
  setDropDownOpen: DropDownProps['setDropDownOpen'];
  origin?: DropDownProps['origin'];
}

function DropDownActions(
  {actions, children, minWidth, dropDownOpen, setDropDownOpen, origin}: DropDownActionsProps
) {

  const dropDownActions = (
    <DropDownActionsOptions
      {...{actions, minWidth, setDropDownOpen}}
    />
  )

  return (
    <DropDown
      dropDownOpen={dropDownOpen} setDropDownOpen={setDropDownOpen} dropDownElement={dropDownActions}
      origin={origin}
    >
      {children}
    </DropDown>
  )
}

export default DropDownActions