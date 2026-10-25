export const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/nacre-room";

export function ConceptBar() {
  return (
    <div className="concept-bar" data-testid="concept-label">
      <a href={CONCEPT_URL} rel="noopener">
        An OFF/SHIFT concept — fictional demonstration
      </a>
    </div>
  );
}
