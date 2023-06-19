"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import Accordion from "@/components/Accordion";
import Collection from "@/components/Collection";
import Image from "next/image";
import { CollectionDetails, ProductDetails } from "@/lib/types/Products.type";
import Link from "next/link";

const query = gql`
  query GetProducts {
    search(input: { take: 10, groupByProduct: true, sort: { price: ASC } }) {
      items {
        ...ProductDetails
      }
    }
  }
`;

const collectionQuery = gql`
  query GetCollections {
    collections(options: { take: 4, sort: { updatedAt: ASC } }) {
      items {
        id
        name
        slug
        parent {
          id
          slug
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

export default function Home() {
  const products = useQuery(query);
  const collections = useQuery(collectionQuery);

  const errors = products.error || collections.error;
  const loading = products.error || collections.error;

  if (loading) return null;
  if (errors) return `Error! ${errors}`;
  return (
    <div>
      <div className="center flex-col p-6">
        <section className="relative">
          <Image
            className="object-cover max-h-[550px]"
            src="/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg"
            width={1600}
            height={550}
            alt="Office Supplies Banner"
          />
          <span className="text-5xl w-full h-full md:absolute md:top-0 md:bg-black/[0.3]">
            <div className="flex flex-col h-full justify-center p-4">
              <p className="font-bold text-center md:text-white tracking-widest p-4 z-10">
                Welcome to Office Llama
              </p>
              <div className="justify-center flex p-4 text-xl">
                <Link href="/shop" className="bg-amber-800 text-white w-fit font-bold uppercase tracking-widest p-4 rounded-full">Shop All</Link>
              </div>
            </div>
          </span>
        </section>

        <section className="pt-8 py-4">
          <h2 className="text-2xl mb-4 font-semibold">Shop by Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.data?.collections?.items.map(
              (collection: CollectionDetails) => (
                <Collection
                  key={collection.id}
                  collection={{ ...collection }}
                />
              )
            )}
          </div>
        </section>

        <section className="py-4">
          <h2 className="text-2xl mb-4 font-semibold">Featured</h2>
          <div className="flex flex-row items-start">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              {products.data?.search?.items.map((item: ProductDetails) => (
                <ProductCard key={item.productId} item={{ ...item }} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
