import React from "react";
import Skeleton from "../../others/Skeleton/Skeleton";


type Props = {
  count?: 1 | 3
}

function SelectOptionsSkeleton({count = 1}: Props) {
  return (
    <div className={`space-y-1 ${count === 1 ? 'mb-1' : ''}`}>
      {new Array(count).fill(0).map((_, index) => (
        <Skeleton key={index} size='h-9 w-full rounded' />
      ))}
    </div>
  )
}

export default SelectOptionsSkeleton