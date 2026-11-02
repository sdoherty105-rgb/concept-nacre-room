import { Imprint } from "@/components/Imprint";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="opener spread">
      <meta name="robots" content="noindex, nofollow" />
      <div className="opener-copy">
        <p className="kicker">Missing page</p>
        <h1>This page has drifted off.</h1>
        <p className="deck">It is not in this issue. The cover is still on the table.</p>
        <Link className="text-link" href="/">
          Back to Nacre Room
        </Link>
      </div>
      <Imprint />
    </section>
  );
}
