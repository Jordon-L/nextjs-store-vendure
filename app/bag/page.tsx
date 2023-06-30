"use client";

export const dynamic = "force-dynamic";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { OrderLine } from "@/lib/types/Cart.type";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";

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
        <div className="center flex-col p-6 ">
          <section className="pt-8 py-4 w-full flex flex-col lg:flex-row lg:space-x-6">
            {/* Cart */}
            <div className="bag w-3/4">
              <h2 className="text-2xl mb-4 font-semibold">Shopping Bag</h2>
              {/* Item 1 */}
              <div className="h-[500px]">Empty</div>
            </div>
            {/* Summary */}
            <div className="summary grow py-4">
              <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={0}
                totalWithTax={0}
              ></CartSummary>
            </div>
          </section>
        </div>
      </div>
    );
  return (
    <div>
      <div className="center flex-col p-6 ">
        <section className="pt-8 py-4 w-full flex flex-col lg:flex-row lg:space-x-6">
          {/* Cart */}
          <div className="w-3/4">
            <h2 className="text-2xl mb-4 font-semibold">Shopping Bag</h2>
            {/* Item 1 */}
            {!order.data?.activeOrder ? (
              <div className="h-[500px]">Empty</div>
            ) : (
              order.data.activeOrder?.lines.map((lines: OrderLine) => (
                <CartItem key={lines.id} lines={{ ...lines }} />
              ))
            )}
          </div>
          {/* Summary */}
          <div className="summary grow py-4">
            <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
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
            <a href="/checkout">
              <button className="buttonHover rounded-full bg-black text-white p-4 font-bold uppercase tracking-widest">
                Checkout
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
