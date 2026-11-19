import Link from "next/link";
import { CONCEPT_URL, ENQUIRY_URL } from "@/lib/issue";

export function Colophon() {
  return (
    <footer className="colophon">
      <p className="colophon-name">Nacre Room, Issue 01</p>
      <p>
        A fictional hair and beauty room in Marlowe Cove, Perth, conceived as a magazine by OFF/SHIFT Studio. Nacre Room
        is not a real business.
      </p>
      <p>
        Shop 3, 14 Tidewater Lane, Marlowe Cove, Perth WA. (08) 5550 0142. hello@nacre-room.example. The address, the
        people, the prices and the hours are invented, and the reservation never sends or stores anything.
      </p>
      <p>Photographs are generated editorial studies for this concept. No client is pictured. Faces are kept out of the frame.</p>
      <nav aria-label="Issue pages" className="colophon-pages">
        <Link href="/the-carte">The carte</Link> <Link href="/people">People</Link> <Link href="/journal">Journal</Link>{" "}
        <Link href="/reserve">Reserve</Link>
      </nav>
      <div className="colophon-studio">
        <p className="kicker">Made by OFF/SHIFT Studio, Perth</p>
        <p className="colophon-studio-links">
          <a href={ENQUIRY_URL} className="imprint-cta">
            Want a website like this?
          </a>
          <a href={CONCEPT_URL}>Back to the concept</a>
        </p>
      </div>
    </footer>
  );
}
