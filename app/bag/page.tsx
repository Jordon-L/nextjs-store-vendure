"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Image from "next/image";



export default function Bag() {
  return (
    <div>
      <div className="center flex-col p-6 ">
        <section className="pt-8 py-4 w-full flex flex-col lg:flex-row lg:space-x-6">
          {/* Bag */}
          <div className="bag w-3/4">
            <h2 className="text-2xl mb-4 font-semibold">Shopping Bag</h2>
            {/* Item 1 */}
            <div className="flex flex-row py-6 border-b border-zinc-200">
              <Image
                className="object-cover aspect-square"
                src="/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg"
                width={200}
                height={200}
                priority={true}
                alt="Office Supplies Banner"
              />
              <div className="flex flex-col grow mx-6">
                {/* Item Info  */}
                <div className="flex flex-row grow justify-between">
                  <div className="flex flex-col">
                    <span className="pb-2">Item Name</span>
                    <span className="text-gray-400 pb-2">Color</span>
                    <span className="text-gray-400 pb-2">Size</span>
                    <span className="text-gray-400 pb-2">Quantity</span>
                  </div>
                  <span>$10.00</span>
                </div>

                {/*Remove Item*/}
                <div>
                  <Image
                    className=""
                    src="/trash-outline.svg"
                    width={32}
                    height={32}
                    alt="remove item"
                  />
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex flex-row py-6 border-b border-zinc-200">
              <Image
                className="object-cover aspect-square"
                src="/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg"
                width={200}
                height={200}
                priority={true}
                alt="Office Supplies Banner"
              />
              <div className="flex flex-col grow mx-6">
                {/* Item Info  */}
                <div className="flex flex-row grow justify-between">
                  <div className="flex flex-col">
                    <span className="pb-2">Item Name</span>
                    <span className="text-gray-400 pb-2">Color</span>
                    <span className="text-gray-400 pb-2">Size</span>
                    <span className="text-gray-400 pb-2">Quantity</span>
                  </div>
                  <span>$10.00</span>
                </div>

                {/*Remove Item*/}
                <div>
                  <Image
                    className=""
                    src="/trash-outline.svg"
                    width={32}
                    height={32}
                    alt="remove item"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Summary */}
          <div className="summary grow py-4">
            <h2 className="text-2xl mb-4 font-semibold">Summary</h2>
            <div className="flex flex-col">
              <span className="flex flex-row justify-between pb-2">
                <p>Subtotal</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between pb-2">
                <p>Shipping</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between pb-2">
                <p>Taxes</p>
                <p>$10.00</p>
              </span>
              <span className="flex flex-row justify-between border-t border-b border-zinc-200 my-2 py-4">
                <p>Total</p>
                <p>$10.00</p>
              </span>
              <button className="buttonHover rounded-full bg-black text-white p-4 font-bold uppercase tracking-widest">
                Checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
