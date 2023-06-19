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
import ProductGrid from "@/components/ProductGrid";

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
        <ProductGrid />
      </div>
    </div>
  );
}
