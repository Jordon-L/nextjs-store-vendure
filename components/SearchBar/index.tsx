import { ReactNode, useEffect, useState } from "react";
import ReactPortal from "../ReactPortal";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
type SearchBarProps = {
  isOpen: boolean;
  handleClose: any;
};

function SearchBar({ isOpen, handleClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === "Escape" ? handleClose() : null;
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [isOpen, handleClose, searchTerm, router]);

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
      <div className="bg-white absolute w-full px-6 pb-2 pt-4 lg:pt-8 lg:pb-6 content-center flex justify-center items-center">
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
    </ReactPortal>
  );
}
export default SearchBar;
