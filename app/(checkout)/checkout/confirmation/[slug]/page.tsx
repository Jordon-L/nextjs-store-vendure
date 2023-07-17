"use client";

export const dynamic = "force-dynamic";
import CartList from "@/components/CartList";
import CartSummary from "@/components/CartSummary";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const orderQuery = gql`
  query order($code: String!) {
    orderByCode(code: $code) {
      ...CartDetails
      state
    }
  }
`;

export default function Confirmation({ params }: { params: { slug: string } }) {
  const order = useQuery(orderQuery, { variables: { code: params.slug } });
  const [retried, setRetried] = useState(false);
  useEffect(() => {
    if (order.error) {
      setTimeout(() => {
        setRetried(true);
        order.refetch({ variables: { code: params.slug } });
      }, 1000);
    }
  }, [order, params.slug]);


  if (order.error && retried) {
    return (
      <div className="center flex-col p-6">
        <p className="text-2xl mb-4 font-semibold">
          Error, something went wrong.
        </p>
        <p className="text-lg text-gray-700">
          Unfortunately your payment could not be processed or this confirmation
          link has expired.
        </p>
      </div>
    );
  }
  if (order.data) {
    return (
      <div className="center flex-col p-6">
        <p className="text-2xl mb-4 font-semibold">Order Summary</p>
        <p>Your order {order.data?.orderByCode.code} has been received</p>
        <section className="pt-8 py-4 w-full flex-col">
          {/* Summary */}
          <div className="summary grow">
            {!order.data?.orderByCode ? (
              <CartSummary
                subTotal={0}
                taxes={null}
                shipping={0}
                totalWithTax={0}
              ></CartSummary>
            ) : (
              <CartSummary
                subTotal={order.data.orderByCode?.subTotal}
                taxes={order.data.orderByCode.taxSummary}
                shipping={order.data.orderByCode.shipping}
                totalWithTax={order.data.orderByCode.totalWithTax}
              ></CartSummary>
            )}
          </div>
          {/* Cart */}
          <div>
            {/* Item 1 */}
            {!order.data?.orderByCode ? (
              <div className="h-[500px]">Empty</div>
            ) : (
              <CartList
                activeOrder={order.data?.orderByCode}
                canDelete={false}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="center flex-col p-6">
      <p className="text-2xl mb-4 font-semibold">
        Please wait while we process your order...
      </p>
    </div>
  );
}
