"use client";

import { useCampers } from "@/hooks/useCampers";
import CamperCard from "@/components/CamperCard/CamperCard";
import styles from "./page.module.css";

export default function CatalogPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useCampers({});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again.</p>;

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {campers.map((camper, index) => (
          <CamperCard key={camper.id} camper={camper} priority={index === 0} />
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
  );
}
