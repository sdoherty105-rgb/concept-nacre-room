"use client";

import { useSyncExternalStore } from "react";
import { formatClock, weekHours } from "@/lib/hours";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}

function snapshot(): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const today = weekHours[dayIndex];
  if (today && today.open !== null && today.close !== null && minutes >= today.open && minutes < today.close) {
    return `Open now, until ${formatClock(today.close)} (Perth time)`;
  }
  return "Closed right now (Perth time)";
}

export function OpenNow() {
  const text = useSyncExternalStore(subscribe, snapshot, () => "");
  return (
    <p className="open-now" aria-live="polite">
      {text || "Tuesday to Saturday"}
    </p>
  );
}
