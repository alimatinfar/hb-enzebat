'use client'

import React, {ReactNode, useCallback} from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import BackIconClickable from "@/components/others/Icon/BackIconClickable";
import {useRouter} from "next/navigation";

export type PageTitleProps = {
  hasBack?: boolean;
  small?: boolean;
  endAdornment?: ReactNode;
} & Pick<ChildrenAndClassNamePropsType, 'children'>

function PageTitle({children, hasBack, small, endAdornment}: PageTitleProps) {

  const router = useRouter()

  const onBackRoute = useCallback(function () {
    router.back()
  }, [router])


  return (
    <div className='flex items-center justify-between w-full border-b border-gray-5 mb-4 pb-4 gap-x-4'>
      <div className='flex items-center space-x-2 w-full'>
        {hasBack && (
          <BackIconClickable onBackRoute={onBackRoute} />
        )}

        <div className={`${small ? 'font-semibold text-lg' : 'font-semibold text-2xl'} flex-1`}>
          {children}
        </div>
      </div>

      {endAdornment ? endAdornment : null}
    </div>
  )
}

export default PageTitle;