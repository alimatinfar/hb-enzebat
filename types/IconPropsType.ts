import React from "react";

export type IconPropsType = {
  className?: string;
  textColor?: string;
  width?: string | number;
  height?: string | number;
}

export type IconFunctionType = (props:IconPropsType) => React.JSX.Element