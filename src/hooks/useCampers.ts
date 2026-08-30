import { useInfiniteQuery } from "@tanstack/react-query";
import { campersQueryOptions } from "@/lib/campersQuery";
import type { CamperQueryParams } from "@/types/camper";

export function useCampers(
  filters: Omit<CamperQueryParams, "page" | "perPage">,
) {
  return useInfiniteQuery({
    ...campersQueryOptions(filters),
    placeholderData: (previousData) => previousData,
  });
}
