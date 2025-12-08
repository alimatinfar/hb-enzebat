import React from "react";
import {TableColumnSortType} from "../others/Table/TableExports";
import IconClickable from "../others/Icon/IconClickable";


type Props = {
  onClick: () => void;
  sort: TableColumnSortType;
}

function TableSort({onClick, sort}: Props) {

  function getArrowClass(iconType: TableColumnSortType) {
    return `stroke-current duration-200 ${sort === iconType ? 'text-gray-700' : 'text-gray-400'}`
  }

  return (
    <IconClickable
      className='flex flex-col justify-center items-center space-y-0.5 w-6 h-6'
      hoverClass='hover:bg-gray-200'
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="5"
        fill="none"
        viewBox="0 0 8 5"
      >
        <path
          className={getArrowClass('ascending')}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1.6 3.6 4 1.2l2.4 2.4"
        ></path>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="5"
        fill="none"
        viewBox="0 0 8 5"
      >
        <path
          className={getArrowClass('descending')}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6.4 1.4 5.2 2.6 4 3.8 1.6 1.4"
        ></path>
      </svg>
    </IconClickable>
  )
}

export default TableSort