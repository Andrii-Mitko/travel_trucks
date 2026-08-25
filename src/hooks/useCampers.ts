import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import type { CamperQueryParams } from "@/types/camper";

const PER_PAGE = 4;

export function useCampers(
  filters: Omit<CamperQueryParams, "page" | "perPage">,
) {
  return useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.page >= lastPage.totalPages;
      return isLastPage ? undefined : lastPage.page + 1;
    },
  });
}
