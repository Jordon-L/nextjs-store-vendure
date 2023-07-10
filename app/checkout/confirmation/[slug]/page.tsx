"use client";

export const dynamic = "force-dynamic";
import CartList from "@/components/CartList";
import CartSummary from "@/components/CartSummary";
import { StripePayments } from "@/components/Stripe";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const query = gql`
  query eligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
    }
  }
`;

const orderQuery = gql`
  query order($code: String!) {
    orderByCode(code: $code) {
      ...CartDetails
      state
    }
  }
`;
const mutation = gql`
  mutation addPaymentToOrder($method: String!, $metadata: JSON!) {
    addPaymentToOrder(input: { method: $method, metadata: $metadata }) {
      ... on PaymentFailedError {
        errorCode
        message
      }

      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;

const stripeMutation = gql`
  mutation createStripePaymentIntent {
    createStripePaymentIntent
  }
`;

export default function Confirmation({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  const order = useQuery(orderQuery, {variables: {code: params.slug}});
  return (
    <div className="center flex-col p-6">
      <p className="text-2xl mb-4 font-semibold">Confirmation</p>
      <section className="pt-8 py-4 w-full flex-col hidden lg:block">
        {/* Summary */}
        <div className="summary grow  ">
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
            <CartList activeOrder={order.data?.orderByCode} />
          )}
        </div>
      </section>
    </div>
  );
}
