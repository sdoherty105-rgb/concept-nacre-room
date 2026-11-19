const copy = {
  prices: "Demonstration data. Prices on this page are invented for a fictional salon and are not a quote.",
  hours: "Demonstration data. Hours, the address and the open line describe a fictional room.",
  booking: "Demonstration data. Times, prices and this request are not a live booking. Nothing is sent or stored.",
} as const;

export function DemoNote({ kind }: { kind: keyof typeof copy }) {
  return <p className="demo-note">{copy[kind]}</p>;
}
