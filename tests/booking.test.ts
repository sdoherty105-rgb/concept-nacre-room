import { describe, expect, it } from "vitest";
import { emptyBooking, validateBooking } from "../lib/booking";

describe("reservation validation", () => {
  it("asks for a service, a name, an email and the demonstration acknowledgement", () => {
    const errors = validateBooking(emptyBooking, false, "2026-11-02");
    expect(errors.service).toMatch(/Choose a service/);
    expect(errors.name).toMatch(/name/);
    expect(errors.email).toMatch(/email/);
    expect(errors.ack).toMatch(/demonstration/);
  });

  it("rejects Mondays and evening slots that are not Thursday", () => {
    const monday = validateBooking({ ...emptyBooking, date: "2026-11-02", window: "morning", ack: true, name: "Ada", email: "ada@example.com" }, true, "2026-11-01");
    expect(monday.date).toMatch(/Sundays and Mondays/);
    const tuesdayEvening = validateBooking(
      { ...emptyBooking, date: "2026-11-03", window: "evening", ack: true, name: "Ada", email: "ada@example.com" },
      true,
      "2026-11-01",
    );
    expect(tuesdayEvening.window).toMatch(/Thursdays only/);
  });
});
