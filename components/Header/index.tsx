"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import Cart from "@/components/Cart";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineClose,
} from "react-icons/ai";
import { getOrderQuery } from "@/lib/graphql/bag";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CartSidebarPortal from "@/components/CartSidebarPortal";
import { useSidebar } from "@/lib/context/SidebarProvider";
import { useSearchBar } from "@/lib/context/SearchBarProvider";
import SearchBar from "@/components/SearchBar";

function Header() {
  const order = useQuery(getOrderQuery);
  const [quantity, setQuantityAdd] = useState(null);
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const {
    searchIsOpen,
    openSearchBar,
    closeSearchBar,
  } = useSearchBar();
  if (
    order.data?.activeOrder != null &&
    order.data?.activeOrder?.totalQuantity != quantity
  ) {
    if (quantity != null) {
      openSidebar();
    }
    setQuantityAdd(order.data?.activeOrder?.totalQuantity);
  }
  return (
    <>
      <header className="border-b border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
        <nav className="center">
          <div className="w-full h-full lg:hidden">
            <button>
              <AiOutlineMenu className="w-8 h-8 object-contain" />
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

          <div className="flex w-full h-full justify-end items-center">
            <button aria-label="Search" className="absolute flex mr-12" onClick={openSearchBar}>
              <AiOutlineSearch className="w-8 h-8 object-contain" />
            </button>

            <button aria-label="Shopping Cart"  className="absolute" onClick={openSidebar}>
              <AiOutlineShopping className="w-8 h-8 object-contain" />
              {quantity && quantity > 0 ? (
                <div className="absolute top-[-10px] right-[-10px] w-6 h-6 font-bold text-white rounded-full bg-red-600 flex items-center justify-center">
                  <p>{quantity} </p>
                </div>
              ) : (
                <></>
              )}
            </button>
          </div>
        </nav>
        <SearchBar isOpen={searchIsOpen} handleClose={closeSearchBar} />
        <CartSidebarPortal isOpen={isOpen} handleClose={closeSidebar}>
          <Cart />
        </CartSidebarPortal>
        
      </header>
    </>
  );
}

export default Header;
