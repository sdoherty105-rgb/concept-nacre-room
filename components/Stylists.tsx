import { stylists } from "@/lib/services";
export function Stylists() {
  return <section id="stylists" className="section section-specialists" aria-labelledby="stylists-title"><div className="container">
    <div className="section-head"><p className="eyebrow">Specialists</p><h2 id="stylists-title">The right person<br />for your appointment.</h2><p className="lead">Request a specialist when you book, or tell us what you have in mind and we will help you choose.</p></div>
    <ul className="stylist-grid">{stylists.map((s, i) => <li key={s.id} className="stylist-card"><span className="specialist-number">0{i + 1}</span><div><h3>{s.role}</h3><p className="stylist-spec">{s.speciality}</p></div><p>{s.description}</p><ul className="chips" aria-label={`Services for ${s.role}`}>{s.bestFor.map(b => <li key={b}>{b}</li>)}</ul></li>)}</ul>
  </div></section>;
}

