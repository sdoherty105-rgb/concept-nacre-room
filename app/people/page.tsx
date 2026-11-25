import type { Metadata } from "next";
import { personRecord } from "@/lib/issue";
import { Imprint } from "@/components/Imprint";
import { Picture } from "@/components/Picture";

export const metadata: Metadata = {
  title: "People",
  description: "Four fictional specialists at Nacre Room, an OFF/SHIFT Studio concept. No real clients are pictured.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PeoplePage() {
  const ione = personRecord("colour");
  const maren = personRecord("cut");
  const sable = personRecord("texture");
  const edith = personRecord("skin");

  return (
    <>
      <section className="opener spread people-open">
        <div className="opener-copy">
          <h1>The people</h1>
          <p className="deck">
            Four fictional characters, one practice each. The photographs are generated studies of hair and shoulder.
            Faces stay out of the issue.
          </p>
        </div>
        <div className="opener-photo">
          <Picture
            name="people-skin"
            alt="A shoulder and neck, dark hair falling forward so the face stays hidden, on a pearl ground."
            sizes="(max-width: 959px) 100vw, 42vw"
          />
        </div>
        <Imprint />
      </section>

      <article className="profile profile-a spread" id={ione.anchor}>
        <div className="profile-copy">
          <p className="kicker">
            <span className="accent">{ione.role}</span>
          </p>
          <h2>{ione.name}</h2>
          <p className="deck">{ione.speciality}</p>
          <p>{ione.description}</p>
          <p>Best suited to {ione.bestFor.join(", ")}.</p>
        </div>
        <div className="profile-photo">
          <Picture name={ione.image} alt={ione.alt} sizes="(max-width: 959px) 100vw, 42vw" />
        </div>
      </article>

      <article className="profile profile-b spread" id={maren.anchor}>
        <div className="profile-photo bleed-left">
          <Picture name={maren.image} alt={maren.alt} sizes="(max-width: 959px) 100vw, 48vw" />
        </div>
        <div className="profile-copy">
          <p className="kicker">
            <span className="accent">{maren.role}</span>
          </p>
          <h2>{maren.name}</h2>
          <p>{maren.description}</p>
          <p>Best suited to {maren.bestFor.join(", ")}.</p>
        </div>
      </article>

      <article className="profile profile-c spread" id={sable.anchor}>
        <div className="profile-copy">
          <h2>{sable.name}</h2>
          <p className="deck">{sable.role}</p>
          <p>{sable.description}</p>
          <p>
            {sable.speciality}. Best suited to {sable.bestFor.join(", ")}.
          </p>
        </div>
        <div className="profile-photo profile-photo-small">
          <Picture name={sable.image} alt={sable.alt} sizes="(max-width: 959px) 70vw, 24vw" />
        </div>
      </article>

      <article className="profile profile-d spread" id={edith.anchor}>
        <div className="profile-photo profile-photo-wide">
          <Picture name={edith.image} alt={edith.alt} sizes="(max-width: 959px) 100vw, 70vw" />
        </div>
        <div className="profile-copy">
          <p className="kicker">
            <span className="accent">{edith.role}</span>
          </p>
          <h2>{edith.name}</h2>
          <p>{edith.description}</p>
          <p>
            {edith.speciality}. Best suited to {edith.bestFor.join(", ")}.
          </p>
        </div>
      </article>
    </>
  );
}
