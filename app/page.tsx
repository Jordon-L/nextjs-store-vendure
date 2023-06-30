/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import CollectionGrid from "@/components/CollectionGrid";
const FeaturedGrid = dynamic(() => import("@/components/FeaturedGrid"));

export default function Home() {
  return (
    <div className="center flex-col md:p-6">
      <section className="relative">
        <img
          className="object-cover max-h-[550px]"
          src="/jo-szczepanska-9OKGEVJiTKk-unsplash.webp"
          srcSet="/jo-szczepanska-9OKGEVJiTKk-unsplash-480w.webp 480w, /jo-szczepanska-9OKGEVJiTKk-unsplash-768w.webp 768w, /jo-szczepanska-9OKGEVJiTKk-unsplash.webp"
          sizes="(min-width: 480px) 480px,
          (min-width: 768px) 768px, 100vw"
          width={1500}
          height={550}
          alt="Office Supplies Banner"
        />
        <span className="text-4xl sm:text-5xl w-full h-full absolute top-0 bg-black/[0.3]">
          <div className="flex flex-col h-full justify-center p-4">
            <p className="font-bold text-center text-white tracking-widest p-4 z-10">
              Welcome to Office Llama
            </p>
            <div className="justify-center flex p-4 text-xl">
              <Link
                href="/collections/all"
                className="buttonHover bg-black text-white w-fit font-bold uppercase tracking-widest p-4 px-6 rounded-full"
                prefetch={false}
              >
                Shop All
              </Link>
            </div>
          </div>
        </span>
      </section>

      <section className="pt-8 py-4 w-full">
        <CollectionGrid />
      </section>

      <section className="py-4 w-full">
        <FeaturedGrid />
      </section>
    </div>
  );
}
