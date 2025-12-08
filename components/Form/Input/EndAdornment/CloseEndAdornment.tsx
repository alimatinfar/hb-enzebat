import React, {ReactNode} from "react";
import Loading from "../../../others/Loading/Loading";
import CloseIcon from "../../../svg/CloseIcon";


export type CloseEndAdornmentProps = {
  loading?: boolean,
  hasNotValue: boolean,
  children: ReactNode
}

function CloseEndAdornment({loading, hasNotValue, children}: CloseEndAdornmentProps) {
  return loading ? (
    <Loading size="sm"/>
  ) : hasNotValue ? (
    <>{children}</>
  ) : (
    <div
      className="flex items-center cursor-pointer w-full h-full"
    >
      <CloseIcon/>
    </div>
  )
}

export default CloseEndAdornment;