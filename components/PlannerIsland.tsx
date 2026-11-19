"use client";

import { Planner } from "./Planner";
import { PlannerProvider } from "./PlannerProvider";

export function PlannerIsland() {
  return (
    <PlannerProvider>
      <Planner />
    </PlannerProvider>
  );
}
