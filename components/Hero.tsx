import Link from "next/link";

const index = [
  { id: "hair", label: "Cut & style" },
  { id: "colour", label: "Colour" },
  { id: "treatments", label: "Hair & scalp" },
  { id: "beauty", label: "Brows, lashes & skin" },
];

export function Hero() {
  return (
    <section className="salon-front" aria-labelledby="hero-title">
      <div className="container">
        <div className="salon-overline"><span>A hair &amp; beauty salon</span><span>Marlowe Cove, Perth</span></div>
        <div className="salon-cover">
          <h1 id="hero-title">Nacre<br /><span>Room</span></h1>
          <div className="salon-index"><p>A cut that feels like you.<br />Colour you can live in.</p><nav aria-label="Explore salon services"><ol>{index.map((item, i) => <li key={item.id}><Link href={`/#cat-${item.id}`}><span>{item.label}</span><small>0{i + 1}</small></Link></li>)}</ol></nav></div>
        </div>
        <div className="salon-cover-foot"><Link href="/#plan">Build your appointment</Link><p>Tuesday to Saturday.<br />Thursday evenings until 8pm.</p><Link href="/first-visit">Your first visit</Link></div>
      </div>
    </section>
  );
}

