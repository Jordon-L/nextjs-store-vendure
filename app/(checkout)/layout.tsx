import "../globals.css";
import Header from "@/components/CheckoutHeader";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nextjs Vendure Store",
  description: "Created with the help of create next app",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <Header />
        <div>{children}</div>
    </div>
  );
}
