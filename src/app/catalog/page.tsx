"use client";

import { useState } from "react";
import { useCampers } from "@/hooks/useCampers";
import CamperCard from "@/components/CamperCard/CamperCard";
import CamperFilters, {
  AppliedFilters,
} from "@/components/CamperFilters/CamperFilters";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState/EmptyState";
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
    isFetching,
    isError,
  } = useCampers({
    location: appliedFilters.location || undefined,
    form: appliedFilters.form,
    transmission: appliedFilters.transmission,
    engine: appliedFilters.engine,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  const showEmptyState = !isFetching && !isError && campers.length === 0;

  const handleClearFilters = () => {
    setAppliedFilters({
      location: "",
    });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <CamperFilters onApply={setAppliedFilters} />
      </aside>

      <div className={styles.results}>
        {isFetching && (
          <Loader
            title="Loading tracks..."
            subtitle="Please wait while we fetch the best travel trucks for you"
          />
        )}

        {isError && <p>Something went wrong. Please try again.</p>}

        {showEmptyState && (
          <EmptyState
            onClearFilters={handleClearFilters}
            onViewAll={handleClearFilters}
          />
        )}

        {!showEmptyState && (
          <>
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
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={styles.loadMoreBtn}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
