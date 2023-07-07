"use client";

export const dynamic = "force-dynamic";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { OrderLine } from "@/lib/types/Cart.type";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { AiOutlineLock } from "react-icons/ai";

const query = gql`
  query GetOrder {
    activeOrder {
      ...CartDetails
    }
  }
`;

export default function Cart() {
  const order = useQuery(query);

  if (order.loading)
    return (
      <div>
        <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-8">
          <section className="pt-8 py-4 w-full flex-col">
            {/* Cart */}
            <h2 className="text-2xl mb-4 font-semibold">Shopping Bag</h2>
            {/* Item 1 */}
            <div className="min-h-[250px] lg:min-h-[500px]">
              <p>Empty</p>
            </div>
          </section>
          <section className="pt-8 py-4 w-full flex-col">
            {/* Summary */}
            <div className="summary">
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={0}
                totalWithTax={0}
              ></CartSummary>
              <button className="buttonHover border rounded-lg w-full p-4 mt-4 bg-black text-white disabled opacity-80 flex">
                <p className="grow">Checkout</p>

              </button>
            </div>
          </section>
        </div>
      </div>
    );
  return (
    <div>
      <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-8">
        <section className="pt-8 py-4 w-full flex-col">
          {/* Cart */}
          <h2 className="text-2xl mb-4 font-semibold">Shopping Bag</h2>
          {/* Item 1 */}
          <div className="min-h-[250px] lg:min-h-[500px]">
            {!order.data?.activeOrder ? (
              <p>Empty</p>
            ) : (
              order.data.activeOrder?.lines.map((lines: OrderLine) => (
                <CartItem key={lines.id} lines={{ ...lines }} />
              ))
            )}
          </div>
        </section>
        <section className="pt-8 py-4 w-full flex-col">
          {/* Summary */}
          <div className="summary">
            {!order.data?.activeOrder ? (
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={0}
                totalWithTax={0}
              ></CartSummary>
            ) : (
              <CartSummary
                subTotal={order.data.activeOrder?.subTotal}
                taxes={order.data.activeOrder.taxSummary}
                shipping={order.data.activeOrder.shipping}
                totalWithTax={order.data.activeOrder.totalWithTax}
              ></CartSummary>
            )}
            {order.data.activeOrder &&
            order.data.activeOrder.lines.length > 0 ? (
              <a href="/checkout">
                <button className="buttonHover border rounded-lg w-full p-4 mt-4 bg-black text-white">
                  <p>Checkout</p>
                </button>
              </a>
            ) : (
              <button className="border rounded-lg w-full p-4 mt-4 bg-black text-white disabled opacity-70 flex cursor-not-allowed">
                <p className="grow text-lg">Checkout</p>
                <AiOutlineLock className="w-6 h-6"/>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
