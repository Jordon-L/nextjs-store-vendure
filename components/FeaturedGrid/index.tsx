"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { ProductDetails } from "@/lib/types/Products.type";
import ProductCard from "@/components/ProductCard";

const query = gql`
  query GetProducts {
    search(input: { take: 10, groupByProduct: true, sort: { price: ASC } }) {
      items {
        ...ProductDetails
      }
    }
  }
`;
export default function Featured() {
  const products = useQuery(query);

  const errors = products.error;
  const loading = products.loading;

  if (loading) return <div></div>;
  if (errors) return <div></div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
      {products.data?.search?.items.map((item: ProductDetails) => (
        <ProductCard key={item.productId} item={{ ...item }} />
      ))}
    </div>
  );
}
