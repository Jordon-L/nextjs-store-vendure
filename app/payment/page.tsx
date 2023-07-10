"use client";

export const dynamic = "force-dynamic";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import PaymentForm from "@/components/PaymentForm";
import SummaryAccordion from "@/components/SummaryAccordion";
import { OrderLine } from "@/lib/types/Cart.type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const orderQuery = gql`
  query order {
    activeOrder {
      ...CartDetails
      code
      shippingAddress {
        fullName
        streetLine1
        city
        province
        postalCode
        country
      }
    }
  }
`;

export default function Payment() {
  const params = useSearchParams();
  const router = useRouter();
  const order = useQuery(orderQuery);

  if (
    order?.data?.activeOrder != undefined &&
    !Object.values(order?.data?.activeOrder.shippingAddress).some(
      (e: any) => e == undefined
    )
  ) {
    return (
      <div>
        <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-8">
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
                      <CartItem
                        key={lines.id}
                        lines={{ ...lines }}
                        canDelete={false}
                      />
                    ))
                  )}
                </div>
              </section>
            </SummaryAccordion>
          </div>

          <section className="pt-8 py-4 w-full flex-col items-stretch">
            <PaymentForm
              orderCode={order.data.activeOrder.code}
              price={order.data.activeOrder.totalWithTax}
            />
          </section>
          {/* Desktop Summary*/}
          <section className="pt-8 py-4 w-full flex-col hidden lg:block">
            {/* Summary */}
            <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
            <div className="summary grow">
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
                  <CartItem key={lines.id} lines={{ ...lines }} canDelete={false}/>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
