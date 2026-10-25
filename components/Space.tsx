import Link from "next/link";
const points = [
  { title: "Time to talk", text: "Every appointment starts with a consultation. Bring a reference picture, tell us what has worked before, or start with what you would like to change." },
  { title: "Natural light", text: "North-facing windows and warm lighting at the stations help us see your colour clearly, from the consultation to the finish." },
  { title: "Your pace", text: "Appointments have room for questions, a drink and a little breathing space. Let us know if you prefer a quieter visit." },
  { title: "Care at home", text: "We will explain how to look after your cut and colour between visits, with product advice matched to your routine." },
];
export function Space() {
  return <section id="space" className="section salon-space" aria-labelledby="space-title"><div className="container salon-space-grid"><div><p className="eyebrow">In the room</p><h2 id="space-title">Come in.<br /><em>Settle in.</em></h2><Link href="/first-visit">A guide to your first visit</Link></div><ul className="point-list">{points.map(p => <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}</ul></div></section>;
}

