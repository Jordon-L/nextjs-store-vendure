import { useEffect, useRef } from "react";
import ReactPortal from "../ReactPortal";
import { CSSTransition } from "react-transition-group";
import "./modalStyles.css";
import { AiOutlineClose } from "react-icons/ai";

type MobileMenuProps = {
  isOpen: boolean;
  handleClose: any;
};

function MobileMenu({ isOpen, handleClose }: MobileMenuProps) {
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  useEffect(() => {
    if (isOpen === true) {
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
  if (isOpen == false) return null;

  return (
    <ReactPortal wrapperId="MobileMenu">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 0, exit: 300 }}
        unmountOnExit
        classNames="modal-menu"
        nodeRef={nodeRef}
        appear={true}
      >
        <div className="modal-menu" ref={nodeRef} onClick={handleClose}>
          <CSSTransition
            in={isOpen}
            timeout={{ enter: 0, exit: 300 }}
            unmountOnExit
            classNames="modal-menu-content"
            nodeRef={nodeRef2}
            appear={true}
          >
            <div
              ref={nodeRef2}
              className="modal-menu-content"
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <div className="justify-center flex flex-col">
                <div className="justify-end flex p-4">
                  <button onClick={handleClose}>
                    <AiOutlineClose className="w-6 h-6 object-contain" />
                  </button>
                </div>

                <nav className="flex flex-col text-gray-500 uppercase text-bold space-y-4">
                  <a
                    href="/"
                    className="hover:text-gray-700 hover:no-underline mx-6"
                  >
                    Home
                  </a>
                  <a
                    href="/collections/all"
                    className="hover:text-gray-700 hover:no-underline mx-6"
                  >
                    Shop
                  </a>
                  <a
                    href="/contact"
                    className="hover:text-gray-700 hover:no-underline mx-6"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default MobileMenu;
