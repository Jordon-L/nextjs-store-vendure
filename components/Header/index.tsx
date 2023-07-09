"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import Cart from "@/components/Cart";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
} from "react-icons/ai";
import { numberOfItemsQuery } from "@/lib/graphql/header";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CartPortal from "../CartPortal";

function Header() {
  const numberDetails = useQuery(numberOfItemsQuery);
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="border-b border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
      <nav className="center">
        <div className="w-full h-full lg:hidden">
          <button>
            <AiOutlineMenu className=" w-8 h-8 object-contain" />
          </button>
        </div>

        <div className="flex logo w-12 h-12 justify-center lg:justify-normal">
          <a className="flex items-center" href="/">
            <Image
              className="w-8 h-8 object-contain"
              src="/github.svg"
              width={32}
              height={32}
              alt="Logo"
              priority={true}
              unoptimized
            />
          </a>
        </div>

        <nav className="hidden lg:flex text-gray-500 uppercase text-bold px-12">
          <a href="/" className="hover:text-gray-700 hover:no-underline mx-6">
            Home
          </a>
          <a
            href="/collections/all"
            className="hover:text-gray-700 hover:no-underline mx-6"
          >
            Shop
          </a>
          <a
            href="/contact"
            className="hover:text-gray-700 hover:no-underline mx-6"
          >
            Contact
          </a>
        </nav>

        <div className="flex w-full h-full justify-end">
          <a className="mr-12" href="/search">
            <AiOutlineSearch className=" w-8 h-8 object-contain" />
          </a>

          <button
            className="absolute"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <AiOutlineShopping className=" w-8 h-8 object-contain" />
            {(numberDetails.data?.activeOrder && numberDetails.data?.activeOrder?.totalQuantity > 0) ? (
              <div className="absolute top-[-10px] right-[-10px] w-6 h-6 font-bold text-white rounded-full bg-red-600 flex items-center justify-center">
                <p>{numberDetails.data?.activeOrder?.totalQuantity} </p>
              </div>
            ) : (
              <></>
            )}
          </button>
        </div>
      </nav>
      <CartPortal isOpen={showCart} handleClose={() => setShowCart(false)}>
        <Cart/>
      </CartPortal>
    </header>
  );
}

export default Header;
