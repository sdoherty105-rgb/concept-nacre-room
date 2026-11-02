import type { Metadata } from "next";
import { essays } from "@/lib/issue";
import { Imprint } from "@/components/Imprint";
import { Picture } from "@/components/Picture";

export const metadata: Metadata = {
  title: "Journal",
  description: "Three house notes from Nacre Room, Issue 01, a fictional OFF/SHIFT Studio concept.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function JournalPage() {
  const [frame, gloss, thursday] = essays;
  return (
    <>
      <section className="opener spread journal-open">
        <div className="opener-copy">
          <p className="kicker">Page 18</p>
          <h1>House notes</h1>
          <p className="deck">Three short essays in the voice of the room. No testimonials, no scores, no borrowed clients.</p>
        </div>
        <p className="opener-figure accent" aria-hidden="true">
          01
        </p>
        <Imprint />
      </section>

      <article className="essay essay-a spread" id={frame.slug}>
        <p className="kicker">{frame.kicker}</p>
        <h2>{frame.title}</h2>
        <p className="deck">{frame.deck}</p>
        <div className="essay-columns drop-cap">
          {frame.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <article className="essay essay-b spread" id={gloss.slug}>
        <p className="kicker">{gloss.kicker}</p>
        <h2>
          A gloss is not a <em className="accent">costume</em>
        </h2>
        <p className="deck">{gloss.deck}</p>
        {gloss.paragraphs.map((paragraph) => (
          <p key={paragraph} className="essay-narrow">
            {paragraph}
          </p>
        ))}
      </article>

      <article className="essay essay-c spread" id={thursday.slug}>
        <div className="essay-copy">
          <p className="kicker">
            <span className="accent">{thursday.kicker}</span>
          </p>
          <h2>{thursday.title}</h2>
          <p className="deck">{thursday.deck}</p>
          {thursday.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="essay-photo">
          <Picture
            name="basin"
            alt="A matte cream basin on a plaster ledge, with a linen cloth and a hairpin."
            sizes="(max-width: 959px) 100vw, 46vw"
          />
        </div>
      </article>
    </>
  );
}
