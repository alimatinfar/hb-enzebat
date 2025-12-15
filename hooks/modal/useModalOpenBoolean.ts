import useModalOpen from "@/hooks/modal/useModalOpen";
import {useCallback} from "react";

function useModalOpenBoolean(defaultValue: boolean) {

  const props = useModalOpen<boolean>(defaultValue)

  const {setModalState, shouldBeRemoved, closeModal, open} = props

  const openModalHandler = useCallback(function () {
    setModalState(true)
  }, [setModalState])

  return {
    shouldBeRemoved, open, openModalHandler, closeModal
  }
}

export default useModalOpenBoolean;