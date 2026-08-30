import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCampersFilters } from "@/lib/api";
import { campersQueryOptions } from "@/lib/campersQuery";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  const filters = {};

  await Promise.all([
    queryClient.prefetchInfiniteQuery(campersQueryOptions(filters)),
    queryClient.prefetchQuery({
      queryKey: ["campers-filters"],
      queryFn: getCampersFilters,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
