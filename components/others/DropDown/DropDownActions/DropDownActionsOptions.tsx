import React from "react";
import {DropDownActionsProps} from "./DropDownActions";

function DropDownActionsOptions(
  {actions, minWidth, setDropDownOpen}: Pick<DropDownActionsProps, 'actions' | 'minWidth' | 'setDropDownOpen'>
) {
  return (
    <div className={`py-2 px-1 rounded-lg shadow-sm ${minWidth || 'min-w-56'}`}>
      {
        actions.map((action, index) => {

          function onClickHandler() {
            setDropDownOpen(false);
            action.onClick();
          }

          return (
            <div
              onClick={onClickHandler}
              key={index}
              className={`
              flex items-center space-x-reverse space-x-2 p-2 hover:bg-gray-100 duration-200 cursor-pointer
              rounded-md select-none
            `}
            >
              <div className='w-5 h-5 overflow-hidden'>
                {action.icon}
              </div>

              <p className={action.titleClass || `text-sm text-gray-900`}>
                {action.title}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default DropDownActionsOptions