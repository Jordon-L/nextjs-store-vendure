import { OrderLine } from "@/lib/types/Cart.type";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/FormatPrice";
import { AiOutlineDelete } from "react-icons/ai";
import { getOrderQuery, removeItemMutation } from "@/lib/graphql/bag";
import { useMutation } from "@apollo/client";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lines: OrderLine;
  canDelete: boolean;
}

function CartItem(props: Props) {
  const [removeItem] = useMutation(removeItemMutation);
  return (
    <div className={`flex flex-row ${props.className || ""}`}>
      <Image
        className="w-1/3 h-1/3 max-w-[200px] max-h-[200px] object-cover aspect-square"
        src={props.lines.featuredAsset.preview}
        width={200}
        height={200}
        priority={true}
        alt={props.lines.productVariant.name}
      />
      <div className="flex flex-col grow ml-6">
        {/* Item Info  */}
        <div className="flex flex-row grow justify-between">
          <div className="flex flex-col">
            <span className="pb-2">{props.lines.productVariant.name}</span>
            <span className="text-gray-400 pb-2">Color</span>
            <span className="text-gray-400 pb-2">Size</span>
            <span className="text-gray-400 pb-2">
              Quantity: {props.lines.quantity}
            </span>
          </div>
          <span>{formatPrice(props.lines.linePrice)}</span>
        </div>

        {/*Remove Item*/}
        {props.canDelete && (
          <div>
            <AiOutlineDelete
              className="w-8 h-8 cursor-pointer"
              onClick={() =>
                removeItem({
                  variables: { id: props.lines.id },
                  refetchQueries: [getOrderQuery],
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
