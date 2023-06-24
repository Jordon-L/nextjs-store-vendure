"use client";

import Image from "next/image";
import FeaturedGrid from "@/components/FeaturedGrid";
import CollectionGrid from "@/components/CollectionGrid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="center flex-col p-6">
      <section className="relative">
        <Image
          className="object-cover max-h-[550px]"
          src="/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg"
          sizes="100vw"
          width={1920}
          height={1280}
          priority={true}
          alt="Office Supplies Banner"
        />
        <span className="text-5xl w-full h-full md:absolute md:top-0 md:bg-black/[0.3]">
          <div className="flex flex-col h-full justify-center p-4">
            <p className="font-bold text-center md:text-white tracking-widest p-4 z-10">
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
