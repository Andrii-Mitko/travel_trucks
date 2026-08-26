import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Image
        src="/images/hero.webp"
        alt="Camper van at sunset"
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </main>
  );
}
