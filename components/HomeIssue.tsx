import Link from "next/link";
import { categories, services } from "@/lib/services";
import { formatPrice } from "@/lib/planner";
import { people, personRecord } from "@/lib/issue";
import { CarteList } from "./CarteList";
import { DemoNote } from "./DemoNote";
import { Imprint } from "./Imprint";
import { Picture } from "./Picture";
import { VisitCard } from "./VisitCard";

function fromPrice(id: (typeof categories)[number]["id"]) {
  return Math.min(...services.filter((service) => service.category === id).map((service) => service.price));
}

export function HomeIssue() {
  return (
    <>
      <section className="cover spread" id="cover" data-layout="cover">
        <h1 className="masthead">
          Nacre
          <br />
          Room
        </h1>
        <div className="cover-photo">
          <Picture
            name="cover"
            priority
            sizes="(max-width: 959px) 100vw, 42vw"
            alt="Dark hair in motion, seen from behind, on a pearl ground."
          />
        </div>
        <div className="issue-line">
          <p className="kicker">
            Issue <span className="accent">one</span>
          </p>
          <p>A room for hair, colour and quiet. Marlowe Cove, in fiction.</p>
          <ol className="issue-toc">
            <li>
              <Link href="#contents">Prices</Link>
            </li>
            <li>
              <Link href="#colour">Colour</Link>
            </li>
            <li>
              <Link href="#cut">Cut</Link>
            </li>
            <li>
              <Link href="#care">Care</Link>
            </li>
          </ol>
        </div>
        <Imprint />
      </section>

      <section className="contents spread ink-spread" id="contents" data-layout="contents">
        <div className="ox-panel">
          <p className="kicker">The front of the issue</p>
          <h2>Contents</h2>
          <p>Services sit here the way a magazine lists its pages. Choose a line to reserve it. The figures are demonstration prices, before any add-on.</p>
        </div>
        <div className="contents-main">
          <DemoNote kind="prices" />
          <CarteList variant="index" />
          <p className="contents-jump">
            <Link className="text-link" href="/the-carte">
              Read the full carte
            </Link>
          </p>
        </div>
      </section>

      <section className="colour spread" id="colour" data-layout="spread-colour">
        <div className="colour-photo clip-once">
          <Picture
            name="colour"
            sizes="(max-width: 959px) 100vw, 50vw"
            alt="A close braid of chestnut hair with a rose ribbon. No face is shown."
          />
        </div>
        <div className="colour-copy">
          <p className="kicker">
            Spread <span className="accent">two</span>
          </p>
          <h2>Colour</h2>
          <p>
            Colour is a slow decision. We paint where the light already wants to go, and we leave the rest alone. A gloss
            refreshes tone without announcing itself. Balayage is brightness placed by hand, meant to still make sense in
            three months.
          </p>
          <p className="from-line">
            From {formatPrice(fromPrice("colour"))}, demonstration price.
          </p>
          <Link className="text-link" href="/the-carte#pearl-gloss">
            Pearl gloss on the carte
          </Link>
        </div>
      </section>

      <section className="cut spread ink-spread" id="cut" data-layout="spread-cut">
        <div className="cut-band" aria-hidden="true" />
        <blockquote className="cut-quote">
          <p>
            A cut should still be telling the <em>truth</em> on the fifth day.
          </p>
        </blockquote>
        <div className="cut-note">
          <p className="kicker">Spread 03</p>
          <h2>Cut</h2>
          <p>
            Shape first, then finish. Fringes, bobs and long layers are cut to move on the day you leave and on the days
            you do not come back. The consultation is part of the haircut.
          </p>
          <p className="from-line">From {formatPrice(fromPrice("hair"))}, demonstration price.</p>
        </div>
      </section>

      <section className="care spread" id="care" data-layout="spread-care">
        <div className="care-copy">
          <p className="kicker">
            Spread <span className="accent">four</span>
          </p>
          <h2>Care</h2>
          <p>
            Care is the work that does not pose. Steam, oil, brushes, a basin with a quiet rim. The scalp is part of the
            haircut, whether or not anyone photographs it.
          </p>
          <p className="from-line">From {formatPrice(fromPrice("treatments"))}, demonstration price.</p>
        </div>
        <div className="care-shears clip-once">
          <Picture
            name="shears"
            sizes="(max-width: 959px) 88vw, 34vw"
            alt="Steel shears and two brushes on pearl linen, beside a lock of dark hair."
          />
        </div>
        <div className="care-bottles clip-once">
          <Picture
            name="bottles"
            sizes="(max-width: 959px) 70vw, 28vw"
            alt="Three unlabelled frosted bottles and a dish of oil on a pale stone ledge."
          />
        </div>
        <div className="care-basin clip-once">
          <Picture
            name="basin"
            sizes="(max-width: 959px) 92vw, 40vw"
            alt="A matte cream basin on a plaster ledge, with a linen cloth and a hairpin."
          />
        </div>
      </section>

      <section className="people-index spread" data-layout="people-index">
        <div className="people-index-copy">
          <p className="kicker">Page 14</p>
          <h2>
            <span className="accent">Four</span> practices, and no reception line.
          </h2>
          <p>
            The people in this issue are fictional characters. You book a practice, not a personality. Names are here so
            the page can introduce them.
          </p>
          <ol className="name-list">
            {people.map((person) => {
              const record = personRecord(person.id);
              return (
                <li key={person.id}>
                  <Link href={`/people#${person.anchor}`}>
                    <span className="person-name">{person.name}</span>
                    <span className="person-role">{record.role}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="people-index-photo clip-once">
          <Picture
            name="people-cut"
            sizes="(max-width: 959px) 100vw, 40vw"
            alt="The back of a precise dark bob, face turned away, on a pearl ground."
          />
        </div>
      </section>

      <section className="journal-opener spread" data-layout="journal-opener">
        <p className="journal-num accent" aria-hidden="true">
          7
        </p>
        <div className="journal-copy">
          <p className="kicker">House notes</p>
          <h2>Leaving the face out of the frame</h2>
          <p>A sitting is private. The page keeps the work and lets the person go home unpictured.</p>
          <Link className="text-link" href="/journal">
            Read the journal
          </Link>
        </div>
      </section>

      <section className="reserve-invite spread" data-layout="reserve-invite">
        <div className="reserve-invite-copy">
          <p className="kicker">Page 22</p>
          <h2>
            Tell us the ritual. We will keep the rest <em className="accent">quiet</em>.
          </h2>
          <p>One question at a time. A running line keeps the total. The request stays on this page.</p>
          <Link className="text-link" href="/reserve">
            Begin the reservation
          </Link>
        </div>
      </section>

      <section className="visit spread ink-spread" id="visit" data-layout="visit-card">
        <div className="visit-note">
          <p className="kicker">Page 24</p>
          <h2>The visit</h2>
          <p>
            Slip this card into the issue. The suburb is invented, the hours are a demonstration, and the door in the
            story opens toward the street.
          </p>
        </div>
        <VisitCard />
      </section>
    </>
  );
}
