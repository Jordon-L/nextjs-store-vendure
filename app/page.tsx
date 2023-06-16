"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import {type ProductDetails} from "@/lib/types/Products.type";
import { isTemplateSpan } from "typescript";

const query = gql`
  query GetProducts {
    search(input: { take: 8, groupByProduct: true, sort: { price: ASC } }) {
      items {
        ...ProductDetails
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(query);
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div className="center px-6 md:px-12 p-4">
      <span className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {data.search.items.map((item:ProductDetails) => (
          <ProductCard key={item.productId} item={{...item}} />
        ))}
        
      </span>
    </div>
  );
}
