import {useMemo} from "react";
import {TooltipPlacementType} from "../Tooltip";


type TooltipArrowClassesType = Record<TooltipPlacementType, {
  wrapperClass: string;
  wrapperTransformClass: string;
  arrowClass: string;
}>

function useTooltipClasses({placement}: { placement: TooltipPlacementType }) {
  return useMemo(function () {

    const topWrapperClass = 'flex-col'
    const bottomWrapperClass = 'flex-col-reverse'
    const topArrowClass = 'items-center px-4 -translate-y-[0.2px]'
    const bottomArrowClass = 'rotate-180 items-center px-4'
    const topWrapperTransformClass = '-translate-y-full'

    const placements: TooltipArrowClassesType = {
      top: {
        wrapperClass: topWrapperClass,
        wrapperTransformClass: `-translate-x-1/2 ${topWrapperTransformClass}`,
        arrowClass: `justify-center ${topArrowClass}`,
      },
      topRight: {
        wrapperClass: topWrapperClass,
        wrapperTransformClass: `-translate-x-full ${topWrapperTransformClass}`,
        arrowClass: `justify-start ${topArrowClass}`,
      },
      topLeft: {
        wrapperClass: topWrapperClass,
        wrapperTransformClass: `${topWrapperTransformClass}`,
        arrowClass: `justify-end ${topArrowClass}`,
      },
      left: {
        wrapperClass: 'flex-row-reverse items-center',
        wrapperTransformClass: '-translate-x-full -translate-y-1/2',
        arrowClass: '-rotate-90 -translate-x-[3.5px]',
      },
      right: {
        wrapperClass: 'items-center',
        wrapperTransformClass: '-translate-y-1/2',
        arrowClass: 'rotate-90 translate-x-[3.5px]',
      },
      bottom: {
        wrapperClass: bottomWrapperClass,
        wrapperTransformClass: '-translate-x-1/2',
        arrowClass: `justify-center ${bottomArrowClass}`,
      },
      bottomRight: {
        wrapperClass: bottomWrapperClass,
        wrapperTransformClass: '-translate-x-full',
        arrowClass: `justify-end ${bottomArrowClass}`,
      },
      bottomLeft: {
        wrapperClass: bottomWrapperClass,
        wrapperTransformClass: '',
        arrowClass: `justify-start ${bottomArrowClass}`,
      },
    }

    return placements[placement]
  }, [placement])
}

export default useTooltipClasses