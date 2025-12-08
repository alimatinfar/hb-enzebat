import React from "react";

type Props = {
  size: string
}

function Skeleton({size}: Props) {
  return (
    <div className={`animate-pulse bg-gray-200 ${size}`}></div>
  )
}

export default Skeleton