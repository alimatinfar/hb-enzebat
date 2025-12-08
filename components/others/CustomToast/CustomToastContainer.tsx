import React from "react";
import {ToastContainer} from "react-toastify";


type Props = {
  className?: string
}

export default function CustomToastContainer({className}: Props) {
  return (
    <ToastContainer
      toastClassName={`${className} font-kook font-semibold flex items-center p-1 leading-6`}
      rtl={true}
      position="top-center"
      closeOnClick
      theme='dark'
    />
  )
}