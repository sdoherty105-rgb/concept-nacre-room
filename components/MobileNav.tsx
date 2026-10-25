"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details className="mobile-nav" ref={ref}>
      <summary>
        <span className="sr-only">Menu</span>
        <span className="burger" aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => ref.current && (ref.current.open = false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
