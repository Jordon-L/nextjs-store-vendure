"use client";

export const dynamic = "force-dynamic";
import CartList from "@/components/CartList";
import CartSummary from "@/components/CartSummary";
import { gql, useQuery } from "@apollo/client";


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
  return (
    <div className="center flex-col p-6">
      <p className="text-2xl mb-4 font-semibold">Confirmation</p>
      <p>State: {order.data?.orderByCode.state}</p>
      <section className="pt-8 py-4 w-full flex-col hidden lg:block">
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
            <CartList activeOrder={order.data?.orderByCode} canDelete={false} />
          )}
        </div>
      </section>
    </div>
  );
}
