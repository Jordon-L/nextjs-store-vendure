import Image from "next/image";

function Header() {
  return (
    <header className="border-b border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
      <nav className="center">
        <div className="w-full h-full lg:hidden">
          <button>
            <Image
              className=" w-8 h-8 object-contain"
              src="/menu-outline.svg"
              width={32}
              height={32}
              alt="menu"
              priority={true}
            />
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
            />
          </a>
        </div>

        <nav className="hidden lg:flex text-gray-500 uppercase text-bold px-12">
          <a href="/" className="hover:text-gray-700 hover:no-underline mx-6">
            Home
          </a>
          <a href="/collections/all" className="hover:text-gray-700 hover:no-underline mx-6">
            Shop
          </a>
          <a href="/contact" className="hover:text-gray-700 hover:no-underline mx-6">
            Contact
          </a>
        </nav>

        <div className="flex w-full h-full justify-end">
          <a className="mr-12" href="/search">
            <Image
              className=" w-8 h-8 object-contain"
              src="/search-outline.svg"
              width={32}
              height={32}
              alt="search"
              priority={true}
            />
          </a>

          <a className="" href="/bag">
            <Image
              className="w-8 h-8 object-contain"
              src="/bag-outline.svg"
              width={32}
              height={32}
              alt="cart"
              priority={true}
            />

            <div className="search" />
            <div />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
