import { BottlesArt, LinenArt, MirrorArt, RippleArt } from "./art/SpaceArt";

const points = [
  { title: "Soft, natural light", text: "North-facing windows, pale lime-washed walls and warm lamps for the later hours. Colour reads true here." },
  { title: "Unhurried by design", text: "We book each chair with room to breathe, so no one is rushed in or out and conversations are never cut short." },
  { title: "A quieter kind of salon", text: "Low music, linen-lined stations and a tea and sparkling water bar. Come as you are, leave a little lighter." },
  { title: "Considered products", text: "A small, edited shelf of nourishing formulas, chosen to be used well at home. Never a hard sell." },
];

export function Space() {
  return (
    <section id="space" className="section section-dark" aria-labelledby="space-title">
      <div className="container space-grid">
        <div className="space-copy">
          <p className="eyebrow">The space &amp; the experience</p>
          <h2 id="space-title">A room that slows you down</h2>
          <p className="lead">
            Nacre is the iridescent lining of a shell: soft, luminous, quietly layered. The room is built in the same
            spirit.
          </p>
          <ul className="point-list">
            {points.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-mosaic" aria-label="Illustrations of the salon: mirror, products, water and linen">
          <figure className="tile tile-1">
            <MirrorArt />
            <figcaption>Arched mirrors</figcaption>
          </figure>
          <figure className="tile tile-2">
            <BottlesArt />
            <figcaption>The edited shelf</figcaption>
          </figure>
          <figure className="tile tile-3">
            <RippleArt />
            <figcaption>Warm basins</figcaption>
          </figure>
          <figure className="tile tile-4">
            <LinenArt />
            <figcaption>Linen &amp; stone</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
