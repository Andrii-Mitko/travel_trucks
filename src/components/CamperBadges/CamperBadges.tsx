"use client";

import { useEffect, useRef, useState } from "react";
import type { CamperDetails, Amenity, VehicleForm } from "@/types/camper";
import styles from "./CamperBadges.module.css";

interface Props {
  camper: Pick<CamperDetails, "transmission" | "engine" | "form" | "amenities">;
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

export default function CamperBadges({ camper }: Props) {
  const allLabels = [
    camper.transmission,
    ...camper.amenities.map((a) => AMENITY_LABELS[a]),
    camper.engine,
    FORM_LABELS[camper.form],
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(allLabels.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;
      const badgeEls = Array.from(measure.children) as HTMLElement[];

      let usedWidth = 0;
      let count = 0;
      const gap = 8;

      for (const badgeEl of badgeEls) {
        const badgeWidth = badgeEl.offsetWidth;
        const nextWidth = usedWidth + (count > 0 ? gap : 0) + badgeWidth;

        if (nextWidth > containerWidth) break;

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
          <span key={index} className={styles.badge}>
            {label}
          </span>
        ))}
      </div>

      <div ref={containerRef} className={styles.badges}>
        {allLabels.slice(0, visibleCount).map((label, index) => (
          <span key={index} className={styles.badge}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
