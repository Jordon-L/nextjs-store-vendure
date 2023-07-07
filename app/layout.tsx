import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApolloWrapper } from "./ApolloWrapper";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Nextjs Vendure Store",
  description: "Created with the help of create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col h-full`}>
        <Header />
        <div className="flex-[1_0_auto]">
          <ApolloWrapper>{children}</ApolloWrapper>
        </div>
        <div className="shrink-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
