import {TooltipProps} from "../Tooltip";
import {initialTooltipMargin} from "../hooks/useTooltip";


type Props = {
  targetClickedPosition: any,
  margin: TooltipProps['margin']
}

function getPlacementsBaseTargetPosition({targetClickedPosition, margin = initialTooltipMargin}: Props) {
  return {
    top: {
      left: targetClickedPosition.left + targetClickedPosition.width/2,
      top: targetClickedPosition.top - margin,
    },
    topRight: {
      left: targetClickedPosition.right,
      top: targetClickedPosition.top - margin,
    },
    topLeft: {
      left: targetClickedPosition.left,
      top: targetClickedPosition.top - margin,
    },
    left: {
      left: targetClickedPosition.right - targetClickedPosition.width - margin,
      top: targetClickedPosition.top + targetClickedPosition.height/2,
    },
    right: {
      left: targetClickedPosition.right + margin,
      top: targetClickedPosition.top + targetClickedPosition.height/2,
    },
    bottom: {
      left: targetClickedPosition.left + targetClickedPosition.width/2,
      top: targetClickedPosition.bottom + margin,
    },
    bottomRight: {
      left: targetClickedPosition.right,
      top: targetClickedPosition.bottom + margin,
    },
    bottomLeft: {
      left: targetClickedPosition.left,
      top: targetClickedPosition.bottom + margin,
    },
  }
}

export default getPlacementsBaseTargetPosition