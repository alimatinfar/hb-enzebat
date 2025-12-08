import React from "react";
import Modal, { ModalProps } from "./Modal";
import Button from "../../Form/Button/Button";

type Props = {
  modalErrorMessage: string;
  closeButtonCustomText?: string;
} & Omit<ModalProps, "children">;

function ModalWithCloseButton({
  modalErrorMessage,
  closeButtonCustomText,
  ...props
}: Props) {
  return (
    <Modal {...props}>
      <p className="leading-8">{modalErrorMessage}</p>
      <Button
        color="white"
        className={{ extra: "mt-5" }}
        onClick={props.onClose}
      >
        {closeButtonCustomText || "بستن"}
      </Button>
    </Modal>
  );
}

export default ModalWithCloseButton;
