import {useRef, useState} from "react";
import useDisplayWithAnimation from "../../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import {TooltipProps} from "../Tooltip";
import getPlacementsBaseTargetPosition from "../utils/getPlacementsBaseTargetPosition";
import useTooltipClasses from "./useTooltipClasses";

export const initialTooltipMargin = 20
export const initialTooltipPlacement = 'top'

function useTooltip({margin = initialTooltipMargin, placement = initialTooltipPlacement}: Pick<TooltipProps, 'margin' | 'placement'>) {

  const elementRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })

  function onMouseEnter() {
    setOpen(true)
    const targetClickedPosition = elementRef?.current?.getBoundingClientRect();

    if (!targetClickedPosition) return

    const placements = getPlacementsBaseTargetPosition({targetClickedPosition, margin})
    setPosition(placements[placement]);
  }

  function onMouseLeave() {
    setOpen(false)
  }

  const {shouldBeRemoved, showWithAnimation} = useDisplayWithAnimation({show: open})

  const tooltipClasses = useTooltipClasses({placement})

  return {
    onMouseEnter, elementRef, onMouseLeave, shouldBeRemoved, position, showWithAnimation,
    tooltipClasses
  }
}

export default useTooltip