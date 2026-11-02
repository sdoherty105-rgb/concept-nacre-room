// WCAG contrast for the Nacre issue palette. Text pairs must clear 4.5:1.
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const c = {
  pearl: "#F1ECE8",
  ink: "#1E1824",
  oxblood: "#8A3A4C",
  sea: "#A9C1BB",
  champagne: "#B79C6B",
};

const text = [
  ["ink", "pearl", "text on pearl"],
  ["pearl", "ink", "text on ink"],
  ["oxblood", "pearl", "oxblood accent on pearl"],
  ["pearl", "oxblood", "pearl text on oxblood block"],
  ["champagne", "ink", "champagne label on ink"],
  ["sea", "ink", "sea glass on ink, if used as text"],
];

const decorative = [
  ["oxblood", "ink", "oxblood on ink, block or rule only"],
  ["champagne", "pearl", "champagne hairline on pearl"],
  ["sea", "pearl", "sea glass rule on pearl"],
];

let failed = false;
for (const [fg, bg, label] of text) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= 4.5;
  if (!ok) failed = true;
  console.log(`${r.toFixed(2).padStart(6)}:1  ${ok ? "AA " : "FAIL"}  ${label}`);
}
for (const [fg, bg, label] of decorative) {
  const r = ratio(c[fg], c[bg]);
  console.log(`${r.toFixed(2).padStart(6)}:1  rule  ${label}`);
}
if (failed) process.exit(1);
