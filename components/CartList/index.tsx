import { CartDetails, OrderLine } from "@/lib/types/Cart.type";
import CartItem from "@/components/CartItem";
import React from "react";

function CartList(props: { activeOrder: CartDetails, canDelete: boolean }) {
  return (
    <>
      {props.activeOrder.lines.map((lines: OrderLine, index: number) => (
        <React.Fragment key={lines.id}>
          {index < props.activeOrder.lines.length - 1 ? (
            <>
              <CartItem className="py-6" lines={{ ...lines }} canDelete={props.canDelete}/>
              <hr></hr>
            </>
          ) : (
            <>
              <CartItem className="pt-6" lines={{ ...lines }} canDelete={props.canDelete}/>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default CartList;
