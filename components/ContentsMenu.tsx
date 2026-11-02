"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contents } from "@/lib/issue";

export function ContentsMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

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
        onClose={() => menuRef.current?.focus()}
        onClick={(event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          if (target === dialogRef.current || target.closest("a")) dialogRef.current?.close();
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
                <span className="overlay-num">{item.n}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </dialog>
    </>
  );
}
