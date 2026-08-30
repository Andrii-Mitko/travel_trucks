"use client";

import { useState, FormEvent } from "react";
import { useCampersFilters } from "@/hooks/useCampersFilters";
import type { VehicleForm, Transmission, Engine } from "@/types/camper";
import styles from "./CamperFilters.module.css";
import Icon from "../Icon/Icon";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import { formatLabel } from "@/lib/format";

export interface AppliedFilters {
  location: string;
  form?: VehicleForm;
  transmission?: Transmission;
  engine?: Engine;
}

interface Props {
  onApply: (filters: AppliedFilters) => void;
}

const EMPTY_FILTERS: AppliedFilters = { location: "" };

export default function CamperFilters({ onApply }: Props) {
  const { data: filters, isLoading, isError, refetch } = useCampersFilters();

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

  if (isLoading) {
    return <p className={styles.filtersLoading}>Loading filters...</p>;
  }

  if (isError || !filters) {
    return (
      <div className={styles.filtersError} role="alert">
        <p>Unable to load filters.</p>
        <Button type="button" variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.locationField}>
        <label htmlFor="location-filter" className={styles.locationLabel}>
          Location
        </label>
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
      </div>

      <h2 className={styles.filtersTitle}>Filters</h2>

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
            {formatLabel(value)}
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
            {formatLabel(value)}
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
            {formatLabel(value)}
          </label>
        ))}
      </fieldset>

      <Button type="submit" className={styles.searchBtn}>
        Search
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={handleClear}
        className={styles.clearBtn}
      >
        <IoClose size={24} />
        Clear filters
      </Button>
    </form>
  );
}
