import { ReactNode, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";
import "./modalStyles.css";
import { AiOutlineClose } from "react-icons/ai";

type CartModalProps = {
  children: ReactNode;
  isOpen: boolean;
  handleClose: any;
};

function CartSidebarPortal({ children, isOpen, handleClose }: CartModalProps) {
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  useEffect(() => {
    if(isOpen === true) {
      document.body.style.overflow = "hidden";
    }
    const closeOnEscapeKey = (e: any) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
        appear={true}
      >
        <div className="modal" ref={nodeRef} onClick={handleClose}>
          <CSSTransition
            in={isOpen}
            timeout={{ enter: 0, exit: 300 }}
            unmountOnExit
            classNames="modal-content"
            nodeRef={nodeRef2}
            appear={true}
          >
            <div
              ref={nodeRef2}
              className="modal-content"
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <span className="flex justify-end w-full p-4">
                <AiOutlineClose className="w-6 h-6 cursor-pointer" onClick={handleClose}/>
              </span>
              {children}
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default CartSidebarPortal;
