import { OrderLine, TaxSummary } from "@/lib/types/Cart.type";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/FormatPrice";

function CartSummary(props: {
  subTotal: number;
  shipping: number;
  taxes: TaxSummary[] | null;
  totalWithTax: number;
}) {
  return (
    <div className="flex flex-col">
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
        props.taxes.map((tax) => (
          <span
            key={tax.description}
            className="flex flex-row justify-between pb-2"
          >
            <p>
              {tax.description} ({tax.taxRate}%)
            </p>
            <p>{formatPrice(tax.taxTotal)}</p>
          </span>
        ))
      )}
      {/*Total*/}
      <span className="flex flex-row justify-between border-t border-b border-zinc-200 my-2 py-4">
        <p>Total</p>
        <p>{formatPrice(props.totalWithTax)}</p>
      </span>
    </div>
  );
}

export default CartSummary;
