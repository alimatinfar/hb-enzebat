import {useEffect, useMemo, useState} from "react";
import {SelectDropDownScrollPagination, SelectOptionType, SelectProps} from "../select-exports";
import fetchOptions from "../fakeOptionsAPI";
import useCallFuncWithDelayAfterOnChange from "../../../../hooks/useCallFuncByDelayAfterOnChange";
import useSelectDropDownRef from "./useSelectDropDownRef";
import useFetchData from "@/request/hooks/useFetchData";


type FiltersType = {
  page: number,
  query: string
}

const initialFilters: FiltersType = {
  page: 1,
  query: ''
}

export const selectRowsPerPage = 10

type Props = {
  options: SelectProps['options'],
  apiAddress: SelectProps['apiAddress'],
  apiOptionKey: SelectProps['apiOptionKey'],
  apiOptionValue: SelectProps['apiOptionValue'],
  loadingFromParent?: boolean,
}

function useSelectOptionsList(
  {options, apiAddress, loadingFromParent, apiOptionKey, apiOptionValue}: Props
) {

  const selectDropDownRef = useSelectDropDownRef()

  const [filters, setFilters] = useState<FiltersType>(initialFilters)

  const [optionsList, setOptionsList] = useState<SelectOptionType[]>(options || [])
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false)
  const [listResponse, setListResponse] = useState<any>()
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false)

  const {
    data: responseData, isFetching: listLoading, error: listError
  } = useFetchData<any[]>({
    axiosConfig: {
      url: apiAddress || '',
    },
    options: {
      enabled: !!apiAddress
    }
  })

  useEffect(() => {
    if (!responseData) return
    // const mappedList = responseData?.data?.map((item: any) => ({
    //   id: item?.[apiOptionKey || 'id'] || '',
    //   name: item?.[apiOptionValue || 'name'] || '',
    // }))
    //
    // setOptionsList(mappedList)
  }, [responseData]);

  const setQueryWithDelay = useCallFuncWithDelayAfterOnChange({
    callAfterTypingHandler: setQueryHandler, time: 700
  })

  useEffect(function () {
    if (!options) return
    setOptionsList(options || [])
  }, [options])

  function fetchOptionsList() {

    if (filters.page === 1 && selectDropDownRef?.current) selectDropDownRef?.current.scrollToTop()

    const response = fetchOptions({page: filters.page, search: filters.query, rowsPerPage: selectRowsPerPage})
    setPaginationLoading(true)
    setTimeout(function () {
      setListResponse(response)
      setOptionsList(prev => ([
        ...filters.page === 1 ? [] : prev,
        ...response.data
      ]))
      setPaginationLoading(false)
      setOverlayLoading(false)
    }, 2000)

    // TODO should be implemented fetching options from apiAddress
    // const params = {
    //   page
    // }

    // getListRequest({url: apiAddress, params}).then(response => {
    //   setOptionsList(prev => ([
    //     ...prev,
    //     ...response.data.data
    //   ]))
    // })
  }

  // useEffect(() => {
  //   if (!apiAddress) return
  //   fetchOptionsList()
  // }, [filters]);

  // useEffect(() => {
  //   if (!apiAddress) return
  //   setOverlayLoading(true)
  // }, [filters.query]);

  function setFiltersHandler(filterObject: Partial<FiltersType>) {
    const finalObject:any = {}

    for (const [key, value] of Object.entries(filterObject)) {
      if ((filters as any)[key] === value) continue
      finalObject[key] = value
    }

    if (Object.entries(finalObject).length === 0) return

    setFilters((prev:any) => ({
      ...prev,
      ...finalObject,
    }))
  }

  function setQueryHandler(query: FiltersType['query']) {
    if (filters.query === query) return
    setFiltersHandler({query, page: 1})
  }

  function setPageState(page: FiltersType['page']) {
    setFiltersHandler({page})
  }

  // TODO should be set pagination fields from response correctly
  let currentPage = 0, rowsPerPage = 0, allCount = 0, loading = Boolean(loadingFromParent),
    setPage: SelectDropDownScrollPagination['setPage'], setQuery = setQueryHandler;

  if (apiAddress) {
    currentPage = listResponse?.currentPage
    rowsPerPage = listResponse?.rowsPerPage
    allCount = listResponse?.allCount
    setPage = setPageState
    setQuery = setQueryWithDelay
    loading = paginationLoading
    // loading = listResponse?.loading
  }


  const filteredOptions = useMemo(function () {
    if (apiAddress) return optionsList
    return optionsList.filter(item => item.name.toLowerCase().includes(filters.query))
  }, [optionsList, filters.query])

  return {
    optionsList, listResponse, currentPage, rowsPerPage, allCount, setPage, loading,
    setQuery, filteredOptions, overlayLoading, selectDropDownRef
  }
}

export default useSelectOptionsList