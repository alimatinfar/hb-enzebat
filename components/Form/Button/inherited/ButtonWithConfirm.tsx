import Button from "@/components/Form/Button/Button";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";
import React, {lazy, ReactNode, useCallback} from "react";
import useModalOpenBoolean from "@/hooks/modal/useModalOpenBoolean";
import {DeleteModalProps} from "@/components/others/Modal/InheritedModals/DeleteModal";
const DeleteModal = lazy(() => import(
  "@/components/others/Modal/InheritedModals/DeleteModal"
  ));

type Props = {
  buttonProps: Omit<ButtonProps, 'children'>;
  children: ReactNode;
  modalProps: Omit<DeleteModalProps, 'open' | 'onClose'>
}

function ButtonWithConfirm(
  {buttonProps, modalProps, children}: Props
) {

  const {
    shouldBeRemoved, open, openModalHandler, closeModal
  } = useModalOpenBoolean(false)

  const onClickHandler = useCallback(function () {
    openModalHandler()
    buttonProps?.onClick && buttonProps.onClick()
  }, [openModalHandler, buttonProps])

  return (
    <>
      <Button {...buttonProps} onClick={onClickHandler}>
        {children}
      </Button>

      {!shouldBeRemoved && (
        <DeleteModal
          open={open} onClose={closeModal}
          {...modalProps}
        />
      )}
    </>
  );
}

export default ButtonWithConfirm;