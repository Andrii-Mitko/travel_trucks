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
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
