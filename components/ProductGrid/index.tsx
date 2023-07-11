"use client";

export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, useQuery } from "@apollo/client";
import { ProductCard } from "@/components/ProductCard";
import Accordion from "@/components/Accordion";
import {
  CollectionDetails,
  ProductDetails,
  SearchQuery,
  CollectionsResults,
} from "@/lib/types/Products.type";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getProductsQuery } from "@/lib/graphql/product";
import Breadcrumbs from "../Breadcrumbs";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const numOfItems = 12;

export default function ProductGrid(props: { slug: string }) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [optionsState, setOptionState] = useState("name-ASC");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [slug, setSlug] = useState("");
  const [sortParam, setSortParam] = useState<{
    name: string | null;
    price: string | null;
  }>({ name: "ASC", price: null });

  const products = useQuery<SearchQuery>(getProductsQuery, {
    variables: {
      term: searchTerm,
      collectionSlug: slug,
      numOfItems: numOfItems,
      skip: (currentPage - 1) * numOfItems,
      sort: sortParam,
      inStock: inStockFilter || null,
    },
  });

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    if (props.slug === "all") {
      setSlug("");
    } else {
      setSlug(props.slug);
    }
    setCurrentPage(1);
    if (optionsState.includes("name")) {
      let result = optionsState.split("-");
      setSortParam({ name: result[1], price: null });
    } else if (optionsState.includes("price")) {
      let result = optionsState.split("-");
      setSortParam({ name: null, price: result[1] });
    }
  }, [optionsState, inStockFilter, props.slug, searchParams]);

  const errors = products.error;
  const loading = products.loading;
  if (loading) return <div></div>;
  if (errors) return <div>Error</div>; //`Error! ${errors}`;
  const pageButtons: JSX.Element[] = [];
  const totalItems = products.data?.search.totalItems || 0;
  const totalPages = Math.ceil(totalItems / numOfItems);

  if (totalItems === 0)
    return <div>{`We couldn't find a match for \"${searchTerm}\"`}</div>;

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

  let collections = products.data?.search?.collections;
  let breadcrumbs = null;
  if (collections != null) {
    let currentCollection = collections.find((e: CollectionsResults) => {
      return e.collection.slug === props.slug;
    });
    breadcrumbs = currentCollection?.collection?.breadcrumbs;
  }
  return (
    <section className="w-full">
      <div>
        <div>
          {breadcrumbs ? (
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          ) : (
            <Breadcrumbs
              breadcrumbs={[{ id: "1", name: "__root_collection__", slug: "" }]}
            />
          )}
        </div>
        {breadcrumbs ? (
          <p className="flex justify-center text-2xl">
            {breadcrumbs[breadcrumbs.length - 1].name}
          </p>
        ) : (
          <p className="flex justify-center text-2xl">Shop All</p>
        )}
      </div>
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
            <button
              aria-label="Previous Page"
              className="w-12 aspect-square bg-black text-white flex justify-center items-center"
            >
              <AiOutlineLeft className="w-6 h-6" />
            </button>
            {pageButtons}
            <button
              aria-label="Next Page"
              className="w-12 aspect-square bg-black text-white flex justify-center items-center"
            >
              <AiOutlineRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
