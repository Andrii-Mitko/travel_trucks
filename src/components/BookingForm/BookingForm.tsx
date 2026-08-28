"use client";

import { FormEvent, useState } from "react";
import { createBookingRequest } from "@/lib/api";
import styles from "./BookingForm.module.css";

interface Props {
  camperId: string;
}

export default function BookingForm({ camperId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSending(true);
    setMessage("");

    try {
      const response = await createBookingRequest(camperId, {
        name,
        email,
      });

      setMessage(response.message);
      setName("");
      setEmail("");
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

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={isSending}
        />

        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isSending}
        />

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </section>
  );
}
