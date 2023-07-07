import { gql, useMutation, useQuery, useSuspenseQuery } from "@apollo/client";
import { useEffect } from "react";
import { StripePayments } from "@/components/Stripe";
import { formatPrice } from "@/lib/utils/FormatPrice";
import { METHODS } from "http";

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
    activeOrder {
      code
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

function PaymentForm(props: { orderCode: string; price: number }) {
  const payment = useSuspenseQuery<any>(query);
  const [addPayment] = useMutation(mutation);
  const [stripePaymentIntentResult, { data, loading, error }] =
    useMutation(stripeMutation);
  let stripePaymentIntent: string | undefined;
  let stripePublishableKey: string | undefined;
  let stripeError: string | undefined;
  useEffect(() => {
    if (stripePaymentIntent == undefined && !loading) {
      stripePaymentIntentResult();
    }
  });

  if (data != undefined && !loading && error == undefined) {
    stripePaymentIntent = data.createStripePaymentIntent;
    addPayment({variables: {method: 'stripe', metadata:{stripeIntent: data.createStripePaymentIntent} }})
  }
  return (
    <div className="center flex-col">
      <p className="text-2xl mb-4 font-semibold">Payment</p>
      <p>This is a demo, do not use a real credit card</p>
      <p>
        Use a test card found{" "}
        <a
          href="https://stripe.com/docs/testing?testing-method=card-numbers#visa"
          target="_blank"
          className="underline text-blue-500"
        >
          here
        </a>
      </p>
      <div className="grid grid-rows-2 gap-4">
        {payment.data.eligiblePaymentMethods.find(
          (e: any) => e.code === "stripe"
        ) ? (
          <button
            onClick={() => {
              if (stripePaymentIntent === undefined)
                stripePaymentIntentResult();
            }}
          >
            Stripe
          </button>
        ) : null}
      </div>
      <div>
        {stripePaymentIntent ? (
          <StripePayments
            clientSecret={stripePaymentIntent}
            publishableKey={
              "pk_test_51NN9OOGCGC1l8oqev7Op9JLixJ2RSaPjSxZbcHbAVO8ixzKq5vVDDMbVdkr0YcOAWpk94w4m4baS5hDVh6cEGM1e000Bm2I5bg"
            }
            orderCode={props.orderCode}
            price={formatPrice(props.price)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PaymentForm;
