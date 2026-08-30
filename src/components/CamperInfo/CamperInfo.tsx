import type { CamperDetails } from "@/types/camper";
import styles from "./CamperInfo.module.css";
import CamperMeta from "../CamperMeta/CamperMeta";
import CamperBadges from "../CamperBadges/CamperBadges";
import { formatLabel } from "@/lib/format";

interface Props {
  camper: CamperDetails;
}

export default function CamperInfo({ camper }: Props) {
  function formatUnit(value: string): string {
    return value.replace(/(\d)([a-zA-Zа-яА-Я])/, "$1 $2");
  }

  function formatConsumption(value: string): string {
    return value
      .replace(/(\d)([a-zA-Zа-яА-Я])/g, "$1 $2")
      .replace(/\s*\/\s*/, " / ");
  }
  return (
    <div className={styles.info}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{camper.name}</h1>

        <CamperMeta
          rating={camper.rating}
          totalReviews={camper.totalReviews}
          location={camper.location}
        />

        <p className={styles.price}>&euro;{camper.price.toFixed(0)}</p>

        <p className={styles.description}>{camper.description}</p>
      </div>

      <div className={styles.hero}>
        <h2 className={styles.sectionTitle}>Vehicle details</h2>

        <CamperBadges camper={camper} />

        <hr className={styles.dash} />

        <dl className={styles.specifications}>
          <div>
            <dt>Form</dt>
            <dd>{formatLabel(camper.form)}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{formatUnit(camper.length)}</dd>
          </div>
          <div>
            <dt>Width</dt>
            <dd>{formatUnit(camper.width)}</dd>
          </div>
          <div>
            <dt>Height</dt>
            <dd>{formatUnit(camper.height)}</dd>
          </div>
          <div>
            <dt>Tank</dt>
            <dd>{formatUnit(camper.tank)}</dd>
          </div>
          <div>
            <dt>Consumption</dt>

            <dd>{formatConsumption(camper.consumption)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
