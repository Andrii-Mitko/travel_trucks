import { notFound } from "next/navigation";
import { getCamperById, getCamperReviews } from "@/lib/api";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperInfo from "@/components/CamperInfo/CamperInfo";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ camperId: string }>;
}

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
        <section className={styles.topSection}>
          <CamperGallery gallery={camper.gallery} camperName={camper.name} />
          <CamperInfo camper={camper} />
        </section>

        <section className={styles.bottomSection}>
          
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div className={styles.bottomReviews}>
            <CamperReviews reviews={reviews} />
            <BookingForm camperId={camper.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
