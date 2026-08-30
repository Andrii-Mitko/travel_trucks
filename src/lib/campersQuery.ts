import { infiniteQueryOptions } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import type { CamperQueryParams } from "@/types/camper";

export const PER_PAGE = 4;

type CamperFilters = Omit<CamperQueryParams, "page" | "perPage">;

export function campersQueryOptions(filters: CamperFilters) {
  return infiniteQueryOptions({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getCampers({
        ...filters,
        page: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.totalPages ? undefined : lastPage.page + 1,
  });
}
