import Link from "next/link";

export function Colophon() {
  return (
    <footer className="colophon">
      <p className="colophon-name">Nacre Room, Issue 01</p>
      <p>
        A fictional hair and beauty room in Marlowe Cove, Perth, conceived as a magazine by{" "}
        <a href="https://offshiftstudio.com.au" rel="noopener">
          OFF/SHIFT Studio
        </a>
        .
      </p>
      <p>
        Shop 3, 14 Tidewater Lane, Marlowe Cove, Perth WA. (08) 5550 0142. hello@nacre-room.example. The address, the
        people, the prices and the hours are invented.
      </p>
      <p>Photographs are generated editorial studies for this concept. No client is pictured. Faces are kept out of the frame.</p>
      <p>
        <Link href="/the-carte">The carte</Link> <Link href="/people">People</Link> <Link href="/journal">Journal</Link>{" "}
        <Link href="/reserve">Reserve</Link>
      </p>
    </footer>
  );
}
