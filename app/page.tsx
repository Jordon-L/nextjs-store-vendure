"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import Header from "../components/Header";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

const query = gql`query {
  search(
    input: { take: 8, groupByProduct: true, sort: { price: ASC } }
  ) {
    items {
      productId,
      productName
      inStock,
      price{
        __typename
        ... on SinglePrice {
          value
        }
        ... on PriceRange {
          min,
          max,
        }

      }
    }
  }
}`

export default function Home() {
  const { data } = useSuspenseQuery(query);

  return (
    <div className="center px-6 md:px-12 p-4">
      <span className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-gray-500 aspect-square">{data.search.items.productName}</div>
      </span>
    </div>
  );
}
