"use client";

import { usePlanner } from "./PlannerProvider";

export function ChooseLink({ serviceId, serviceName }: { serviceId: string; serviceName: string }) {
  const { selection, chooseService } = usePlanner();
  const selected = selection.serviceId === serviceId;
  return (
    <a
      href="#plan"
      className={`plan-link${selected ? " is-selected" : ""}`}
      onClick={() => chooseService(serviceId)}
      aria-label={selected ? `Selected: ${serviceName}` : `Plan this: ${serviceName}`}
    >
      {selected ? "Selected" : "Plan this"}
    </a>
  );
}
