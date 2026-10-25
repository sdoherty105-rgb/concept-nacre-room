import Link from "next/link";
import { HeroArt } from "./art/HeroArt";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Hair, colour &amp; skin · Marlowe Cove, Perth</p>
          <h1 id="hero-title">
            Your time.
            <br />
            Beautifully spent.
          </h1>
          <p className="lead">
            A calm, considered salon for hair, colour, brows and skin. Build your appointment in a minute, see exactly
            how long it takes and what it costs, then send us a request.
          </p>
          <div className="hero-actions">
            <Link href="/#plan" className="btn btn-ink">
              Build your appointment
            </Link>
            <Link href="/#services" className="btn btn-outline">
              See the menu
            </Link>
          </div>
          <ul className="hero-notes" aria-label="At a glance">
            <li>Tuesday to Saturday, by appointment</li>
            <li>Late night Thursdays until 8pm</li>
            <li>Step-free entry</li>
          </ul>
        </div>
        <div className="hero-visual">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
