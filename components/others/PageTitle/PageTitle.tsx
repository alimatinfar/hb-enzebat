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
    <div className='flex items-center space-x-2 mb-4 pb-4 border-b border-gray-5'>
      {hasBack && (
        <BackIconClickable onBackRoute={onBackRoute} />
      )}

      <h1 className='font-semibold text-2xl'>
        {children}
      </h1>
    </div>
  )
}

export default PageTitle;