import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse our camper van catalog. Filter campers by location, vehicle form, engine and transmission.",
};

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
