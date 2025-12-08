import {useCallback} from "react";
import {ButtonProps} from "../ButtonTypes";
import {OptionalExceptFor} from "../../../../types/OptionalExceptFor";
import Button from "../Button";


export type ButtonGroupObjectType = {
  id: string | number;
} & OptionalExceptFor<ButtonProps,
  'children' | 'leftIcon' | 'leftIcon' | 'rightIcon' | 'disabled' | 'disabled' | 'loading' | 'onClick'
>

export type ButtonGroupProps = {
  buttons: ButtonGroupObjectType[],
  activeButtonIndexes: ButtonGroupObjectType['id'][],
}

function ButtonGroup({buttons, activeButtonIndexes}: ButtonGroupProps) {

  const checkIsActiveButton = useCallback((buttonId:ButtonGroupObjectType['id']) => {
    return activeButtonIndexes?.includes(buttonId)
  }, [activeButtonIndexes]);

  return (
    <div className='flex items-center'>
      {buttons.map((button, index) => {

        const hiddenBorderRight = index !== 0
        const hiddenBorderLeft = index !== (buttons.length - 1)
        const isActive = checkIsActiveButton(button.id)

        const prevButtonId = index > 0 ? buttons[index - 1].id : undefined
        const prevButtonIsActive = prevButtonId && checkIsActiveButton(prevButtonId)

        return (
          <div
            key={button.id}
            className={`
              ${hiddenBorderRight ? `border-r ${(prevButtonIsActive || isActive) ? 'border-primary-300' : 'border-gray-300'}` : ''}
            `}>
            <Button
              variant='default'
              className={{
                color: isActive ? 'border-primary-300 text-primary bg-primary-100' : 'border-gray-300 text-gray-900 bg-transparent hover:bg-gray-100'
              }}
              size='sm'
              hiddenBorderLeft={hiddenBorderLeft} hiddenBorderRight={hiddenBorderRight}

              {...button}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ButtonGroup