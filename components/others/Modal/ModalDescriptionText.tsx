import React from "react";

function ModalDescriptionText({text}: {text: string}) {
  return (
    <p className='text-gray-500 mb-4 leading-[26px]'>
      {text}
    </p>
  )
}

export default ModalDescriptionText