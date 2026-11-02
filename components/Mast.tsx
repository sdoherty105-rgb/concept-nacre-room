import Link from "next/link";
import { contents } from "@/lib/issue";

export function Mast() {
  return (
    <>
      <div id="top" />
      <header className="mast">
        <Link href="/" className="wordmark">
          Nacre
        </Link>
        <a className="menu-link" href="#contents-overlay">
          Menu
        </a>
        <Link href="/reserve" className="reserve-link">
          Reserve
        </Link>
      </header>
      <nav id="contents-overlay" className="contents-overlay" aria-label="Contents" tabIndex={-1}>
        <a className="overlay-close" href="#top">
          Close
        </a>
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
      </nav>
    </>
  );
}
