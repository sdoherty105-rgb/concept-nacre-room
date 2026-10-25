import { stylists } from "@/lib/services";
import { ColourGlyph, CutGlyph, SkinGlyph, TextureGlyph } from "./art/StylistGlyphs";

const glyphs = { colour: ColourGlyph, cut: CutGlyph, texture: TextureGlyph, skin: SkinGlyph } as const;

export function Stylists() {
  return (
    <section id="stylists" className="section section-deep" aria-labelledby="stylists-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Our specialists</p>
          <h2 id="stylists-title">Find the right hands for the work</h2>
          <p className="lead">
            Our team is organised by craft, not by hierarchy. Tell us what you are after and we will pair you with the
            specialist best suited to it, or request one in your booking.
          </p>
        </div>
        <ul className="stylist-grid">
          {stylists.map((s) => {
            const Glyph = glyphs[s.id];
            return (
              <li key={s.id} className="stylist-card">
                <Glyph />
                <h3>{s.role}</h3>
                <p className="stylist-spec">{s.speciality}</p>
                <p>{s.description}</p>
                <p className="stylist-best">
                  <span>Best for</span>
                </p>
                <ul className="chips">
                  {s.bestFor.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
