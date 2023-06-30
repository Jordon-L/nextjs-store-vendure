import { CollectionDetails } from "@/lib/types/Products.type";
import Image from "next/image";
import Link from "next/link";

export function CollectionCard(props: {
  key: number;
  collection: CollectionDetails;
}) {
  return (
    <section className="relative">
      <Link href={`collections/${props.collection.slug}`} prefetch={false}>
        <Image
          className="object-cover aspect-video w-full"
          src={`${props.collection.featuredAsset.preview}?w=350&h=350&mode=crop&format=webp`}
          width={350}
          height={197}
          alt={props.collection.name}
          unoptimized
        />

        <span className="absolute top-0 text-lg sm:text-xl w-full h-full bg-black/[.30]">
          <p className="text-white font-bold uppercase tracking-widest p-4">
            {props.collection.name}
          </p>
        </span>
      </Link>
    </section>
  );
}

export default CollectionCard;
