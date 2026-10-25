import Link from "next/link";
import { PearlMark } from "./art/Logo";
import { MobileNav } from "./MobileNav";

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#plan", label: "Plan your visit" },
  { href: "/#space", label: "The space" },
  { href: "/#stylists", label: "Specialists" },
  { href: "/first-visit", label: "First visit" },
  { href: "/#visit", label: "Visit" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="Nacre Room, home">
          <PearlMark />
          <span>Nacre Room</span>
        </Link>
        <nav aria-label="Primary" className="primary-nav">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/#book" className="btn btn-small btn-ink">
            <span className="show-sm">Book</span>
            <span className="hide-sm">Request a booking</span>
          </Link>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
