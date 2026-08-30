"use client";

import { useEffect, useRef, useState } from "react";
import type { CamperDetails, Amenity } from "@/types/camper";
import { formatLabel } from "@/lib/format";
import styles from "./CamperBadges.module.css";

interface Props {
  camper: Pick<CamperDetails, "transmission" | "engine" | "form" | "amenities">;
}

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

export default function CamperBadges({ camper }: Props) {
  const allLabels = [
    formatLabel(camper.transmission),
    ...camper.amenities.map((amenity) => AMENITY_LABELS[amenity]),
    formatLabel(camper.engine),
    formatLabel(camper.form),
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(allLabels.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) {
      return;
    }

    const calculate = () => {
      const containerWidth = container.offsetWidth;
      const badgeElements = Array.from(measure.children) as HTMLElement[];

      let usedWidth = 0;
      let count = 0;
      const gap = 8;

      for (const badgeElement of badgeElements) {
        const badgeWidth = badgeElement.offsetWidth;
        const nextWidth = usedWidth + (count > 0 ? gap : 0) + badgeWidth;

        if (nextWidth > containerWidth) {
          break;
        }

        usedWidth = nextWidth;
        count++;
      }

      setVisibleCount(count);
    };

    calculate();

    const resizeObserver = new ResizeObserver(calculate);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [allLabels.length]);

  return (
    <div className={styles.wrapper}>
      <div ref={measureRef} className={styles.measure} aria-hidden="true">
        {allLabels.map((label, index) => (
          <span key={`${label}-${index}`} className={styles.badge}>
            {label}
          </span>
        ))}
      </div>

      <div ref={containerRef} className={styles.badges}>
        {allLabels.slice(0, visibleCount).map((label, index) => (
          <span key={`${label}-${index}`} className={styles.badge}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
