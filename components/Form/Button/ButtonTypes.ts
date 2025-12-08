import {ReactNode} from "react";

export type ButtonClassNameType = {
  default?: string;
  size?: string;
  color?: string;
  width?: string;
  minWidth?: string;
  radius?: string;
  extra?: string;
}

export type ButtonSizesType = 'sm' | 'md'
export type ButtonVariantsType = 'filled' | 'link' | 'default' | 'outlined'
export type ButtonColorsType = 'primary' | 'red' | 'white'

export type ButtonProps = {
  children: ReactNode,
  onClick?: (e?: any) => void,
  type?: 'submit' | 'button',
  className?: ButtonClassNameType,
  variant?: ButtonVariantsType,
  size?: ButtonSizesType,
  color?: ButtonColorsType,
  disabled?: boolean,
  loading?: boolean,
  fullWidth?: boolean,
  rightIcon?: ReactNode,
  leftIcon?: ReactNode,
  justIcon?: boolean,
  hiddenBorderRight?: boolean,
  hiddenBorderLeft?: boolean,
  readOnly?: boolean,
  longPress?: boolean,
  longPressTime?: number,
}