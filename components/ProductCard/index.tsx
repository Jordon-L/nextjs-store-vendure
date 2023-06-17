import { InMemoryCache, useFragment, gql } from "@apollo/client";
import { ProductDetails } from "@/lib/types/Products.type";
import { formatPrice } from "@/lib/utils/FormatPrice";
import Image from "next/image";
import Link from "next/link";

export function ProductCard(props: { key: number; item: ProductDetails }) {
  return (
    <section>
      <Link href={`products/${props.item.slug}`}>
        <Image
          className="object-cover aspect-square"
          src={props.item.productAsset.preview}
          width={350}
          height={350}
          alt={props.item.productName}
        />
      </Link>
      <p>{props.item.productName}</p>
      <p>{formatPrice(props.item.price.max)}</p>
    </section>
  );
}

export default ProductCard;
