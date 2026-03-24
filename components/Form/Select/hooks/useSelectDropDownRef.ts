import {useRef} from "react";
import {SelectDropDownRefType} from "../SelectDropDown";

function useSelectDropDownRef() {
  const selectDropDownRef = useRef<SelectDropDownRefType>(null);

  return selectDropDownRef
}

export default useSelectDropDownRef