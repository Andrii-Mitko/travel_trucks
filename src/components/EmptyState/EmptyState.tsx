import Image from "next/image";
import styles from "./EmptyState.module.css";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";

interface Props {
  onClearFilters: () => void;
  onViewAll: () => void;
}

export default function EmptyState({ onClearFilters, onViewAll }: Props) {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/empty-state.webp"
        alt="No campers found"
        width={488}
        height={463}
        className={styles.illustration}
      />

      <h2 className={styles.title}>No campers found</h2>
      <p className={styles.subtitle}>
        We couldn&apos;t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onClearFilters}
          className={styles.clearBtn}
        >
          <IoClose size={24} />
          Clear filters
        </Button>
        <Button
          type="button"
          onClick={onViewAll}
          className={styles.viewAllBtn}
        >
          View all campers
        </Button>
      </div>
    </div>
  );
}
