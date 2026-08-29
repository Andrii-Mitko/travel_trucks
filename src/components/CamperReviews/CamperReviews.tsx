import { FaStar } from "react-icons/fa6";
import type { Review } from "@/types/camper";
import styles from "./CamperReviews.module.css";

interface Props {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: Props) {
  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviews}>
        {reviews.map((review) => (
          <article className={styles.review} key={review.id}>
            <div className={styles.reviewer}>
              <span className={styles.avatar}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </span>

              <div>
                <h3>{review.reviewer_name}</h3>

                <div className={styles.reviewRating}>
                  {Array.from({ length: review.reviewer_rating }).map(
                    (_, index) => (
                      <FaStar key={index} />
                    ),
                  )}
                </div>
              </div>
            </div>

            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
