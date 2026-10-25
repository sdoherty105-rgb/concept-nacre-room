// Computes WCAG contrast ratios for the palette pairings used on the site.
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const c = {
  pearl: "#F3EFEA", umber: "#554840", blush: "#DBBBB3", bronze: "#AD9275", ink: "#24201E",
  mist: "#FBF9F6", pearlDeep: "#E8E1D9", bronzeDeep: "#6E573B", blushSoft: "#EBD7D1",
};
const pairs = [
  ["ink", "pearl", "heading on pearl"], ["umber", "pearl", "body on pearl"], ["umber", "mist", "body on card"],
  ["umber", "pearlDeep", "body on deep pearl"], ["ink", "blush", "ink on blush"], ["umber", "blush", "umber on blush"],
  ["bronzeDeep", "pearl", "bronze-deep text on pearl"], ["bronzeDeep", "mist", "bronze-deep text on card"],
  ["bronzeDeep", "pearlDeep", "bronze-deep on deep pearl"],
  ["bronze", "pearl", "bronze on pearl (decorative only)"], ["bronze", "ink", "bronze on ink"],
  ["pearl", "ink", "pearl on ink"], ["blush", "ink", "blush on ink"], ["pearl", "umber", "pearl on umber"],
  ["blush", "umber", "blush on umber"], ["bronze", "umber", "bronze on umber"], ["ink", "bronze", "ink on bronze"],
  ["umber", "blushSoft", "umber on soft blush"], ["bronzeDeep", "blushSoft", "bronze-deep on soft blush"],
  ["umber", "bronze", "umber on bronze"],
];
for (const [fg, bg, label] of pairs) {
  const r = ratio(c[fg], c[bg]);
  console.log(`${r.toFixed(2).padStart(6)}:1  ${r >= 7 ? "AAA" : r >= 4.5 ? "AA " : r >= 3 ? "3:1" : "FAIL"}  ${label}`);
}
