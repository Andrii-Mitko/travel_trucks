"use client";

import { useState } from "react";
import Image from "next/image";
import type { CamperImage } from "@/types/camper";
import styles from "./CamperGallery.module.css";

interface Props {
  gallery: CamperImage[];
  camperName: string;
}

export default function CamperGallery({ gallery, camperName }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  if (!gallery.length) {
    return null;
  }

  const currentImage = gallery[activeImage] ?? gallery[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={currentImage.original}
          alt={camperName}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 50vw"
          className={styles.image}
        />
      </div>

      <div className={styles.thumbnails}>
        {gallery.map((image, index) => (
          <button
            type="button"
            key={image.id}
            className={`${styles.thumbnail} ${
              index === activeImage ? styles.active : ""
            }`}
            onClick={() => setActiveImage(index)}
            aria-label={`Show image ${index + 1}`}
          >
            <Image
              src={image.thumb}
              alt={`${camperName} ${index + 1}`}
              fill
              sizes="100px"
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
