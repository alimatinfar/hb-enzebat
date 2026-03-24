import {useEffect, useRef, useState} from "react";
import useOutsideClicked from "../../../../hooks/useOutsideClicked";
import {SelectOptionType, SelectProps, SelectOptionOnClickType} from "../select-exports";
import {multiSelectInputWrapperId} from "../InputForMultiSelectMode";
import {inputWrapperId} from "../../Input/Input";
import elementIsVisibleInViewport from "../../../../utils/elementIsVisibleInViewport";
import useSelectOptionsList from "./useSelectOptionsList";


function useSelect(
  {
    apiAddress, onSelect, options, value, name, mode, loading: loadingFromParent, apiOptionKey, apiOptionValue,
    inputProps
  }: SelectProps
) {

  const {
    optionsList, currentPage, rowsPerPage, allCount, setPage, loading,
    setQuery, filteredOptions, overlayLoading, selectDropDownRef
  } = useSelectOptionsList({
    options, apiAddress, loadingFromParent, apiOptionKey, apiOptionValue
  })

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

  const inputWrapperRef = useRef<HTMLDivElement | null>(null)

  useOutsideClicked(inputWrapperRef, closeDropDown, [value])

  function toggleDropDown() {
    if (inputProps?.disabled || loadingFromParent) return

    setDropDownOpen(prev => {
      if (prev) {
        setCurrentValueToInput()
        setQuery('')
      }
      return !prev
    })
  }

  function closeDropDown() {
    setCurrentValueToInput()
    setQuery('')
    setDropDownOpen(false)
  }

  const optionOnClick: SelectOptionOnClickType = function (e: any, selectValue: SelectOptionType) {
    if (mode === 'multiple') {
      setInputValue('')
      scrollToInput()
      const isExists = value && Boolean(value?.find((item: SelectOptionType) => item.id === selectValue.id))
      if (isExists) {
        onSelect(value?.filter((item: SelectOptionType) => item.id !== selectValue.id) || [])
      } else {
        onSelect([...value || [], selectValue])
      }
    } else {
      closeDropDown()
      onSelect(selectValue)
    }
    setQuery('')
    mode === 'single' && setDropDownOpen(false)
    e.stopPropagation()
  }

  function getInputElement() {
    const element: HTMLInputElement = document.querySelector(`#${name}`)!
    return element
  }

  function scrollToInput() {
    const element = getInputElement()
    if (!element) return
    element.scrollIntoView({ behavior: "smooth" })
  }

  function setInputValue(inputValue: string) {
    const element = getInputElement()
    if (!element) return
    element.value = inputValue
    element.title = inputValue
  }

  function setCurrentValueToInput() {
    if (mode === 'multiple') {
    } else {
      if (value === '') {
        setInputValue('')
      } else if (value != null) {
        value != null && setInputValue(value?.name || '')
      }
    }
  }

  useEffect(() => {
    setCurrentValueToInput()
  }, [value]);

  function onQuery(e: any) {
    !dropDownOpen && setDropDownOpen(true)
    const targetValue = e.target.value.trim().toLowerCase()
    setQuery(targetValue)

    // setInputValue(targetValue)
  }

  function onRemoveHandler(tagId: SelectOptionType['id']) {
    if (mode === 'single') return
    const tagsInstance = value?.filter((item: SelectOptionType) => item.id !== tagId)
    tagsInstance && onSelect(tagsInstance)
  }

  function clearInput() {
    setDropDownOpen(false)
    setInputValue('')
    setQuery('')
    if (mode === 'multiple') {
      onSelect([])
    } else {
      onSelect('')
    }
  }

  const [dropDownStyle, setDropDownStyle] = useState<Object>({})
  const dropDownRef = useRef<HTMLDivElement>(null)

  function getInputPosition() {
    const inputElement = inputWrapperRef?.current?.querySelector(mode === 'multiple' ? `#${multiSelectInputWrapperId}` : `#${inputWrapperId}`)
    const position = inputElement?.getBoundingClientRect()
    return position
  }

  function calculateDropDownStyle() {
    const inputWrapperPosition = inputWrapperRef?.current?.getBoundingClientRect()
    const inputPosition = getInputPosition()
    const bodyWidth = document?.body?.clientWidth

    if (!inputWrapperPosition || !inputPosition) return {}

    setDropDownStyle({
      top: inputPosition.bottom + 1,
      right: bodyWidth - inputWrapperPosition?.right,
      width: inputWrapperPosition?.width,
    })
  }

  useEffect(() => {
    if (mode !== 'multiple') return
    setTimeout(calculateDropDownStyle, 200)
  }, [value])

  useEffect(function () {
    calculateDropDownStyle()
  }, [dropDownOpen])

  useEffect(() => {
    if (!dropDownStyle || !dropDownOpen) return

    setTimeout(function () {
      if (!dropDownRef.current) return
      const dropDownIsVisible = elementIsVisibleInViewport(dropDownRef.current)

      const inputPosition = getInputPosition()

      if (dropDownIsVisible || !inputPosition) return
      setDropDownStyle((prev:any) => ({
        top: inputPosition.top - 1,
        right: prev?.right,
        width: prev?.width,
        transform: 'translateY(-100%)'
      }))
    }, 300)
  }, [dropDownStyle]);

  //add label to current value when has not label
  useEffect(() => {
    if (mode !== 'multiple' && value && value?.id !== null && !value?.name && optionsList.length > 0) {
      const currentObjectValue = optionsList.find(item => item.id === value.id)
      currentObjectValue && onSelect(currentObjectValue)
    }
  }, [value, optionsList]);

  return {
    inputWrapperRef, toggleDropDown, dropDownOpen, optionsList, optionOnClick,
    onQuery, filteredOptions, onRemoveHandler, clearInput, dropDownStyle, dropDownRef,
    currentPage, rowsPerPage, allCount, setPage, loading, overlayLoading, selectDropDownRef
  }
}

export default useSelect