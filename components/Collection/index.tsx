import { InMemoryCache, useFragment, gql } from "@apollo/client";
import { CollectionDetails } from "@/lib/types/Products.type";
import { formatPrice } from "@/lib/utils/FormatPrice";
import Image from "next/image";
import Link from "next/link";

export function Collection(props: {
  key: number;
  collection: CollectionDetails;
}) {
  return (
    <section className="relative">
      <Link href={`collections/${props.collection.slug}`}>
        <Image
          className="object-cover aspect-video"
          src={props.collection.featuredAsset.preview}
          width={350}
          height={350}
          alt={props.collection.name}
        />
      </Link>
      <a href={`collections/${props.collection.slug}`}>
        <span className="absolute top-0 text-xl h-full w-full bg-black/[.30]">
          <p className="text-white font-bold uppercase tracking-widest p-4">
            {props.collection.name}
          </p>
        </span>
      </a>
    </section>
  );
}

export default Collection;
