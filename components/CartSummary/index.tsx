import { OrderLine, TaxSummary } from "@/lib/types/Cart.type";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/FormatPrice";

function CartSummary(props: {
  subTotal: number;
  shipping: number;
  taxes: TaxSummary[] | null;
  totalWithTax: number;
}) {
  const taxes = props.taxes?.reduce((sum, tax) => sum + tax.taxTotal, 0) || 0;
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
      {/*Subtotal*/}
      <span className="flex flex-row justify-between pb-2">
        <p>Subtotal</p>
        <p>{formatPrice(props.subTotal)}</p>
      </span>
      {/*Shipping*/}
      <span className="flex flex-row justify-between pb-2">
        <p>Shipping</p>
        <p>{formatPrice(props.shipping)}</p>
      </span>
      {/*Taxes*/}
      {!props.taxes ? (
        <span className="flex flex-row justify-between pb-2">
          <p>Tax</p>
          <p>{formatPrice(0)}</p>
        </span>
      ) : (
        <span className="flex flex-row justify-between pb-2">
          <p>Tax ({props.taxes.reduce((sum, tax) => sum + tax.taxRate, 0)}%)</p>
          <p>{formatPrice(taxes)}</p>
        </span>
      )}
      {/*Total*/}
      <span className="flex flex-row justify-between border-t border-b border-zinc-200 my-2 py-4">
        <p>Total</p>
        <p>{formatPrice(props.subTotal + props.shipping + taxes)}</p>
      </span>
    </div>
  );
}

export default CartSummary;
