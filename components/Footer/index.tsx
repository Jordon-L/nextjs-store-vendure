import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t border-zinc-700 px-6 pb-2 pt-4 lg:pt-8 lg:pb-6">
      <section className="flex flex-col lg:flex-row center">
        <div className="flex grow items-center justify-end w-12 h-12 space-x-3">
          <a href="/">
            <Image
              className="w-6 h-6 object-contain"
              src="/logo-twitter.svg"
              width={32}
              height={32}
              alt="Twitter"
            />
          </a>
          <a href="/search">
            <Image
              className="w-6 h-6 object-contain"
              src="/logo-instagram.svg"
              width={32}
              height={32}
              alt="Instagram"
            />
          </a>
        </div>
        <small className="flex lg:order-first">© 2023, Website created by Jordon</small>
      </section>
    </footer>
  );
}

export default Footer;
