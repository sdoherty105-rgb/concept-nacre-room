"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Loads the planner island (builder and booking form) only when it nears the viewport
 * or when the visitor jumps to #plan, so the home-page LCP is not blocked by that bundle.
 */
export function LazyPlannerIsland() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [Island, setIsland] = useState<ComponentType | null>(null);

  useEffect(() => {
    const load = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      void import("./PlannerIsland").then((m) => setIsland(() => m.PlannerIsland));
    };

    const onHash = () => {
      if (window.location.hash.includes("plan")) load();
    };

    onHash();
    window.addEventListener("hashchange", onHash);

    const el = sentinelRef.current;
    if (!el) {
      return () => window.removeEventListener("hashchange", onHash);
    }

    if (!("IntersectionObserver" in window)) {
      load();
      return () => window.removeEventListener("hashchange", onHash);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <div ref={sentinelRef} className="lazy-island">
      {Island ? <Island /> : <div className="lazy-island-skel" aria-hidden="true" />}
    </div>
  );
}
