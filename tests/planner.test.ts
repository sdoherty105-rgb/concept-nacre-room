import { describe, expect, it } from "vitest";
import { addOnsFor, emptySelection, formatDuration, selectService, summarise, toggleAddOn } from "../lib/planner";

describe("planner maths", () => {
  it("is empty until a service is chosen", () => {
    expect(summarise(emptySelection)).toMatchObject({ minutes: 0, price: 0, service: null });
  });

  it("totals time and price for a service plus add-ons", () => {
    let s = selectService(emptySelection, "signature-cut");
    s = toggleAddOn(s, "gloss-finish");
    s = toggleAddOn(s, "take-home");
    const sum = summarise(s);
    expect(sum.minutes).toBe(60 + 15 + 0);
    expect(sum.price).toBe(110 + 40 + 28);
  });

  it("removes add-ons that no longer apply when the service changes", () => {
    let s = selectService(emptySelection, "signature-cut");
    s = toggleAddOn(s, "bond-repair");
    s = selectService(s, "pearl-facial");
    expect(s.addOnIds).toEqual([]);
  });

  it("never offers an add-on that duplicates the chosen service", () => {
    expect(addOnsFor("brow-shape").map((a) => a.id)).not.toContain("brow-tidy");
    expect(addOnsFor("pearl-gloss").map((a) => a.id)).not.toContain("gloss-finish");
  });

  it("formats durations", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(120)).toBe("2 hr");
    expect(formatDuration(195)).toBe("3 hr 15 min");
  });
});
