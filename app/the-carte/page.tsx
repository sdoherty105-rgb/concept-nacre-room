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
          <p className="kicker">Page 10</p>
          <h1>
            The <span className="accent">carte</span>
          </h1>
          <p className="deck">A single column with dotted leaders. Read it as a printed menu. Nothing here is a live price.</p>
          <DemoNote kind="prices" />
        </div>
        <p className="opener-figure" aria-hidden="true">
          12
        </p>
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
