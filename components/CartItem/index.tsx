import { OrderLine } from "@/lib/types/Cart.type";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/FormatPrice";

function CartItem(props: {lines: OrderLine}) {

  return (
    <div className="flex flex-row py-6 border-b border-zinc-200">
      <Image
        className="object-cover aspect-square"
        src={props.lines.featuredAsset.preview}
        width={200}
        height={200}
        priority={true}
        alt={props.lines.productVariant.name}
      />
      <div className="flex flex-col grow mx-6">
        {/* Item Info  */}
        <div className="flex flex-row grow justify-between">
          <div className="flex flex-col">
            <span className="pb-2">{props.lines.productVariant.name}</span>
            <span className="text-gray-400 pb-2">Color</span>
            <span className="text-gray-400 pb-2">Size</span>
            <span className="text-gray-400 pb-2">Quantity: {props.lines.quantity}</span>
          </div>
          <span>{formatPrice(props.lines.linePrice)}</span>
        </div>

        {/*Remove Item*/}
        <div>
          <Image
            className=""
            src="/trash-outline.svg"
            width={32}
            height={32}
            alt="remove item"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
