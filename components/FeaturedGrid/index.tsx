"use client";

export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { ProductDetails } from "@/lib/types/Products.type";
import { ProductCard } from "@/components/ProductCard";

const numOfItems = 10;

interface ProductQuery {
  search: Items;
}

interface Items {
  items: ProductDetails[];
}

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
  try {
    const products = useSuspenseQuery<ProductQuery>(query, {
      variables: { numOfItems: numOfItems },
    });

    const errors = products.error;

    if (errors) return <div></div>;

    return (
      <>
        <h2 className="text-2xl mb-4 font-semibold">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.data?.search?.items.map((item: ProductDetails) => (
            <ProductCard key={item.productId} item={{ ...item }} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    return (
      <>
        <h2 className="text-2xl mb-4 font-semibold">Featured</h2>
      </>
    );
  }
}
