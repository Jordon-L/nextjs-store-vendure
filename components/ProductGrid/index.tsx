"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import Accordion from "@/components/Accordion";
import Collection from "@/components/Collection";
import Image from "next/image";
import { CollectionDetails, ProductDetails } from "@/lib/types/Products.type";

const query = gql`
  query GetProducts($collectionSlug: String!) {
    search(
      input: {
        take:12,
        skip:0,
        groupByProduct: true
        collectionSlug: $collectionSlug
        sort: { price: ASC }
      }
    ) {
      items {
        ...ProductDetails
      }
    }
  }
`;

export default function ProductGrid(props: { slug: string }) {
  let slug = props.slug;
  if (props.slug === "all") {
    slug = "";
  }
  const products = useQuery(query, { variables: { collectionSlug: slug } });
  const errors = products.error;
  const loading = products.loading;

  if (loading) return <section>Loading</section>;
  if (errors) return <section>Error</section>; //`Error! ${errors}`;

  return (
    <section className="w-full">
      <span className="flex justify-end mb-6">
        <select className="p-2" name="sort">
          <option value="best-seller">Best Seller</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="date-new-old">Date: Old to New</option>
          <option value="date-old-new">Date: Old to New</option>
        </select>
      </span>
      <div className="flex flex-row items-start">
        <div className="bg-white w-1/5 shrink-0 mr-6 flex flex-col">
          <Accordion title="Availability">asds</Accordion>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.data?.search?.items.map((item: ProductDetails) => (
            <ProductCard key={item.productId} item={{ ...item }} />
          ))}
        </div>
      </div>
    </section>
  );
}
