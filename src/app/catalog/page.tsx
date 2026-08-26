"use client";

import { useState } from "react";
import { useCampers } from "@/hooks/useCampers";
import CamperCard from "@/components/CamperCard/CamperCard";
import CamperFilters, {
  AppliedFilters,
} from "@/components/CamperFilters/CamperFilters";
import styles from "./page.module.css";

export default function CatalogPage() {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    location: "",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useCampers({
    location: appliedFilters.location || undefined,
    form: appliedFilters.form,
    transmission: appliedFilters.transmission,
    engine: appliedFilters.engine,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div className={styles.container}>
      <aside>
        <CamperFilters onApply={setAppliedFilters} />
      </aside>

      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong. Please try again.</p>}

        <ul className={styles.list}>
          {campers.map((camper, index) => (
            <CamperCard
              key={camper.id}
              camper={camper}
              priority={index === 0}
            />
          ))}
        </ul>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMoreBtn}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
