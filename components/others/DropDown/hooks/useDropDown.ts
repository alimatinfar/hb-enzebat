import {useEffect, useRef, useState} from "react";
import useDisplayWithAnimation from "../../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import useOutsideClicked from "../../../../hooks/useOutsideClicked";
import {DropDownProps} from "../DropDown";
import elementIsVisibleInViewport from "../../../../utils/elementIsVisibleInViewport";

function useDropDown(
  {
    origin, dropDownOpen, setDropDownOpen, offset = 0
  }: Pick<DropDownProps, 'origin' | 'dropDownOpen' | 'setDropDownOpen' | 'offset'>
) {

  const { showWithAnimation, shouldBeRemoved } = useDisplayWithAnimation({
    show: dropDownOpen,
  });

  const [dropDownStyle, setDropDownStyle] = useState<any>()
  const childrenRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)

  useOutsideClicked(childrenRef, closeDropDown)

  function calculateDropDownStyle() {
    const position = childrenRef?.current?.getBoundingClientRect()
    const bodyWidth = document?.body?.clientWidth

    if (!position) return {}

    setDropDownStyle({
      top: position.bottom + 1 + offset,
      ...origin === 'right' ? {right: bodyWidth - position?.right} : {left: position?.left},
    })
  }

  useEffect(() => {
    if (!open || !dropDownRef?.current || !childrenRef?.current) return

    const optionsContainerIsVisible = elementIsVisibleInViewport(dropDownRef?.current)

    if (optionsContainerIsVisible) return

    const containerHeight = dropDownRef.current.clientHeight;
    const childrenHeight = childrenRef.current.clientHeight;
    setDropDownStyle((prev: any) => ({
      ...prev,
      top: prev.top - containerHeight - childrenHeight,
    }));
  }, [open, dropDownRef?.current, childrenRef?.current]);

  useEffect(function () {
    const closeDropDown = () => {
      setDropDownOpen(false)
    }
    dropDownOpen && document.addEventListener('scroll', closeDropDown)

    return () => {
      dropDownOpen && document.removeEventListener('scroll', closeDropDown)
    }
  }, [dropDownOpen])

  useEffect(function () {
    calculateDropDownStyle()
  }, [dropDownOpen])

  function closeDropDown() {
    setDropDownOpen(false)
  }

  function childrenOnClick() {
    setDropDownOpen((prev: any) => !prev)
  }

  function dropDownOnClick(e: any) {
    e.stopPropagation()
  }

  return {
    childrenRef, childrenOnClick, shouldBeRemoved, dropDownStyle, dropDownOnClick, showWithAnimation, dropDownRef
  }
}

export default useDropDown