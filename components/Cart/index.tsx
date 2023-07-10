"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/client";
import { OrderLine } from "@/lib/types/Cart.type";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { AiOutlineLock } from "react-icons/ai";
import { getOrderQuery } from "@/lib/graphql/bag";
import CartList from "../CartList";

function Cart() {
  const order = useQuery(getOrderQuery);
  if (order.loading || order.data?.activeOrder?.lines.length <= 0)
    return (
      <div>
        <div className="center flex-col items-start">
          <section className="w-full flex-col">
            {/* Cart */}
            <h2 className="text-2xl mb-4 px-6 font-semibold">Shopping Bag</h2>
            <hr className="my-4"></hr>
            {/* Item 1 */}
            <div className="h-[300px] lg:h-[600px] px-6 overflow-y-auto">
              <p>Empty</p>
            </div>
            <hr className="my-4"></hr>
          </section>
          <section className="px-6 py-4 w-full flex-col">
            {/* Summary */}
            <div className="summary">
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={null}
                totalWithTax={0}
              ></CartSummary>
              <button className="border rounded-lg w-full p-4 mt-4 bg-black text-white disabled opacity-70 flex cursor-not-allowed">
                <p className="grow text-lg">Checkout</p>
                <AiOutlineLock className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  return (
    <div>
      <div className="center flex-col items-start">
        <section className="w-full flex-col">
          {/* Cart */}
          <h2 className="text-2xl mb-4 px-6 font-semibold">Shopping Bag</h2>
          <hr className="my-4"></hr>
          {/* Item 1 */}
          <div className="h-[300px] lg:h-[600px] px-6 overflow-y-auto">
            {!order.data?.activeOrder ? (
              <p>Empty</p>
            ) : (
              <CartList activeOrder={order.data?.activeOrder} />
            )}
          </div>
          <hr className="my-4"></hr>
        </section>

        <section className="px-6 py-4 w-full flex-col">
          {/* Summary */}
          <div className="summary">
            {!order.data?.activeOrder ? (
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={null}
                totalWithTax={0}
              ></CartSummary>
            ) : (
              <CartSummary
                subTotal={order.data.activeOrder?.subTotal}
                taxes={null}
                shipping={null}
                totalWithTax={order.data.activeOrder.totalWithTax}
              ></CartSummary>
            )}
            {order.data?.activeOrder &&
            order.data?.activeOrder.lines.length > 0 ? (
              <a href="/checkout">
                <button className="buttonHover border rounded-lg w-full p-4 mt-4 bg-black text-white">
                  <p>Checkout</p>
                </button>
              </a>
            ) : (
              <button className="border rounded-lg w-full p-4 mt-4 bg-black text-white disabled opacity-70 flex cursor-not-allowed">
                <p className="grow text-lg">Checkout</p>
                <AiOutlineLock className="w-6 h-6" />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cart;
