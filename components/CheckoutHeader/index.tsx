import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";

function Header() {
  return (
    <header className="border-b border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
      <nav className="center">
        <div className="flex logo w-12 h-12 justify-center lg:justify-normal">
          <a className="flex items-center" href="/">
            <Image
              className="w-8 h-8 object-contain"
              src="/Office-Target.svg"
              width={32}
              height={32}
              alt="Logo"
              priority={true}
              unoptimized
            />
          </a>
        </div>

        <div className="flex w-full h-full justify-end items-center">
          <a className="absolute" href="/bag">
            <AiOutlineShopping className=" w-8 h-8 object-contain" />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
