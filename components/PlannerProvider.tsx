"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  emptySelection,
  selectService,
  summarise,
  toggleAddOn,
  type PlannerSelection,
  type PlannerSummary,
} from "@/lib/planner";

type PlannerContextValue = {
  selection: PlannerSelection;
  summary: PlannerSummary;
  chooseService: (id: string) => void;
  toggleAddOn: (id: string) => void;
  reset: () => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<PlannerSelection>(emptySelection);

  const chooseService = useCallback((id: string) => setSelection((s) => selectService(s, id)), []);
  const toggle = useCallback((id: string) => setSelection((s) => toggleAddOn(s, id)), []);
  const reset = useCallback(() => setSelection(emptySelection), []);

  const value = useMemo<PlannerContextValue>(
    () => ({ selection, summary: summarise(selection), chooseService, toggleAddOn: toggle, reset }),
    [selection, chooseService, toggle, reset],
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used within PlannerProvider");
  return ctx;
}
