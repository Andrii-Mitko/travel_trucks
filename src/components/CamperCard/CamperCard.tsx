import Image from "next/image";
import Link from "next/link";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

export default function CamperCard({
  camper,
  priority = false,
}: {
  camper: CamperListItem;
  priority?: boolean;
}) {
  return (
    <li className={styles.card}>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={290}
        height={310}
        className={styles.image}
        priority={priority}
      />
      <div className={styles.info}>
        <div className={styles.headerRow}>
          <h3>{camper.name}</h3>
          <span className={styles.price}>€{camper.price.toFixed(2)}</span>
        </div>
        <div className={styles.meta}>
          <span>
            ★ {camper.rating} ({camper.totalReviews} Reviews)
          </span>
          <span>{camper.location}</span>
        </div>
        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </li>
  );
}
