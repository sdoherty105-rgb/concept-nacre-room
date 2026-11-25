"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contents } from "@/lib/issue";

export function ContentsMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  // Set when the overlay closes because a contents line was chosen. Focus then follows the
  // reader to the page they picked instead of jumping back to the Menu button at the top.
  const followLink = useRef<string | null>(null);

  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <Link className="menu-link" href="/#contents">
        Menu
      </Link>
    );
  }

  return (
    <>
      <button
        ref={menuRef}
        type="button"
        className="menu-link"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        Menu
      </button>
      <dialog
        ref={dialogRef}
        className="contents-overlay"
        aria-label="Contents"
        onClose={() => {
          const href = followLink.current;
          followLink.current = null;
          if (href === null) {
            menuRef.current?.focus({ preventScroll: true });
            return;
          }
          const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
          if (!hash) return;
          // In-page spread: move focus to it once the router has scrolled there.
          window.setTimeout(() => {
            const section = document.getElementById(hash);
            if (!section) return;
            if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
            section.focus({ preventScroll: true });
          }, 60);
        }}
        onClick={(event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const link = target.closest("a");
          if (link) {
            followLink.current = link.getAttribute("href") ?? "";
            dialogRef.current?.close();
            return;
          }
          if (target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <form method="dialog">
          <button type="submit" className="overlay-close">
            Close
          </button>
        </form>
        <p className="kicker overlay-kicker">Issue 01</p>
        <ol className="overlay-list">
          {contents.map((item) => (
            <li key={item.href} className="overlay-line">
              <Link href={item.href} style={{ ["--thumb" as string]: `url(/media/thumb-${item.thumb}.webp)` }}>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </dialog>
    </>
  );
}
