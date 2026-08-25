import { useQuery } from "@tanstack/react-query";
import { getCampersFilters } from "@/lib/api";

export function useCampersFilters() {
  return useQuery({
    queryKey: ["campers-filters"],
    queryFn: getCampersFilters,
    staleTime: Infinity,
  });
}
