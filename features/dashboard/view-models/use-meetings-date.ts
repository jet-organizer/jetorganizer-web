"use client";

import { useState, useSyncExternalStore } from "react";

const dateFormatter = new Intl.DateTimeFormat("es", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function subscribeToLocalDate(onChange: () => void) {
  window.addEventListener("focus", onChange);
  return () => window.removeEventListener("focus", onChange);
}

function getLocalToday() {
  return new Date().setHours(0, 0, 0, 0);
}

export function useMeetingsDate() {
  const today = useSyncExternalStore(subscribeToLocalDate, getLocalToday, () => null);
  const [offset, setOffset] = useState(0);
  const date = today === null ? null : new Date(today);

  if (date) date.setDate(date.getDate() + offset);

  const label = date ? dateFormatter.format(date) : "";

  return {
    label: offset === 0 ? (label ? `Hoy, ${label}` : "Hoy") : label,
    changeDay: (days: number) => setOffset((current) => current + days),
  };
}
