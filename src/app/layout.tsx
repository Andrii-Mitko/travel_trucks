import QueryProvider from "@/components/QueryProvider/QueryProvider";
import Header from "@/components/Header/Header";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TravelTrucks — Camper Rental",
    template: "%s | TravelTrucks",
  },
  description:
    "Rent your dream camper van with TravelTrucks. Browse our catalog, filter by location, engine and transmission, and book online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
