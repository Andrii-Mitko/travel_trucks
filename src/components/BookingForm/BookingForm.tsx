"use client";

import { FormEvent, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { createBookingRequest } from "@/lib/api";
import styles from "./BookingForm.module.css";
import Button from "../Button/Button";

interface Props {
  camperId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email.";
  }

  return errors;
}

export default function BookingForm({ camperId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(name, email);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSending(true);
    setMessage("");

    try {
      const response = await createBookingRequest(camperId, { name, email });

      setMessage(response.message);
      setName("");
      setEmail("");
      setErrors({});
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className={styles.formWrapper}>
      <h2 className={styles.title}>Book your campervan now</h2>

      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="booking-name" className={styles.srOnly}>
            Name
          </label>
          {errors.name && <span className={styles.floatingLabel}>Name</span>}
          <div
            className={`${styles.inputWrapper} ${errors.name ? styles.inputError : ""}`}
          >
            <input
              type="text"
              id="booking-name"
              name="name"
              placeholder="Name*"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSending}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
            />
            {errors.name && (
              <FaCircleExclamation className={styles.errorIcon} />
            )}
          </div>
          {errors.name && (
            <p id="booking-name-error" className={styles.errorMessage}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="booking-email" className={styles.srOnly}>
            Email
          </label>
          {errors.email && <span className={styles.floatingLabel}>Email</span>}
          <div
            className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ""}`}
          >
            <input
              type="email"
              id="booking-email"
              name="email"
              placeholder="Email*"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSending}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "booking-email-error" : undefined}
            />
            {errors.email && (
              <FaCircleExclamation className={styles.errorIcon} />
            )}
          </div>
          {errors.email && (
            <p id="booking-email-error" className={styles.errorMessage}>
              {errors.email}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSending} className={styles.submitButton}>
          {isSending ? "Sending..." : "Send"}
        </Button>

        {message && (
          <p className={styles.message} role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
