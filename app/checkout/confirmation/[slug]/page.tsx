"use client";

export const dynamic = "force-dynamic";
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
  query order {
    orderByCode {
      ...cartDetails
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

export default function Payment() {
  const params = useSearchParams();
  const router = useRouter();
  const order = useQuery(orderQuery);
  return (
    <div className="center flex-col p-6">
      <p className="text-2xl mb-4 font-semibold">Confirmation</p>
    </div>
  );
}
