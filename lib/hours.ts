export type DayHours = { day: string; open: number | null; close: number | null; note?: string };

// Minutes from midnight. Indexed Sunday (0) to Saturday (6) to match Date#getDay.
export const weekHours: DayHours[] = [
  { day: "Sunday", open: null, close: null },
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: 9 * 60, close: 18 * 60 },
  { day: "Wednesday", open: 9 * 60, close: 18 * 60 },
  { day: "Thursday", open: 9 * 60, close: 20 * 60, note: "Late night" },
  { day: "Friday", open: 9 * 60, close: 18 * 60 },
  { day: "Saturday", open: 8 * 60, close: 16 * 60 },
];

export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h}${suffix}` : `${h}:${String(m).padStart(2, "0")}${suffix}`;
}

export function isClosedDay(dayIndex: number): boolean {
  return weekHours[dayIndex]?.open === null;
}
