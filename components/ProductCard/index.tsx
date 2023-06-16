import { InMemoryCache, useFragment, gql } from "@apollo/client";
import { ProductDetails } from "@/lib/types/Products.type";
import Image from "next/image";

export function ProductCard(props: { key: number; item: ProductDetails }) {
  return (
    <section className="bg-gray-500 aspect-square">
      <Image
        className=""
        src={props.item.productAsset.preview}
        width={500}
        height={500}
        alt={props.item.productName}
      />
      {props.item.slug}
    </section>
  );
}

export default ProductCard;
