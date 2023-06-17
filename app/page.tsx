"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import { type ProductDetails } from "@/lib/types/Products.type";

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
    <div className="center flex-col p-6">
      <span className="flex w-full justify-end mb-6">
        <select className="p-2" name="sort">
          <option value="best-seller">Best Seller</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="date-new-old">Date: Old to New</option>
          <option value="date-old-new">Date: Old to New</option>
        </select>
      </span>
      <div className="flex flex-row">
        <section className="bg-white w-1/5 mr-6 max-h-fit flex flex-col">
          <button><span className="uppercase flex text-left">Product Type</span></button>
          <button><span className="uppercase flex text-left">Price Range</span></button>
          <button><span className="uppercase flex text-left">Availability</span></button>
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.search.items.map((item: ProductDetails) => (
            <ProductCard key={item.productId} item={{ ...item }} />
          ))}
        </section>
      </div>
    </div>
  );
}
