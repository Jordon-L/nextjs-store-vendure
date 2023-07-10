"use client";

export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { ProductCard } from "@/components/ProductCard";
import Accordion from "@/components/Accordion";
import { ProductDetails, SearchQuery } from "@/lib/types/Products.type";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";

const numOfItems = 12;

const query = gql`
  query GetProducts(
    $collectionSlug: String!
    $numOfItems: Int!
    $skip: Int!
    $sort: SearchResultSortParameter
    $inStock: Boolean
  ) {
    search(
      input: {
        take: $numOfItems
        skip: $skip
        groupByProduct: true
        collectionSlug: $collectionSlug
        sort: $sort
        inStock: $inStock
      }
    ) {
      items {
        ...ProductDetails
      }
      totalItems
    }
  }
`;

export default function ProductGrid(props: { slug: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [optionsState, setOptionState] = useState("name-ASC");
  const [sortParam, setSortParam] = useState<{
    name: string | null;
    price: string | null;
  }>({ name: "ASC", price: null });
  let slug = props.slug;
  if (props.slug === "all") {
    slug = "";
  }
  useEffect(() => {
    setCurrentPage(1);
    if (optionsState.includes("name")) {
      let result = optionsState.split("-");
      setSortParam({ name: result[1], price: null });
      
    } else if (optionsState.includes("price")) {
      let result = optionsState.split("-");
      setSortParam({ name: null, price: result[1] });
    }
  }, [optionsState, inStockFilter]);

  const products = useSuspenseQuery<SearchQuery>(query, {
    variables: {
      collectionSlug: slug,
      numOfItems: numOfItems,
      skip: (currentPage - 1) * numOfItems,
      sort: sortParam,
      inStock: inStockFilter || null,
    },
  });

  const errors = products.error;

  if (errors) return <div>Error</div>; //`Error! ${errors}`;
  const pageButtons: JSX.Element[] = [];

  const totalPages = Math.ceil(products.data.search.totalItems / numOfItems);
  for (let i = 1; i <= totalPages; i++) {
    if (i == currentPage) {
      pageButtons.push(
        <button
          key={i}
          className="w-12 aspect-square bg-black text-white"
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    } else {
      pageButtons.push(
        <button
          key={i}
          className="w-12 aspect-square border border-solid"
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
  }
  return (
    <section className="w-full">
      <span className="flex justify-end mb-6">
        <select
          className="p-2"
          name="sort"
          value={optionsState}
          onChange={(event) => setOptionState(event.target.value)}
        >
          <option value="name-ASC">Alphabetically: A to Z</option>
          <option value="name-DESC">Alphabetically: Z to A</option>
          <option value="price-ASC">Price: Low to High</option>
          <option value="price-DESC">Price: High to Low</option>
        </select>
      </span>
      <div className="flex flex-row items-start">
        <div className="bg-white w-1/5 shrink-0 mr-6 flex flex-col">
          <Accordion title="Availability">
            <div className="pt-4 text-lg">
              <label className="space-x-2">
                <input
                  type="checkbox"
                  name="inStock"
                  onClick={() => {
                    setInStockFilter(!inStockFilter);
                  }}
                />
                <span> In Stock </span>
              </label>
            </div>
          </Accordion>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.data?.search?.items.map((item: ProductDetails) => (
              <ProductCard key={item.productId} item={{ ...item }} />
            ))}
          </div>

          <div className="p-4 flex justify-center space-x-4 text-lg">
            <button className="w-12 aspect-square bg-black text-white flex justify-center items-center">
              <AiOutlineLeft className="w-6 h-6" />
            </button>
            {pageButtons}
            <button className="w-12 aspect-square bg-black text-white flex justify-center items-center">
              <AiOutlineRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
