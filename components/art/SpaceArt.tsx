export function MirrorArt() {
  return (
    <svg viewBox="0 0 400 480" role="img" aria-label="Abstract illustration of a tall arched mirror above a low stone console" className="tile-art">
      <defs>
        <linearGradient id="sa-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8E1D9" />
          <stop offset="1" stopColor="#DBBBB3" />
        </linearGradient>
        <linearGradient id="sa-mirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBF9F6" />
          <stop offset="0.5" stopColor="#E9DFD8" />
          <stop offset="1" stopColor="#CBB8AC" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#sa-wall)" />
      <path d="M110 400V170C110 110 150 70 200 70s90 40 90 100v230z" fill="url(#sa-mirror)" stroke="#AD9275" strokeWidth="3" />
      <path d="M150 380V190c0-26 20-46 48-52" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
      <rect x="70" y="400" width="260" height="22" rx="3" fill="#554840" />
      <rect x="86" y="422" width="228" height="58" fill="#24201E" opacity="0.88" />
      <circle cx="250" cy="384" r="16" fill="#F3EFEA" stroke="#AD9275" />
      <rect x="140" y="372" width="12" height="28" rx="2" fill="#AD9275" />
    </svg>
  );
}

export function BottlesArt() {
  return (
    <svg viewBox="0 0 400 480" role="img" aria-label="Abstract illustration of three apothecary bottles on a pale shelf" className="tile-art">
      <defs>
        <linearGradient id="sb-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#554840" />
          <stop offset="1" stopColor="#24201E" />
        </linearGradient>
        <linearGradient id="sb-b1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#DBBBB3" />
          <stop offset="0.45" stopColor="#F3E6E1" />
          <stop offset="1" stopColor="#C9A99F" />
        </linearGradient>
        <linearGradient id="sb-b2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#AD9275" />
          <stop offset="0.45" stopColor="#D8C6AF" />
          <stop offset="1" stopColor="#8F7658" />
        </linearGradient>
        <linearGradient id="sb-b3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E8E1D9" />
          <stop offset="0.45" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D5CCC2" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#sb-bg)" />
      <rect x="0" y="372" width="400" height="108" fill="#F3EFEA" opacity="0.1" />
      <rect x="0" y="370" width="400" height="3" fill="#AD9275" opacity="0.8" />
      <rect x="62" y="150" width="86" height="220" rx="14" fill="url(#sb-b1)" />
      <rect x="82" y="118" width="46" height="36" rx="6" fill="#AD9275" />
      <rect x="82" y="214" width="46" height="70" rx="4" fill="#F3EFEA" opacity="0.75" />
      <rect x="164" y="200" width="82" height="170" rx="41" fill="url(#sb-b3)" />
      <circle cx="205" cy="186" r="20" fill="#AD9275" />
      <rect x="264" y="110" width="74" height="260" rx="10" fill="url(#sb-b2)" />
      <rect x="276" y="86" width="50" height="28" rx="5" fill="#F3EFEA" />
      <rect x="276" y="200" width="50" height="2" fill="#F3EFEA" opacity="0.7" />
      <rect x="276" y="210" width="34" height="2" fill="#F3EFEA" opacity="0.5" />
    </svg>
  );
}

export function RippleArt() {
  return (
    <svg viewBox="0 0 400 480" role="img" aria-label="Abstract illustration of soft concentric ripples in warm water" className="tile-art">
      <defs>
        <radialGradient id="sr-bg" cx="0.5" cy="0.45" r="0.8">
          <stop offset="0" stopColor="#F3EFEA" />
          <stop offset="1" stopColor="#DBBBB3" />
        </radialGradient>
      </defs>
      <rect width="400" height="480" fill="url(#sr-bg)" />
      <g fill="none" stroke="#6E573B" strokeWidth="1.2">
        {[28, 64, 100, 138, 178, 220, 266, 316].map((r, i) => (
          <circle key={r} cx="200" cy="228" r={r} opacity={0.65 - i * 0.07} />
        ))}
      </g>
      <circle cx="200" cy="228" r="14" fill="#AD9275" opacity="0.85" />
    </svg>
  );
}

export function LinenArt() {
  return (
    <svg viewBox="0 0 400 480" role="img" aria-label="Abstract illustration of soft folds of pearl-coloured linen" className="tile-art">
      <defs>
        <linearGradient id="sl-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E8E1D9" />
          <stop offset="0.5" stopColor="#FBF9F6" />
          <stop offset="1" stopColor="#D9CCC0" />
        </linearGradient>
        <linearGradient id="sl-2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#DBBBB3" />
          <stop offset="0.5" stopColor="#EBD7D1" />
          <stop offset="1" stopColor="#C4A398" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#sl-1)" />
      <path d="M-20 90C80 40 140 140 240 100S380 40 420 70V200C340 160 280 250 190 220S40 170-20 210z" fill="url(#sl-2)" opacity="0.9" />
      <path d="M-20 230C60 190 150 290 250 250S360 200 420 240V350C340 320 270 400 180 370S50 320-20 350z" fill="#FBF9F6" opacity="0.85" />
      <path d="M-20 370C70 330 140 420 240 390S350 350 420 380V480H-20z" fill="#AD9275" opacity="0.55" />
      <path d="M-20 90C80 40 140 140 240 100S380 40 420 70" fill="none" stroke="#fff" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}
