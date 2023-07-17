import { useEffect, useRef, useState } from "react";
import ReactPortal from "../ReactPortal";
import { CSSTransition } from "react-transition-group";
import "./modalStyles.css";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
type SearchBarProps = {
  isOpen: boolean;
  handleClose: any;
};

function SearchBar({ isOpen, handleClose }: SearchBarProps) {
  const nodeRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose, searchTerm, router]);

  if (isOpen == false) return null;
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm != "") {
      router.push(`/collections/all?search=${searchTerm}`);
      handleClose();
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (searchTerm != "") {
      router.push(`/collections/all?search=${searchTerm}`);
      handleClose();
    }
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm((event.target as HTMLInputElement).value);
  };
  return (
    <ReactPortal wrapperId="searchBar">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 0, exit: 300 }}
        unmountOnExit
        classNames="modalSearch"
        nodeRef={nodeRef}
        appear={true}
      >
        <div className="modalSearch" ref={nodeRef} onClick={handleClose}>
          <div
            className="bg-white absolute w-full px-6 pb-2 pt-4 lg:pt-8 lg:pb-6 content-center flex justify-center items-center"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div className="w-full border border-solid flex max-w-[900px] justify-center items-center mx-4">
              <input
                autoFocus
                type="text"
                className="w-full m-2 outline-none"
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={handleEnterKey}
              ></input>
              <button className="mr-6" onClick={handleClick}>
                <AiOutlineSearch className="w-8 h-8 object-contain" />
              </button>
            </div>
            <button onClick={handleClose}>
              <AiOutlineClose className="w-6 h-6 object-contain" />
            </button>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default SearchBar;
