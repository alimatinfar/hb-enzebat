import React from "react";
import Button from "../../Form/Button/Button";
import {ButtonColorsType} from "../../Form/Button/ButtonTypes";


type Props = {
  noText?: string;
  yesText?: string;
  noOnClick: () => void;
  yesOnClick: () => void;
  yesColorButton?: ButtonColorsType;
  yesButtonLoading?: boolean;
}

function YesNoButtonsModal(
  {noText, yesText, noOnClick, yesOnClick, yesColorButton = 'primary', yesButtonLoading}: Props
) {
  return (
    <div className='grid grid-cols-2 gap-x-6 space-x-reverse w-full'>
      <Button
        fullWidth
        variant='default' color='white'
        onClick={noOnClick}
      >
        {noText || 'خیر'}
      </Button>
      <Button
        fullWidth
        onClick={yesOnClick}
        color={yesColorButton}
        loading={Boolean(yesButtonLoading)}
      >
        {yesText || 'بله'}
      </Button>
    </div>
  )
}

export default YesNoButtonsModal