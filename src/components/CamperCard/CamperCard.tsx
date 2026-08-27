import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import type { CamperListItem } from "@/types/camper";

import styles from "./CamperCard.module.css";

interface Props {
  camper: CamperListItem;
  priority?: boolean;
}

export default function CamperCard({ camper, priority = false }: Props) {
  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="219px"
          priority={priority}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.headerRow}>
          <h3 className={styles.namePrice}>{camper.name}</h3>
          <div className={styles.namePrice}>€{camper.price.toFixed(0)}</div>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Icon
              name="Rating"
              width={16}
              height={16}
              className={styles.starIcon}
            />
            {camper.rating} ({camper.totalReviews} Reviews)
          </div>
          <div className={styles.metaItem}>
            <Icon
              name="location"
              width={16}
              height={16}
              className={styles.metaIcon}
            />
            {camper.location}
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          <div className={styles.badge}>
            <Icon name={camper.engine} width={20} height={20} />
            {camper.engine}
          </div>
          <div className={styles.badge}>
            <Icon name={camper.transmission} width={20} height={20} />
            {camper.transmission}
          </div>
          <div className={styles.badge}>
            <Icon name={camper.form} width={20} height={20} />
            {camper.form.replace("_", " ")}
          </div>
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
