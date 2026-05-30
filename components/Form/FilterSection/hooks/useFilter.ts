import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import setDefaultValuesFromObject
  from "@/components/Form/FormLayout/ReactHookFormWrapper/utils/setDefaultValuesFromObject";
import QUERY_PARAMS from "@/constances/queryParams";
import {useCallback, useEffect, useMemo} from "react";
import {FilterType} from "@/components/Form/FilterSection/index.types";
import useStateQueryParams from "@/hooks/useState/useStateQueryParams";
import deepEqual from "@/utils/deepEqual";
import useModalOpen from "@/hooks/modal/useModalOpen";


export type UseFilterProps<T> = {
  defaultFilterFormData: T;
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  filterCustomValidation?: (filterData: T) => boolean;
  filterDataMapper?: (filterData: T) => T;
}

function useFilter<T extends object>(
  {defaultFilterFormData, defaultCurrentPage, defaultRowsPerPage, filterCustomValidation, filterDataMapper}: UseFilterProps<T>
) {

  const initialFilterData = useMemo(() => ({
    data: defaultFilterFormData,
    currentPage: defaultCurrentPage || 1,
    rowsPerPage: defaultRowsPerPage || 10,
  }), [defaultFilterFormData, defaultCurrentPage, defaultRowsPerPage])

  const [filters, setFilters] = useStateQueryParams<FilterType<T>>({
    initialState: initialFilterData,  queryParamKey: QUERY_PARAMS.FILTERS
  })

  const filtersIsDefault = useMemo(function () {
    return deepEqual(filters, initialFilterData)
  }, [filters, initialFilterData])

  const {formMethods: formMethodsFilter, onSubmit: onSubmitFilter} = useReactHookFormWrapper<T>({
    onSubmitHandler: onFilterHandler,
  })

  function setInitialFormData(customDefaultValues: any) {
    setDefaultValuesFromObject({defaultValues: customDefaultValues, setValue: formMethodsFilter.setValue})
  }

  function setFiltersValuesToInputs() {
    setInitialFormData(filters.data)
  }

  const {
    closeModal: closeFilterModal, open: filterModalOpen, setModalState, shouldBeRemoved: filterModalShouldBeRemoved,
  } = useModalOpen<boolean>(false)

  useEffect(() => {
    // if (!filterModalOpen) return
    setFiltersValuesToInputs()
  }, []);

  const openFilterModalHandler = useCallback(function () {
    setModalState(true)
  }, [setModalState])

  function resetFilters() {
    closeFilterModal()
    setInitialFormData(initialFilterData.data)
    setFilters(prev => ({
      ...prev,
      data: initialFilterData.data,
      currentPage: 1
    }))
  }

  function setCustomFilterHandler(customFilter: Partial<Record<keyof FilterType<T>, any>>) {
    setFilters(prev => ({...prev, ...customFilter}))
  }

  function onFilterHandler(data: T) {
    if (filterCustomValidation) {
      const isValid = filterCustomValidation(data)
      if (!isValid) return
    }

    const finalData = filterDataMapper ? filterDataMapper(data) : data

    closeFilterModal()
    setCustomFilterHandler({data: finalData, currentPage: 1})
  }

  function setRowsPerPage(value: number) {
    setCustomFilterHandler({rowsPerPage: value, currentPage: 1})
  }

  function setCurrentPage(value: number) {
    setCustomFilterHandler({currentPage: value})
  }

  const activeFilterCount = useMemo(function () {
    return Object.entries(filters.data as any).filter((([key, value]: any) => {
      return value || value === 0
    })).length
  }, [filters.data])
  
  return {
    setRowsPerPage, setCurrentPage, onSubmitFilter, formMethodsFilter, resetFilters, filters, activeFilterCount,
    setFiltersValuesToInputs, filtersIsDefault,
    closeFilterModal, filterModalOpen, filterModalShouldBeRemoved, openFilterModalHandler,
  }
}

export default useFilter