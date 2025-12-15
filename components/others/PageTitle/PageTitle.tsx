'use client'

import React, {useCallback} from 'react';
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";
import BackIconClickable from "@/components/others/Icon/BackIconClickable";
import {useRouter} from "next/navigation";

type Props = {
  hasBack?: boolean
} & Pick<ChildrenAndClassNamePropsType, 'children'>

function PageTitle({children, hasBack}: Props) {

  const router = useRouter()

  const onBackRoute = useCallback(function () {
    router.back()
  }, [router])

  return (
    <div className='flex items-center space-x-2 mb-4 pb-4 border-b border-gray-5 w-full'>
      {hasBack && (
        <BackIconClickable onBackRoute={onBackRoute} />
      )}

      <div className='font-semibold text-2xl flex-1'>
        {children}
      </div>
    </div>
  )
}

export default PageTitle;