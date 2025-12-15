import ReactDOM from "react-dom";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";

const ModalPortalComponent = (
  { children }: Pick<ChildrenAndClassNamePropsType, 'children'>
) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal-portal-root")!
  );
};

export default ModalPortalComponent;