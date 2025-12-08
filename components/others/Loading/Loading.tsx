import React from "react";
import classes from './Loading.module.css'
import COLORS from "@/constances/colors";


const SIZES = {
  sm: 'text-[2px]',
  md: 'text-[4px]',
  lg: 'text-[8px]',
  xl: 'text-[16px]',
}

export type LoadingProps = {
  size?: keyof typeof SIZES;
  color?: keyof typeof COLORS;
  customSize?: '';
}

function Loading({size='md', color='primary', customSize}: LoadingProps) {

  const fontSize = customSize || SIZES[size];
  const colorValue = COLORS[color]

  return (
    <div className={`flex items-center justify-center w-[9.5em] ${fontSize}`}>
      <div
        className={`${classes.loader} ${fontSize}`}
        style={{color: colorValue}}
      ></div>
    </div>
  )
}

export default Loading