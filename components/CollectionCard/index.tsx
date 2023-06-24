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

export function Skeleton() {
  //image is a 1x1 black opacity .3 square
  return (
    <Image
      className="aspect-video"
      src={
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk8AEAAFIATgDK/mEAAAAASUVORK5CYII="
      }
      width={350}
      height={197}
      alt={"Office Supplies"}
    />
  );
}

export default CollectionCard;
