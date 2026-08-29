import { FaStar } from "react-icons/fa6";
import Icon from "@/components/Icon/Icon";
import styles from "./CamperMeta.module.css";

interface Props {
  rating: number;
  totalReviews: number;
  location: string;
}

export default function CamperMeta({ rating, totalReviews, location }: Props) {
  return (
    <div className={styles.meta}>
      <span className={styles.metaItem}>
        <FaStar size={16} className={styles.starIcon} />
        {rating} ({totalReviews} Reviews)
      </span>

      <span className={styles.metaItem}>
        <Icon
          name="location"
          width={16}
          height={16}
          className={styles.locationIcon}
        />
        {location}
      </span>
    </div>
  );
}
