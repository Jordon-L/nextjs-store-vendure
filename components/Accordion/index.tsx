import { useState } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";

function Accordion(props: { title: string; children: React.ReactNode }) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div>
      <button className="flex w-full justify-between text-lg" onClick={toggle}>
        <p className="uppercase">{props.title}</p>
        <AiOutlineDown
          style={{ transform: isShowing ? "rotate(180deg)" : "rotate(0deg)" }}
          className="transition w-6 h-6 object-contain"
        />
      </button>
      <div style={{ display: isShowing ? "block" : "none" }}>
        <span className="flex w-full justify-between">{props.children}</span>
      </div>
    </div>
  );
}

export default Accordion;
