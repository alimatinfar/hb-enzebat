import React, {JSX, useCallback} from "react";
import EmptyState from "./EmptyState";
import Loading from "../Loading/Loading";
import {ReactNode} from "react";
import {getResponseErrorMessage} from "@/request/utils/getResponse";
import RenderLogicDefaultContainer from "@/components/others/RenderLogic/RenderLogicDefaultContainer";
import FilterEmptyState from "@/components/svg/RenderLogic/FilterEmptyState";

export type RenderLogicProps = {
  error?: Error | null | string,
  isLoading?: boolean,
  loadingElement?: JSX.Element,
  children: JSX.Element,
  errorComponent?: JSX.Element,
  isEmpty?: boolean,
  emptyText?: string,
  emptyElement?: any,
  renderLogicDefaultContainerMinHeight?: string,
  hasFilter?: boolean,
}

function RenderLogic(
  {
    error, isLoading, loadingElement, children, isEmpty, emptyText, errorComponent,
    emptyElement, renderLogicDefaultContainerMinHeight, hasFilter
  }: RenderLogicProps
) {

  const CustomRenderLogicDefaultContainer = useCallback(({children}: { children: ReactNode }) => {
    return (
      <RenderLogicDefaultContainer minHeight={renderLogicDefaultContainerMinHeight}>
        {children}
      </RenderLogicDefaultContainer>
    )
  }, [renderLogicDefaultContainerMinHeight]);

  if (error) {
    return (
      <CustomRenderLogicDefaultContainer>
        {errorComponent || (
          <span className='text-red-500'>
            {getResponseErrorMessage(error) || 'دریافت اطلاعات با خطا مواجه شد'}
          </span>
        )}
      </CustomRenderLogicDefaultContainer>
    )
  } else if (isLoading) {
    return (
      <CustomRenderLogicDefaultContainer>
        {loadingElement || <Loading/>}
      </CustomRenderLogicDefaultContainer>
    )
  } else if (isEmpty) {
    return (
      <CustomRenderLogicDefaultContainer>
        {hasFilter ? (
          <EmptyState icon={<FilterEmptyState/>}/>
        ) : emptyElement || <EmptyState title={emptyText}/>}
      </CustomRenderLogicDefaultContainer>
    )
  } else {
    return children
  }

}

export default RenderLogic;