 import React from "react";
import {Types} from "@/types/types";
 import CloseIcon from "@/components/svg/CloseIcon";
import {useEffect} from "react";
import useDisplayWithAnimation from "../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import ArrowBack from "../../svg/ArrowBack";
import zIndexes from "@/constances/zIndexes";
 import IconClickable from "../Icon/IconClickable";

export type ModalProps = {
  children?: Types["children"];
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  width?: string;
  height?: string;
  backAction?: () => void;
  keepOpenOnClickAway?: boolean;
  childrenWrapperClass?: string;
};

function Modal(
  {
    children, open, onClose, title, description, width, height, backAction, keepOpenOnClickAway, childrenWrapperClass
  }: ModalProps
) {
  const {showWithAnimation, shouldBeRemoved} = useDisplayWithAnimation({
    show: open,
  });

  useEffect(() => {
    if (showWithAnimation) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showWithAnimation, shouldBeRemoved]);

  return shouldBeRemoved ? null : (
    <>
      <div
        onClick={keepOpenOnClickAway ? undefined : onClose}
        className={`fixed w-screen h-screen top-0 right-0 duration-200 ${zIndexes.modalBackDrop}
        bg-[rgba(255, 255, 255, 0.60)] backdrop-blur-sm
        ${
          showWithAnimation
            ? "bg-opacity-30"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`hide-scroll fixed inset-0 m-auto bg-white duration-200 ${zIndexes.modal} p-6 flex flex-col
        shadow-xl
        ${showWithAnimation ? "" : "opacity-0 pointer-events-none scale-[0.98]"}
        ${width || "w-[430px]"} ${
          height || "h-min"
        } rounded-2xl border border-gray-300 max-h-[80dvh]`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="font-bold text-lg text-gray-900 flex items-center">
            {backAction && (
              <IconClickable onClick={backAction} className="cursor-pointer ml-2">
                <ArrowBack/>
              </IconClickable>
            )}
            <span>{title}</span>
          </div>

          <IconClickable
            onClick={onClose}
          >
            <div className='h-6 w-6'>
              <CloseIcon/>
            </div>
          </IconClickable>
        </div>

        <div className={`flex-1 overflow-y-auto scroll-thin overflow-hidden ${childrenWrapperClass || ''}`}>
          {description && (
            <p className='mb-6 text-justify'>
              {description}
            </p>
          )}

          {children || ''}
        </div>
      </div>
    </>
  );
}

export default Modal;
