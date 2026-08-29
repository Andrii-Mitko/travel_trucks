"use client";

import { useState, FormEvent } from "react";
import { useCampersFilters } from "@/hooks/useCampersFilters";
import type { VehicleForm, Transmission, Engine } from "@/types/camper";
import styles from "./CamperFilters.module.css";
import Icon from "../Icon/Icon";
import { IoClose } from "react-icons/io5";

export interface AppliedFilters {
  location: string;
  form?: VehicleForm;
  transmission?: Transmission;
  engine?: Engine;
}

interface Props {
  onApply: (filters: AppliedFilters) => void;
}

const FORM_LABELS: Record<VehicleForm, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

const ENGINE_LABELS: Record<Engine, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

const EMPTY_FILTERS: AppliedFilters = { location: "" };

export default function CamperFilters({ onApply }: Props) {
  const { data: filters, isLoading } = useCampersFilters();

  const [location, setLocation] = useState("");
  const [form, setForm] = useState<VehicleForm | undefined>(undefined);
  const [transmission, setTransmission] = useState<Transmission | undefined>(
    undefined,
  );
  const [engine, setEngine] = useState<Engine | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onApply({ location, form, transmission, engine });
  };

  const handleClear = () => {
    setLocation("");
    setForm(undefined);
    setTransmission(undefined);
    setEngine(undefined);
    onApply(EMPTY_FILTERS);
  };

  if (isLoading || !filters) {
    return <p className={styles.filtersLoading}>Loading filters...</p>;
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <label htmlFor="location-filter" className={styles.locationLabel}>
        Location
        <div className={styles.inputWrapper}>
          <Icon
            name="location"
            width={20}
            height={20}
            className={`${styles.locationIcon} ${
              location ? styles.locationIconActive : ""
            }`}
          />
          <input
            type="text"
            id="location-filter"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City"
            className={styles.locationInput}
          />
        </div>
      </label>

      <p className={styles.filtersTitle}>Filters</p>

      <fieldset className={styles.fieldset}>
        <legend>Vehicle type</legend>
        {filters.forms.map((value) => (
          <label key={value} className={styles.radioOption}>
            <input
              type="radio"
              name="form"
              checked={form === value}
              onChange={() => setForm(value)}
            />
            {FORM_LABELS[value]}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Engine</legend>
        {filters.engines.map((value) => (
          <label key={value} className={styles.radioOption}>
            <input
              type="radio"
              name="engine"
              checked={engine === value}
              onChange={() => setEngine(value)}
            />
            {ENGINE_LABELS[value]}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Transmission</legend>
        {filters.transmissions.map((value) => (
          <label key={value} className={styles.radioOption}>
            <input
              type="radio"
              name="transmission"
              checked={transmission === value}
              onChange={() => setTransmission(value)}
            />
            {TRANSMISSION_LABELS[value]}
          </label>
        ))}
      </fieldset>

      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
      <button type="button" onClick={handleClear} className={styles.clearBtn}>
        <IoClose size={24} /> Clear filters
      </button>
    </form>
  );
}
