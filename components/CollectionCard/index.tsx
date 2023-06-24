import { CollectionDetails } from "@/lib/types/Products.type";
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
          className="aspect-video"
          src={`${props.collection.featuredAsset.preview}?w=350&h=197`}
          width={350}
          height={197}
          alt={props.collection.name}
        />

        <span className="absolute top-0 text-xl aspect-video h-full bg-black/[.30]">
          <p className="text-white font-bold uppercase tracking-widest p-4">
            {props.collection.name}
          </p>
        </span>
      </Link>
    </section>
  );
}

export default Collection;
