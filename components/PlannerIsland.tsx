"use client";

import { useEffect } from "react";
import { BookingForm } from "./BookingForm";
import { Planner } from "./Planner";
import { PlannerProvider, usePlanner } from "./PlannerProvider";

function ApplyServiceFromHash() {
  const { chooseService } = usePlanner();

  useEffect(() => {
    const apply = () => {
      const query = window.location.hash.split("?")[1];
      if (!query) return;
      const id = new URLSearchParams(query).get("service");
      if (id) chooseService(id);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [chooseService]);

  return null;
}

export function PlannerIsland() {
  return (
    <PlannerProvider>
      <ApplyServiceFromHash />
      <Planner />
      <BookingForm />
    </PlannerProvider>
  );
}
