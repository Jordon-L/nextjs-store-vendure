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
              <button className="buttonHover border rounded-lg w-full p-4 mt-4 bg-black text-white flex">
                <p>Checkout</p>
                <Image
                  className="w-8 h-8 object-contain"
                  src="/lock-closed-outline.svg"
                  width={32}
                  height={32}
                  alt="lock"
                  priority={true}
                  unoptimized
                />
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
              <button className="buttonHover border rounded-lg w-full p-4 mt-4 bg-black text-white disabled opacity-80 flex">
                <p className="grow">Checkout</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon stroke-white w-6"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M336 208v-95a80 80 0 00-160 0v95"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                  <rect
                    x="96"
                    y="208"
                    width="320"
                    height="272"
                    rx="48"
                    ry="48"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                </svg>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
