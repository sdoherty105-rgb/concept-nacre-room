import type { Metadata } from "next";
import { CarteList } from "@/components/CarteList";
import { DemoNote } from "@/components/DemoNote";
import { Imprint } from "@/components/Imprint";

export const metadata: Metadata = {
  title: "The carte",
  description: "Demonstration prices for Nacre Room, a fictional salon concept by OFF/SHIFT Studio.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function CartePage() {
  return (
    <>
      <section className="opener spread carte-open">
        <div className="opener-copy">
          <h1>The carte</h1>
          <p className="deck">One column with dotted leaders, set like a printed menu. Every price here is invented.</p>
          <DemoNote kind="prices" />
        </div>
        <Imprint />
      </section>
      <section className="carte-page spread" aria-labelledby="carte-list-title">
        <h2 id="carte-list-title" className="sr-only">
          Services, times and demonstration prices
        </h2>
        <CarteList variant="full" />
      </section>
    </>
  );
}
