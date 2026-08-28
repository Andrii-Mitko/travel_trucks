import { notFound } from "next/navigation";
import { getCamperById, getCamperReviews } from "@/lib/api";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import BookingForm from "@/components/BookingForm/BookingForm";
import {
  FaStar,
  FaLocationDot,
  FaGasPump,
  FaCar,
  FaKitchenSet,
  FaTv,
  FaRadio,
  FaShower,
  FaSnowflake,
} from "react-icons/fa6";
import { GiCaravan } from "react-icons/gi";
import type { Amenity, VehicleForm } from "@/types/camper";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ camperId: string }>;
}

const FORM_LABELS: Record<VehicleForm, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

const AMENITY_LABELS: Record<Amenity, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

const AMENITY_ICONS = {
  ac: FaSnowflake,
  bathroom: FaShower,
  kitchen: FaKitchenSet,
  tv: FaTv,
  radio: FaRadio,
  refrigerator: FaSnowflake,
  microwave: FaKitchenSet,
  gas: FaGasPump,
  water: FaShower,
};

export default async function CamperDetailsPage({ params }: Props) {
  const { camperId } = await params;

  let camper;

  try {
    camper = await getCamperById(camperId);
  } catch {
    notFound();
  }

  let reviews: Awaited<ReturnType<typeof getCamperReviews>> = [];

  try {
    reviews = await getCamperReviews(camperId);
  } catch {
    reviews = [];
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{camper.name}</h1>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <FaStar className={styles.starIcon} />
              {camper.rating} ({camper.totalReviews} Reviews)
            </span>

            <span className={styles.location}>
              <FaLocationDot />
              {camper.location}
            </span>
          </div>
        </section>

        <section className={styles.details}>
          <CamperGallery gallery={camper.gallery} camperName={camper.name} />

          <div className={styles.info}>
            <h2 className={styles.price}>€{camper.price.toFixed(0)}</h2>

            <p className={styles.description}>{camper.description}</p>

            <div className={styles.badges}>
              <span className={styles.badge}>
                <FaCar />
                {camper.transmission}
              </span>

              {camper.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity];

                return (
                  <span className={styles.badge} key={amenity}>
                    <Icon />
                    {AMENITY_LABELS[amenity]}
                  </span>
                );
              })}

              <span className={styles.badge}>
                <FaGasPump />
                {camper.engine}
              </span>

              <span className={styles.badge}>
                <GiCaravan />
                {FORM_LABELS[camper.form]}
              </span>
            </div>

            <section className={styles.vehicleDetails}>
              <h2 className={styles.sectionTitle}>Vehicle details</h2>

              <dl className={styles.specifications}>
                <div>
                  <dt>Form</dt>
                  <dd>{FORM_LABELS[camper.form]}</dd>
                </div>

                <div>
                  <dt>Length</dt>
                  <dd>{camper.length}</dd>
                </div>

                <div>
                  <dt>Width</dt>
                  <dd>{camper.width}</dd>
                </div>

                <div>
                  <dt>Height</dt>
                  <dd>{camper.height}</dd>
                </div>

                <div>
                  <dt>Tank</dt>
                  <dd>{camper.tank}</dd>
                </div>

                <div>
                  <dt>Consumption</dt>
                  <dd>{camper.consumption}</dd>
                </div>
              </dl>
            </section>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <section className={styles.reviewsSection}>
            <h2 className={styles.sectionTitle}>Reviews</h2>

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
                        {Array.from({
                          length: review.reviewer_rating,
                        }).map((_, index) => (
                          <FaStar key={index} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p>{review.comment}</p>
                </article>
              ))}
            </div>
          </section>

          <BookingForm camperId={camper.id} />
        </section>
      </div>
    </main>
  );
}
