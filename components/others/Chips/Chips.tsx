import React from "react";
import joinObjectValues from "../../../utils/joinObjectValues";
import useChipsStyles, {ChipsColorsType, ChipsSizesType} from "./hooks/useChipsStyles";
import CrossIcon from "../../svg/CrossIcon";

export type ChipsProps = {
  text: string;
  onClose?: (e: any) => void;
  color?: ChipsColorsType;
  size?: ChipsSizesType;
  className?: string;
};

export default function Chips({text, onClose, color, className, size}: ChipsProps) {

  const { badgeStyles } = useChipsStyles({ color, size, onClose });

  function onClickHandler(e:any) {
    e.stopPropagation()
    onClose && onClose(e)
  }

  return (
    <div
      className={`flex gap-1 justify-center items-center w-auto space-x-reverse space-x-1.5 ${joinObjectValues(badgeStyles)} 
      ${className}`}
    >
      <span className='select-none'>
        {text}
      </span>
      {onClose && (
        <div
          className='p-1 cursor-pointer hover:bg-red-100 duration-200' onClick={onClickHandler}
        >
          <CrossIcon />
        </div>
      )}
    </div>
  );
}
