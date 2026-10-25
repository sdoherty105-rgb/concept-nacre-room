import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section notfound">
      <meta name="robots" content="noindex, nofollow" />
      <div className="container narrow">
        <p className="eyebrow">Page not found</p>
        <h1 className="h1-sm">This page has drifted off.</h1>
        <p className="lead">The page you were looking for is not part of this concept. Let us take you back.</p>
        <Link href="/" className="btn btn-ink">
          Back to Nacre Room
        </Link>
      </div>
    </section>
  );
}
