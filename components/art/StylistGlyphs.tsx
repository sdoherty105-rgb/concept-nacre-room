const common = { viewBox: "0 0 96 96", "aria-hidden": true, focusable: false, className: "glyph" } as const;

export function ColourGlyph() {
  return (
    <svg {...common}>
      <circle cx="38" cy="40" r="26" fill="#DBBBB3" opacity="0.85" />
      <circle cx="58" cy="40" r="26" fill="#AD9275" opacity="0.6" />
      <circle cx="48" cy="58" r="26" fill="#554840" opacity="0.45" />
    </svg>
  );
}

export function CutGlyph() {
  return (
    <svg {...common} fill="none" stroke="#554840" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 76C30 40 52 24 78 18" />
      <path d="M26 82C40 52 58 38 84 30" stroke="#AD9275" />
      <path d="M12 68C22 38 42 20 66 12" opacity="0.5" />
    </svg>
  );
}

export function TextureGlyph() {
  return (
    <svg {...common} fill="none" strokeWidth="2.5" strokeLinecap="round">
      <path d="M10 34c10-14 18 14 28 0s18 14 28 0 14 8 20 0" stroke="#554840" />
      <path d="M10 52c10-14 18 14 28 0s18 14 28 0 14 8 20 0" stroke="#AD9275" />
      <path d="M10 70c10-14 18 14 28 0s18 14 28 0 14 8 20 0" stroke="#DBBBB3" />
    </svg>
  );
}

export function SkinGlyph() {
  return (
    <svg {...common} fill="none">
      <path d="M20 84V46C20 28 32 14 48 14s28 14 28 32v38" stroke="#554840" strokeWidth="2.5" />
      <path d="M32 84V48c0-11 7-20 16-20s16 9 16 20v36" stroke="#AD9275" strokeWidth="2.5" />
      <circle cx="48" cy="58" r="8" fill="#DBBBB3" />
    </svg>
  );
}
