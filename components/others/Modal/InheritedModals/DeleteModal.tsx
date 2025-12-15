import React from "react";
import Button from "../../../Form/Button/Button";
import Modal, {ModalProps} from "../Modal";


export type DeleteModalProps = {
  onConfirmHandler: () => void;
  loading: boolean;
} & ModalProps

function DeleteModal({onConfirmHandler, loading, ...props}: DeleteModalProps) {
  return (
    <Modal {...props}>
      {props.children && props.children}

      <div className='flex items-center gap-x-4 mt-4'>
        <Button color='white' onClick={onConfirmHandler} loading={loading} variant='default'>
          بله
        </Button>
        <Button color='red' variant='default' onClick={props.onClose}>
          خیر
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteModal