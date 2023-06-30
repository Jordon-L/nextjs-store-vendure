"use client";

export const dynamic = "force-dynamic";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { OrderLine } from "@/lib/types/Cart.type";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import SummaryAccordion from "@/components/SummaryAccordion";
import ShippingForm from "@/components/ShippingForm";
import DeliveryMethod from "@/components/DeliveryMethod";

const query = gql`
  query GetOrder {
    activeOrder {
      ...CartDetails
    }
  }
`;

export default function Checkout() {
  const order = useQuery(query);

  if (order.loading)
    return (
      <div>
        <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-4 ">
          {/* Mobile Summary*/}
          <div className="w-full lg:hidden">
            <SummaryAccordion title={`Summary`} totalWithTax={0}>
              <section className="pt-8 w-full flex flex-col">
                {/* Summary */}
                <div className="summary grow">
                  <CartSummary
                    subTotal={0}
                    taxes={null}
                    shipping={0}
                    totalWithTax={0}
                  ></CartSummary>
                </div>
              </section>
            </SummaryAccordion>
          </div>
          <section className="pt-8 py-4 w-full flex-col items-stretch">
            <h2 className="text-2xl mb-4 font-semibold">
              Shipping Information
            </h2>
            <ShippingForm />
            <h2 className="text-2xl my-4 font-semibold">Delivery Method</h2>
            <DeliveryMethod />
            <button className="border rounded-lg w-full p-4 mt-4 bg-black text-white">
              Proceed to Payment
            </button>
          </section>
          {/* Desktop Summary*/}
          <section className="pt-8 py-4 w-full flex-col hidden lg:block">
            {/* Summary */}
            <div className="summary grow  ">
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
      <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-4 ">
        {/* Mobile Summary*/}
        <div className="w-full lg:hidden">
          <SummaryAccordion
            title={`Summary`}
            totalWithTax={order.data.activeOrder.totalWithTax}
          >
            <section className="pt-8 w-full flex flex-col">
              {/* Summary */}
              <div className="summary grow">
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
              </div>
              {/* Cart */}
              <div>
                {/* Item 1 */}
                {!order.data?.activeOrder ? (
                  <div className="h-[500px]">Empty</div>
                ) : (
                  order.data.activeOrder?.lines.map((lines: OrderLine) => (
                    <CartItem key={lines.id} lines={{ ...lines }} />
                  ))
                )}
              </div>
            </section>
          </SummaryAccordion>
        </div>

        <section className="pt-8 py-4 w-full flex-col items-stretch">
          <h2 className="text-2xl mb-4 font-semibold">Shipping Information</h2>
          <ShippingForm />
          <h2 className="text-2xl my-4 font-semibold">Delivery Method</h2>
          <DeliveryMethod />
          <button className="border rounded-lg w-full p-4 mt-4 bg-black text-white">
            Proceed to Payment
          </button>
        </section>
        {/* Desktop Summary*/}
        <section className="pt-8 py-4 w-full flex-col hidden lg:block">
          {/* Summary */}
          <div className="summary grow  ">
            <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
            {!order.data.activeOrder ? (
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
          </div>
          {/* Cart */}
          <div>
            {/* Item 1 */}
            {!order.data.activeOrder ? (
              <div className="h-[500px]">Empty</div>
            ) : (
              order.data.activeOrder?.lines.map((lines: OrderLine) => (
                <CartItem key={lines.id} lines={{ ...lines }} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
