import {useEffect, useMemo} from "react";
import useCallFunctionAfterVisitingElement from "../../../../hooks/useCallFunctionAfterVisitingElement";


const tolleranceScroll = 30

export type UseScrollPaginationProps = {
  allCount: number;
  rowsPerPage: number;
  currentPage: number;
  setPage: (page: number) => void;
  loading: boolean;
  autoRefreshData?: (page?: number) => void;
  autoRefreshDep?: any[];
  autoRefreshMinutes?: number;
  overflowElement: Element | null;
  detectEndScrollByPosition?: boolean;
  overlayLoading?: boolean;
}

function useScrollPagination(
  {
    allCount, rowsPerPage, currentPage, setPage, loading, overflowElement, detectEndScrollByPosition, overlayLoading
  }: UseScrollPaginationProps
) {

  function fetchNextPage() {
    setPage(currentPage + 1)
  }

  const pagesCount = useMemo(function () {
    return Math.ceil(allCount / rowsPerPage)
  }, [allCount, rowsPerPage])

  const shouldNotFetchNextPageCondition = (currentPage >= pagesCount || loading)

  const showMoreElementRef = useCallFunctionAfterVisitingElement(function () {
    if (shouldNotFetchNextPageCondition || detectEndScrollByPosition) return
    fetchNextPage()
  }, [shouldNotFetchNextPageCondition], {root: overflowElement})

  useEffect(() => {
    if (!overflowElement) return
    overflowElement.scrollTop = 0
  }, [overlayLoading]);

  useEffect(() => {
    if (!detectEndScrollByPosition || !overflowElement) return

    function scrollEventListener() {
      const {offsetHeight, scrollTop, scrollHeight}: any = overflowElement

      if ((offsetHeight + scrollTop + tolleranceScroll < scrollHeight) || shouldNotFetchNextPageCondition) return
      fetchNextPage()
    }

    (overflowElement as Element).addEventListener('scroll', scrollEventListener)

    return function() {
      (overflowElement as Element).removeEventListener('scroll', scrollEventListener)
    }
  }, [overflowElement, shouldNotFetchNextPageCondition]);

  const hasUnFetchedPage = currentPage < pagesCount

  return {
    showMoreElementRef, pagesCount, hasUnFetchedPage
  }
}

export default useScrollPagination;