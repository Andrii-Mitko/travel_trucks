import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import type { IconType } from "react-icons";
import { BsFuelPump, BsLightningCharge } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { GiCaravan } from "react-icons/gi";
import { FaVanShuttle, FaStar } from "react-icons/fa6";
import type {
  CamperListItem,
  VehicleForm,
  Engine,
  Transmission,
} from "@/types/camper";
import styles from "./CamperCard.module.css";

interface Props {
  camper: CamperListItem;
  priority?: boolean;
}

const FORM_ICONS: Record<VehicleForm, IconType> = {
  alcove: GiCaravan,
  panel_van: FaVanShuttle,
  integrated: GiCaravan,
  semi_integrated: GiCaravan,
};

const ENGINE_ICONS: Record<Engine, IconType> = {
  diesel: BsFuelPump,
  petrol: BsFuelPump,
  hybrid: BsLightningCharge,
  electric: BsLightningCharge,
};

const TRANSMISSION_ICONS: Record<Transmission, IconType> = {
  automatic: TbManualGearbox,
  manual: TbManualGearbox,
};

function BadgeIcon({
  value,
  iconMap,
}: {
  value: VehicleForm | Engine | Transmission;
  iconMap: Record<string, IconType>;
}) {
  const IconComponent = iconMap[value];

  return <IconComponent size={20} />;
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
          <h3 className={styles.name}>{camper.name}</h3>

          <span className={styles.price}>€{camper.price.toFixed(0)}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FaStar size={16} className={styles.starIcon} />
            {camper.rating} ({camper.totalReviews} Reviews)
          </span>

          <span className={styles.metaItem}>
            <Icon
              name="location"
              width={16}
              height={16}
              className={styles.locationIcon}
            />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <BadgeIcon value={camper.engine} iconMap={ENGINE_ICONS} />
            {camper.engine}
          </span>

          <span className={styles.badge}>
            <BadgeIcon
              value={camper.transmission}
              iconMap={TRANSMISSION_ICONS}
            />
            {camper.transmission}
          </span>

          <span className={styles.badge}>
            <BadgeIcon value={camper.form} iconMap={FORM_ICONS} />
            {camper.form.replace("_", " ")}
          </span>
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
