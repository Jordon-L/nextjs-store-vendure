"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { ProductDetails } from "@/lib/types/Products.type";
import { ProductCard, Skeleton } from "@/components/ProductCard";

const numOfItems = 10;

const query = gql`
  query GetProducts($numOfItems: Int!) {
    search(
      input: { take: $numOfItems, groupByProduct: true, sort: { price: ASC } }
    ) {
      items {
        ...ProductDetails
      }
    }
  }
`;
export default function Featured() {
  const products = useQuery(query, {
    variables: { numOfItems: numOfItems },
  });

  const errors = products.error;
  const loading = products.loading;

  if (loading)
    return (
      <>
        <h2 className="text-2xl mb-4 font-semibold">Featured</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {[...new Array(numOfItems)].map((index: number) => (
            <Skeleton key={index} />
          ))}
        </div>
      </>
    );
  if (errors) return <div></div>;

  return (
    <>
      <h2 className="text-2xl mb-4 font-semibold">Featured</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {products.data?.search?.items.map((item: ProductDetails) => (
          <ProductCard key={item.productId} item={{ ...item }} />
        ))}
      </div>
    </>
  );
}
