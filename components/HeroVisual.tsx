"use client";

import dynamic from "next/dynamic";

const HeroArt = dynamic(() => import("./art/HeroArt").then((m) => m.HeroArt), {
  ssr: false,
  loading: () => <div className="hero-art-skel" aria-hidden="true" />,
});

export function HeroVisual() {
  return (
    <div className="hero-visual">
      <HeroArt />
    </div>
  );
}
