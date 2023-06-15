import "./globals.css";
import Header from "@/components/Header";
import { ApolloWrapper } from "./ApolloWrapper";
import { Suspense } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
