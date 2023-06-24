import { ProductDetails } from "@/lib/types/Products.type";
import { formatPrice } from "@/lib/utils/FormatPrice";
import Image from "next/image";
import Link from "next/link";

export function ProductCard(props: { key: number; item: ProductDetails }) {
  return (
    <section>
      <Link href={`/products/${props.item.slug}`} prefetch={false}>
        <Image
          className="object-cover aspect-square"
          src={`${props.item.productAsset.preview}?w=350&h=350`}
          width={350}
          height={350}
          alt={props.item.productName}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk8AEAAFIATgDK/mEAAAAASUVORK5CYII="
        />
      </Link>
      <p>{props.item.productName}</p>
      <p>{formatPrice(props.item.price.max)}</p>
    </section>
  );
}

export function Skeleton() {
  //image is a 1x1 black opacity .3 square
  return (
    <section>
      <Image
        className="object-cover aspect-square"
        src={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk8AEAAFIATgDK/mEAAAAASUVORK5CYII="
        }
        width={350}
        height={350}
        alt={"Office Supplies"}
      />
      <div className="h-12"></div>
    </section>
  );
}

export default ProductCard;
