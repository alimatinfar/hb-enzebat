import React, {useEffect, useRef, useState} from "react";
import {Types} from "@/types/types";
import useDisplayWithAnimation from "./hooks/useDisplayWithAnimation";
import {RefObject} from "react";


export type DisplayWithAnimationProps = {
  show: boolean;
  children: Types['children'];
  animationClass?: string;
  className?: string;
  wrapperRef?: RefObject<HTMLDivElement>;
  originClass?: string;
  durationClass?: string;
  classWhenShow?: string;
  expandMode?: boolean;
}

function DisplayWithAnimation(
  {
    show, children, animationClass, className, wrapperRef, originClass, durationClass, classWhenShow, expandMode
  }: DisplayWithAnimationProps
) {
  const {showWithAnimation, shouldBeRemoved} = useDisplayWithAnimation({show})
  const expandRef = useRef<HTMLDivElement>(null);
  const [expandWrapperHeight, setExpandWrapperHeight] = useState(0);
  const [finalShouldBeRemoved, setFinalShouldBeRemoved] = useState(show ? false : !Boolean(expandMode));

  useEffect(() => {
    if (!expandMode || show) return
    setTimeout(function () {
      setFinalShouldBeRemoved(shouldBeRemoved)
    }, 500)
  }, []);

  useEffect(() => {
    setFinalShouldBeRemoved(shouldBeRemoved)
  }, [shouldBeRemoved]);

  useEffect(() => {
    const contentHeight = expandRef.current?.clientHeight
    if (!contentHeight) return
    setExpandWrapperHeight(contentHeight)
  }, [expandRef.current?.clientHeight, show]);

  return !finalShouldBeRemoved ? expandMode ? (
    <div
      {...wrapperRef && {ref: wrapperRef}}
      className='overflow-hidden'>
      <div
        ref={expandRef}
        style={{marginTop: showWithAnimation ? 0 : -(expandWrapperHeight ? expandWrapperHeight : 10000)}}
        className={`duration-300 ${className || ''}`}>
        {children}
      </div>
    </div>
    ) : (
    <div
      {...wrapperRef && {ref: wrapperRef}}
      className={`${showWithAnimation ? (classWhenShow || '') : `pointer-events-none ${animationClass || 'scale-95 opacity-0'}`}
       ${durationClass || 'duration-100'} ${originClass} ${className || ''}`}>
      {children}
    </div>
  ) : null
}

export default DisplayWithAnimation