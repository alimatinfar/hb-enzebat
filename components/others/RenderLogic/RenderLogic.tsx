import React, {JSX, Suspense, useCallback} from "react";
import EmptyState from "./EmptyState";
import Loading from "../Loading/Loading";
import {ReactNode} from "react";
import ErrorState from "./ErrorState";

type Props = {
  error?:string,
  isLoading?: boolean,
  loadingElement?: JSX.Element,
  children: JSX.Element,
  errorComponent?: JSX.Element,
  isEmpty?: boolean,
  emptyText?: string,
  emptyElement?: any,
  containerHeightAndPaddingClass?: string,
}

function RenderLogic(
  {
    error, isLoading, loadingElement, children, isEmpty, emptyText, errorComponent,
    emptyElement, containerHeightAndPaddingClass
  }: Props
) {

  const RenderLogicDefaultContainer = useCallback(function ({children}:{children: ReactNode}) {
    return (
      <Suspense fallback={<Loading size='md' />}>
        <div className={`
          flex-1 w-full h-full flex items-center justify-center ${containerHeightAndPaddingClass || 'min-h-[300px]'}
        `}>
          {children}
        </div>
      </Suspense>
    )
  }, [containerHeightAndPaddingClass])

  if (error) {
    return errorComponent ?? (
      <RenderLogicDefaultContainer>
        <ErrorState title={error || 'خطا در دریافت اطلاعات'} />
      </RenderLogicDefaultContainer>
    )
  } else if (isLoading) {
    return loadingElement || (
      <RenderLogicDefaultContainer>
        <Loading/>
      </RenderLogicDefaultContainer>
    )
  } else if (isEmpty) {
    return emptyElement || (
      <RenderLogicDefaultContainer>
        <EmptyState title={emptyText || 'موردی یافت نشد'}/>
      </RenderLogicDefaultContainer>
    )
  } else {
    return children
  }

}

export default RenderLogic;