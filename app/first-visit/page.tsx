import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons/UiIcons";

export const metadata: Metadata = {
  title: "Your first visit | Nacre Room (fictional concept)",
  description: "What to expect at your first appointment at Nacre Room, a fictional salon concept by OFF/SHIFT Studio.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const before = [
  { title: "Arrive five minutes early", text: "Come a little ahead of time to settle in with a tea. Late arrivals may need a shorter service." },
  { title: "Patch test for colour", text: "If you are having colour for the first time, we ask for a patch test at least 48 hours before." },
  { title: "Bring a reference or two", text: "Photos help. Show us the shape, tone or finish you love, and anything you would rather avoid." },
  { title: "Wear what you will feel good in", text: "A soft cape is provided. For facials, a top that is easy to move out of is ideal." },
];

const steps = [
  { title: "Consultation", text: "A relaxed conversation about your hair, skin, routine and what you want to feel when you leave." },
  { title: "Preparation", text: "A warm wash or cleanse and a short scalp or shoulder massage, because the start of a service matters." },
  { title: "The work", text: "Your specialist explains each step, checks in often, and keeps the pace gentle." },
  { title: "Finish & plan", text: "A finish you can recreate, a short aftercare note and, if you like, a suggested time to return." },
];

const faqs = [
  { q: "How far ahead should I request an appointment?", a: "As early as you can. Saturdays and Thursday evenings are the busiest. We would reply to confirm the best available time." },
  { q: "What if I need to reschedule?", a: "Let us know at least 24 hours ahead and we will happily move your appointment." },
  { q: "How do I pay?", a: "Card and contactless payments at the front desk once your service is finished." },
  { q: "Is the salon accessible?", a: "Yes. There is step-free entry from the street, wide aisles and an accessible restroom. Tell us if there is anything else we can prepare." },
  { q: "Can I bring a friend?", a: "Of course. There is a quiet seating area and a tea bar. Please let us know if you would like to book side-by-side." },
];

export default function FirstVisit() {
  return (
    <>
      <section className="page-hero" aria-labelledby="fv-title">
        <div className="container narrow">
          <p className="eyebrow">New to Nacre Room</p>
          <h1 id="fv-title" className="h1-sm">Your first visit</h1>
          <p className="lead">
            A little preparation makes the time more beautiful. Here is what to expect, from the moment you book to the
            moment you leave a touch lighter.
          </p>
          <div className="hero-actions">
            <Link href="/#plan" className="btn btn-ink">Build your appointment</Link>
            <Link href="/#book" className="btn btn-outline">Request a booking</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="before-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Before you arrive</p>
            <h2 id="before-title">Small things that help</h2>
          </div>
          <ul className="card-grid">
            {before.map((b) => (
              <li key={b.title} className="info-card">
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-deep" aria-labelledby="chair-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">In the chair</p>
            <h2 id="chair-title">How an appointment unfolds</h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="steps-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title">Questions, answered</h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <ChevronDownIcon />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="fine-print">Policies on this page are invented for the concept.</p>
        </div>
      </section>

      <section className="section section-cta" aria-labelledby="cta-title">
        <div className="container narrow center">
          <h2 id="cta-title">Ready when you are</h2>
          <p className="lead">Choose your service, see the time and price, and send a request in under two minutes.</p>
          <Link href="/#plan" className="btn btn-light">Build your appointment</Link>
        </div>
      </section>
    </>
  );
}
