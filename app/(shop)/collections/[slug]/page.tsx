"use client";

export const dynamic = "force-dynamic";
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
