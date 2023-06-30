import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/FormatPrice";

function SummaryAccordion(props: {
  title: string;
  totalWithTax: number;
  children: React.ReactNode;
}) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div>
      <button className="flex w-full justify-between" onClick={toggle}>
        <div className="flex">
          <h2 className="text-2xl font-semibold">{props.title}</h2>
          <Image
            style={{ transform: isShowing ? "rotate(180deg)" : "rotate(0deg)" }}
            className="transition mx-4"
            src="/chevron-down-outline.svg"
            width={24}
            height={24}
            alt="chevron"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {formatPrice(props.totalWithTax)}
          </h2>
        </div>
      </button>
      <div style={{ display: isShowing ? "block" : "none" }}>
        <span className="flex w-full justify-between">{props.children}</span>
      </div>
    </div>
  );
}

export default SummaryAccordion;
