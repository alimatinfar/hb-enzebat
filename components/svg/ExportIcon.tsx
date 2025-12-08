import React from "react";
import {IconPropsType} from "@/types/IconPropsType";

function ExportIcon({className, textColor}: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-gray-700'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.18 13.153H4.845c-1.48 0-2.678-1.021-2.678-2.519 0-1.497 1.199-2.711 2.678-2.711q.15 0 .298.017v-.017h.037a5 5 0 0 1-.037-.603c0-2.662 2.132-4.82 4.762-4.82 1.78 0 3.333.99 4.15 2.455q.3-.045.611-.045c2.302 0 4.167 1.889 4.167 4.218 0 2.125-1.552 3.69-3.571 3.983h-2.158m-2.902-4.887V17.5m0 0-2.111-2.083m2.111 2.083 2.056-2.083"
      ></path>
    </svg>
  )
}

export default ExportIcon