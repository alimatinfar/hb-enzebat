import React from "react";

export type IconPropsType = {
  className?: string;
  textColor?: string;
  width?: string;
  height?: string;
}

export type IconFunctionType = (props:IconPropsType) => React.JSX.Element