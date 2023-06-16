
import menu from "@/components/images/menu-outline.svg";
import search from "@/components/images/search-outline.svg";
import bag from "@/components/images/bag-outline.svg";
import Logo from "@/components/images/github.svg";
import Image from "next/image";

function Header() {
  return (
    <header className="border-b border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
      <nav className="center">
        <div className="w-full h-full lg:hidden">
          <button>
            <Image className=" w-6 h-6 object-contain" src={menu} alt="menu" />
          </button>
        </div>

        <div className="flex logo w-12 h-12 justify-center lg:justify-normal">
          <a className="flex items-center" href="/">
            <Image className="w-8 h-8 object-contain" src={Logo} alt="Logo" />
          </a>
        </div>

        <nav className="hidden lg:flex text-gray-500 uppercase text-bold space-x-6 px-12">
          <a href="/" className="hover:text-gray-700 hover:no-underline">
            Home
          </a>
          <a href="/contact" className="hover:text-gray-700 hover:no-underline">
            Shop
          </a>
          <a href="/contact" className="hover:text-gray-700 hover:no-underline">
            Contact
          </a>
        </nav>

        <div className="flex w-full h-full justify-end">
          <a className="mr-12" href="/search">
            <Image
              className=" w-6 h-6 object-contain"
              src={search}
              alt="search"
            />
          </a>

          <a className="" href="/cart">
            <Image className="w-6 h-6 object-contain" src={bag} alt="cart" />

            <div className="search" />
            <div />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
