import type { Metadata } from "next";
import { PlannerIsland } from "@/components/PlannerIsland";

export const metadata: Metadata = {
  title: "Reserve",
  description:
    "A demonstration reservation for Nacre Room, a fictional salon. One question at a time. Nothing is sent or stored.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function ReservePage() {
  return <PlannerIsland />;
}
