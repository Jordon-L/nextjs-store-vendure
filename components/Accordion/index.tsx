import { useState } from "react"
import Image from "next/image";

function Accordion(props: {title:string, children: React.ReactNode}) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div>
      <button className="flex w-full justify-between" onClick={toggle}>
        <p className="uppercase">{props.title}</p>
        <Image style={{ transform: isShowing ? "rotate(180deg)" : "rotate(0deg)" }} className="transition" src="/chevron-down-outline.svg" width={24} height={24} alt="chevron" unoptimized/>
      </button>
      <div style={{display: isShowing ? "block": "none"}}>
        <span className="flex w-full justify-between">{props.children}</span>
      </div>
    </div>
  );
}

export default Accordion;