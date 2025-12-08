import React, {lazy} from "react";
const ErrorStateIcon = lazy(() => import("../../svg/RenderLogic/ErrorStateIcon"));

type Props  = {
  title: string
}

function ErrorState({title}: Props) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <ErrorStateIcon/>
      <p className='text-gay-900'>
        {title}
      </p>
    </div>
  )
}

export default ErrorState