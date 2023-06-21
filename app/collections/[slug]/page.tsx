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


export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="center flex-col p-6">
        <ProductGrid slug={params.slug} />
      </div>
    </div>
  );
}
