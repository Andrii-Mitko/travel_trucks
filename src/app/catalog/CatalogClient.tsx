"use client";

import { useState } from "react";
import { useCampers } from "@/hooks/useCampers";
import CamperCard from "@/components/CamperCard/CamperCard";
import CamperFilters, {
  AppliedFilters,
} from "@/components/CamperFilters/CamperFilters";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState/EmptyState";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function CatalogClient() {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    location: "",
  });
  const [filtersResetKey, setFiltersResetKey] = useState(0);

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
    setAppliedFilters({ location: "" });
    setFiltersResetKey((key) => key + 1);
  };

  return (
    <main className={styles.container}>
      <h1 className="visually-hidden">Camper catalog</h1>

      <aside className={styles.sidebar} aria-label="Camper filters">
        <CamperFilters key={filtersResetKey} onApply={setAppliedFilters} />
      </aside>

      <section className={styles.results} aria-label="Camper catalog">
        {isFetching && !data && (
          <Loader
            title="Loading campers..."
            subtitle="Please wait while we fetch the best travel trucks for you"
          />
        )}

        {isError && (
          <p role="alert">Something went wrong. Please try again.</p>
        )}

        {showEmptyState && (
          <EmptyState
            onClearFilters={handleClearFilters}
            onViewAll={handleClearFilters}
          />
        )}

        {!showEmptyState && !isError && (
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
              <Button
                type="button"
                variant="secondary"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={styles.loadMoreBtn}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
