import React from "react";
import {Types} from "../../../types/types";
import useTooltip from "./hooks/useTooltip";
import {ButtonProps} from "../../Form/Button/ButtonTypes";


export type TooltipPlacementType =
  'top'
  | 'topRight'
  | 'topLeft'
  | 'right'
  | 'left'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft'

export type TooltipProps = {
  children: Types['children'];
  title: string;
  className?: string;
  placement?: TooltipPlacementType;
  margin?: number;
  onClick?: ButtonProps['onClick'];
}

function Tooltip({children, title, className, placement, margin, onClick}: TooltipProps) {

  const {
    onMouseEnter, elementRef, onMouseLeave, shouldBeRemoved, position, showWithAnimation,
    tooltipClasses
  } = useTooltip({placement, margin})

  return (
    <div
      dir='rtl'
      {...onClick && {onClick}}
    >
      <div
        className={`cursor-pointer ${className || ''}`}
        onMouseEnter={onMouseEnter} ref={elementRef} onMouseLeave={onMouseLeave}
      >
        {children}
      </div>

      {!shouldBeRemoved && (
        <div
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          className={`flex select-none ${tooltipClasses.wrapperClass} fixed overflow-hidden ${tooltipClasses.wrapperTransformClass}
           w-auto duration-200 ${showWithAnimation ? '' : `opacity-0 pointer-events-none`}`}
        >
          <div
            className='whitespace-nowrap p-2 rounded-md bg-black/80 text-white text-sm'
          >
            {title}
          </div>
          <div className={`flex ${tooltipClasses.arrowClass}`}>
            <span
              style={{
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '7px solid rgba(0, 0, 0, 0.8)',
              }}
              className='w-0 h-0'></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip