"use client";

export const dynamic = "force-dynamic";
import { gql, useQuery } from "@apollo/client";
import CartSummary from "@/components/CartSummary";
import SummaryAccordion from "@/components/SummaryAccordion";
import ShippingForm from "@/components/ShippingForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartList from "@/components/CartList";
import { getOrderQuery } from "@/lib/graphql/bag";


export default function Checkout() {
  const router = useRouter();

  const order = useQuery(getOrderQuery);
  useEffect(() => {
    if (!order.loading && order?.data?.activeOrder == undefined) {
      router.push("/");
    }
  }, [order, router]);

  if (order.loading)
    return (
      <div>
        <div className="center flex-col p-6 items-start lg:flex-row lg:space-x-8">
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
            <ShippingForm/>
          </section>
          {/* Desktop Summary*/}
          <section className="pt-8 py-4 w-full flex-col hidden lg:block">
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
        </div>
      </div>
    );
  if (order?.data?.activeOrder != undefined) {
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
                    <CartList activeOrder={order.data?.activeOrder} canDelete={false}/>
                  )}
                </div>
              </section>
            </SummaryAccordion>
          </div>

          <section className="pt-8 py-4 w-full flex-col items-stretch">
            <ShippingForm/>
          </section>
          {/* Desktop Summary*/}
          <section className="pt-8 py-4 w-full flex-col hidden lg:block">
            {/* Summary */}
            <div className="summary grow  ">
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
                <CartList activeOrder={order.data?.activeOrder} canDelete={false}/>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
