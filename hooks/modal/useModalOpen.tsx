import {useState} from "react";
import useDisplayWithAnimation from "../../components/others/DisplayWithAnimation/hooks/useDisplayWithAnimation";


function useModalOpen<T>(defaultValue: T) {

  const [modalState, setModalState] = useState<T>(defaultValue);
  const {
    shouldBeRemoved,
    showWithAnimation
  } = useDisplayWithAnimation({show: Boolean(modalState)})

  function closeModal() {
    setModalState(defaultValue);
  }

  return {
    shouldBeRemoved, open:showWithAnimation, setModalState, closeModal, modalState
  }
}

export default useModalOpen