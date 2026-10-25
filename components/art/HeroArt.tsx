export function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 520 640"
      role="img"
      aria-label="Abstract illustration of a large soft pearl resting inside an arched alcove"
    >
      <defs>
        <linearGradient id="ha-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DBBBB3" />
          <stop offset="0.55" stopColor="#E8D3CC" />
          <stop offset="1" stopColor="#F3EFEA" />
        </linearGradient>
        <radialGradient id="ha-pearl" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.28" stopColor="#F7F1EC" />
          <stop offset="0.62" stopColor="#E3D2CA" />
          <stop offset="0.86" stopColor="#CDB3A6" />
          <stop offset="1" stopColor="#AD9275" />
        </radialGradient>
        <radialGradient id="ha-pearl-sm" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#EEE2DB" />
          <stop offset="1" stopColor="#BFA697" />
        </radialGradient>
        <radialGradient id="ha-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#554840" stopOpacity="0.38" />
          <stop offset="1" stopColor="#554840" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-glow" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ha-clip">
          <path d="M60 640V250C60 130 150 40 260 40s200 90 200 210v390z" />
        </clipPath>
      </defs>

      <path d="M30 640V250C30 112 132 12 260 12s230 100 230 238v390" fill="none" stroke="#AD9275" strokeWidth="1.5" opacity="0.7" />
      <path d="M60 640V250C60 130 150 40 260 40s200 90 200 210v390z" fill="url(#ha-arch)" />

      <g clipPath="url(#ha-clip)">
        <rect x="60" y="40" width="400" height="600" fill="url(#ha-glow)" />
        <g fill="none" stroke="#AD9275" strokeWidth="1" opacity="0.4">
          <ellipse cx="260" cy="520" rx="150" ry="26" />
          <ellipse cx="260" cy="520" rx="200" ry="38" />
          <ellipse cx="260" cy="520" rx="260" ry="52" />
        </g>
        <rect x="60" y="540" width="400" height="100" fill="#554840" opacity="0.07" />
        <ellipse cx="270" cy="528" rx="150" ry="22" fill="url(#ha-shadow)" />
        <circle className="hero-pearl" cx="260" cy="350" r="150" fill="url(#ha-pearl)" />
        <ellipse cx="205" cy="270" rx="46" ry="30" fill="#FFFFFF" opacity="0.55" transform="rotate(-32 205 270)" />
        <circle cx="132" cy="498" r="28" fill="url(#ha-pearl-sm)" />
        <ellipse cx="124" cy="489" rx="9" ry="6" fill="#FFFFFF" opacity="0.7" transform="rotate(-30 124 489)" />
        <circle cx="408" cy="512" r="16" fill="url(#ha-pearl-sm)" />
        <circle cx="366" cy="522" r="9" fill="url(#ha-pearl-sm)" />
      </g>
    </svg>
  );
}
