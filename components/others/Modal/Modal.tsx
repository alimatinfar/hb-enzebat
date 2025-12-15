import React, {ReactNode} from "react";
import CloseIcon from "../../svg/CloseIcon";
import {useEffect} from "react";
import useDisplayWithAnimation from "../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import ArrowBack from "../../svg/ArrowBack";
import Z_INDEXES from "@/constances/zIndexes";
import ModalPortalComponent from "@/components/others/PortalComponent/ModalPortalComponent";


export type ModalProps = {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  width?: string;
  height?: string;
  backAction?: () => void;
  keepOpenOnClickAway?: boolean;
  wrapperClass?: string;
  childrenWrapperClass?: string;
};

function Modal(
  {
    children, open, onClose, title, description, width, height, backAction, keepOpenOnClickAway, childrenWrapperClass,
    wrapperClass
  }: ModalProps
) {

  const {showWithAnimation, shouldBeRemoved} = useDisplayWithAnimation({
    show: open,
  });

  useEffect(() => {
    if (showWithAnimation) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [showWithAnimation, shouldBeRemoved]);

  return shouldBeRemoved ? null : (
    <ModalPortalComponent>
      <div
        onClick={keepOpenOnClickAway ? undefined : onClose}
        className={`fixed w-screen h-screen top-0 right-0 duration-200 ${Z_INDEXES.modalBackDrop}
        
        ${
          showWithAnimation
            ? "backdrop-background"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`hide-scroll fixed bottom-0 right-0 left-0 md:inset-0 m-auto bg-white  duration-200 ${Z_INDEXES.modal} 
        shadow-[0px_-2px_4px_-2px_rgba(16,24,40,0.06),0px_-4px_8px_-2px_rgba(16,24,40,0.1)]
         overflow-hidden p-4 md:p-6 flex flex-col ${wrapperClass || ''}
        ${showWithAnimation ? "" : "opacity-0 pointer-events-none scale-[0.98]"}
        ${width || "w-dvw md:w-[430px]"} ${
          height || "h-min"
        } rounded-t-2xl md:rounded-2xl border border-transparent max-h-[80dvh]`}
      >
        {title && (
          <div className="flex items-center justify-between mb-6">

            <div className={`font-bold text-lg text-black flex`}>
              {backAction && (
                <span onClick={backAction} className="cursor-pointer ml-2">
                  <ArrowBack/>
                </span>
              )}
              <span>{title}</span>
            </div>

            <button
              type='button'
              onClick={onClose}
              className={`p-1 rounded-md duration-200 hover:bg-gray-100`}
            >
              <div className='h-6 w-6'>
                <CloseIcon/>
              </div>
            </button>
          </div>
        )}

        <div className={`overflow-y-auto scroll-thin overflow-x-hidden ${childrenWrapperClass || ''}`}>
          {description && (
            <p className={`mb-6 text-justify text-black text-lg`}>
              {description}
            </p>
          )}

          {children || ''}
        </div>
      </div>
    </ModalPortalComponent>
  );
}

export default Modal;
