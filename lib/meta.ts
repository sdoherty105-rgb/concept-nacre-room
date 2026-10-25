/** Joins duration and price (or similar pairs) without decorative separator glyphs. */
export function joinMeta(primary: string, secondary: string): string {
  return `${primary}, ${secondary}`;
}
