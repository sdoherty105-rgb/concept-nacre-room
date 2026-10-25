import Link from "next/link";
import { PearlMark } from "./art/Logo";
import { CONCEPT_URL } from "./ConceptBar";
import { navLinks } from "./Header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="wordmark wordmark-light" aria-label="Nacre Room, home">
            <PearlMark />
            <span>Nacre Room</span>
          </Link>
          <p className="footer-tag">Hair, skin and brows in a quiet room in Marlowe Cove, Perth.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/#book">Request a booking</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-note">
          <p>
            <a href={CONCEPT_URL} rel="noopener">
              An OFF/SHIFT concept — fictional demonstration
            </a>
          </p>
          <p>
            Nacre Room is a fictional business. Services, prices, people and the address are invented for this
            portfolio piece. The booking form does not send or store anything.
          </p>
          <p>
            Website concept by{" "}
            <a href="https://offshiftstudio.com.au" rel="noopener">
              OFF/SHIFT Studio
            </a>
            , Perth.
          </p>
        </div>
      </div>
    </footer>
  );
}
