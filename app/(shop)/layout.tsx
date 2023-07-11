import "../globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/lib/context/SidebarProvider";
import { SearchBarProvider } from "@/lib/context/SearchBarProvider";
const inter = Inter({ subsets: ["latin"] });

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <SearchBarProvider>
          <Header />
        </SearchBarProvider>
        <div>{children}</div>
      </SidebarProvider>
    </div>
  );
}
