import { CONCEPT_URL } from "@/lib/issue";

export function Imprint() {
  return (
    <p className="imprint" data-testid="concept-label">
      <a href={CONCEPT_URL} rel="noopener">
        An OFF/SHIFT concept, fictional demonstration
      </a>
    </p>
  );
}
