import styles from "./Loader.module.css";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function Loader({
  title = "Loading...",
  subtitle = "Please wait while we fetch the data for you",
}: Props) {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.card}>
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
