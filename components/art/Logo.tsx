import { useId } from "react";

export function PearlMark({ size = 28 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#E8D3CC" />
          <stop offset="1" stopColor="#AD9275" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#${id})`} />
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="#6E573B" strokeOpacity="0.5" />
    </svg>
  );
}
