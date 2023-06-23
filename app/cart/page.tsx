"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Image from "next/image";

const collectionQuery = gql`
  query GetCollections {
    collections(options: { sort: { updatedAt: ASC } }) {
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

export default function Collections() {
  const collections = useQuery(collectionQuery);

  const errors = collections.error;
  const loading = collections.loading;

  if (loading) return <div className="h-screen"></div>;
  if (errors) return `Error! ${errors}`;
  return (
    <div>
      <div className="center flex-col p-6">
        <section className="pt-8 py-4 w-full flex flex-col lg:flex-row lg:space-x-6">
          <div className="cart w-3/4">
            <h2 className="text-2xl mb-4 font-semibold">Shopping Cart</h2>
            <div>
              <div className="flex flex-row">
                <Image
                  className="object-cover aspect-square"
                  src="/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg"
                  width={200}
                  height={200}
                  priority={true}
                  alt="Office Supplies Banner"
                />
                <div className="flex grow justify-between">
                  <div className="flex flex-col mx-6">
                    <span>Item Name</span>
                    <span className="text-gray-400">Color</span>
                    <span className="text-gray-400">Size</span>
                    <span className="text-gray-400">Quantity</span>
                  </div>
                  <span>$10.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="summary">
            <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
            <div className="flex flex-col">
              <span className="flex flex-row justify-between">
                <p>Subtotal</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between">
                <p>Shipping</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between">
                <p>Taxes</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between">
                <p>Total</p>
                <p>$10.00</p>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
