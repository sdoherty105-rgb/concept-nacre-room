"use client";

import dynamic from "next/dynamic";

const OpenNow = dynamic(() => import("./OpenNow").then((m) => m.OpenNow), { ssr: false });

export function OpenNowLazy() {
  return <OpenNow />;
}
