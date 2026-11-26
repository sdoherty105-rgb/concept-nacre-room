import { CONCEPT_URL, ENQUIRY_URL } from "@/lib/issue";

// The showroom slip. It sits in the first screen of every page: the fictional-business
// disclosure, the way back to the OFF/SHIFT concept page, and the enquiry link.
export function Imprint() {
  return (
    <div className="imprint" data-testid="concept-label">
      <p className="imprint-note imprint-note--long">
        Nacre Room is fictional, a concept by OFF/SHIFT Studio. Not a real salon.
      </p>
      <p className="imprint-note imprint-note--compact">
        <span className="imprint-compact-lead">Fictional concept - not a real salon - by </span>
        <a href={CONCEPT_URL}>OFF/SHIFT Studio</a>
      </p>
      <p className="imprint-links">
        <a href={CONCEPT_URL} className="imprint-back" data-testid="concept-return">
          Back to the concept
        </a>
        <a href={ENQUIRY_URL} className="imprint-cta" data-testid="concept-cta">
          Want a site like this?
        </a>
      </p>
    </div>
  );
}