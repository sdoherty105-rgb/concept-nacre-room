"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { joinMeta } from "@/lib/meta";
import { formatDuration, formatPrice } from "@/lib/planner";
import { CheckIcon } from "./icons/UiIcons";
import { stylistPreferences, timeWindows } from "@/lib/services";
import { isClosedDay } from "@/lib/hours";
import { usePlanner } from "./PlannerProvider";

type Values = {
  name: string;
  email: string;
  phone: string;
  date: string;
  window: string;
  stylist: string;
  notes: string;
  ack: boolean;
};

type Errors = Partial<Record<keyof Values | "service", string>>;

const blank: Values = { name: "", email: "", phone: "", date: "", window: "", stylist: "no-preference", notes: "", ack: false };

const subscribeNoop = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNoop, () => true, () => false);
const useTodayInPerth = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Perth" }),
    () => "",
  );

function weekday(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

function validate(v: Values, hasService: boolean, today: string): Errors {
  const e: Errors = {};
  if (!hasService) e.service = "Choose a service in the planner above so we know what to prepare for.";
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter an email address like name@example.com.";
  if (v.phone.trim() && v.phone.replace(/[^\d]/g, "").length < 8) e.phone = "Enter a phone number with at least 8 digits, or leave it blank.";
  if (!v.date) e.date = "Choose a preferred date.";
  else if (today && v.date < today) e.date = "Choose a date that is today or later.";
  else if (isClosedDay(weekday(v.date))) e.date = "We are closed on Sundays and Mondays. Please choose Tuesday to Saturday.";
  if (!v.window) e.window = "Choose a preferred time.";
  else if (v.window === "evening" && v.date && !e.date && weekday(v.date) !== 4) e.window = "Evening appointments are available on Thursdays only.";
  if (!v.ack) e.ack = "Please confirm you understand this is a demonstration.";
  return e;
}

const fieldOrder: (keyof Errors)[] = ["service", "name", "email", "phone", "date", "window", "ack"];

export function BookingForm() {
  const { summary } = usePlanner();
  const hydrated = useHydrated();
  const today = useTodayInPerth();
  const [values, setValues] = useState<Values>(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Values | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(values, summary.service !== null, today);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    setSubmitted(values);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const reset = () => {
    setSubmitted(null);
    setValues(blank);
    setErrors({});
  };

  const errorEntries = fieldOrder.filter((k) => errors[k]).map((k) => [k, errors[k]!] as const);
  const err = (k: keyof Errors) => (errors[k] ? `${k}-error` : undefined);

  return (
    <section id="book" className="section section-book" aria-labelledby="book-title">
      <div className="container book-grid">
        <div className="book-intro">
          <p className="eyebrow">Booking request</p>
          <h2 id="book-title">Request your appointment</h2>
          <p className="lead">
            Tell us when suits and we would reply to confirm a time. Requests are not confirmed bookings until we
            reply.
          </p>
          <p className="demo-callout">
            <strong>Demonstration only.</strong> This form checks your entries in your browser and shows a result. It
            does not send, store or share anything.
          </p>
        </div>

        <div className="book-card">
          {submitted ? (
            <div ref={successRef} tabIndex={-1} className="success" role="status" data-testid="booking-success">
              <p className="success-mark" aria-hidden="true">
                <CheckIcon />
              </p>
              <h3>Thank you, {submitted.name.trim().split(" ")[0]}. This is a demo.</h3>
              <p>
                Your request was <strong>not sent</strong> anywhere because Nacre Room is a fictional business. On a
                live site, this is where we would confirm your appointment by email.
              </p>
              <dl className="success-summary">
                <div>
                  <dt>Appointment</dt>
                  <dd>
                    {summary.service?.name}
                    {summary.addOns.length > 0 && `, ${summary.addOns.map((a) => a.name).join(", ")}`}
                  </dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>
                    {joinMeta(formatDuration(summary.minutes), formatPrice(summary.price))}
                  </dd>
                </div>
                <div>
                  <dt>Preferred</dt>
                  <dd>
                    {joinMeta(
                      submitted.date,
                      timeWindows.find((t) => t.value === submitted.window)?.label ?? "",
                    )}
                  </dd>
                </div>
              </dl>
              <button type="button" className="btn btn-outline" onClick={reset}>
                Make another demo request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-labelledby="book-title" data-testid="booking-form">
              {errorEntries.length > 0 && (
                <div ref={errorRef} tabIndex={-1} className="error-summary" role="alert">
                  <h3>
                    {errorEntries.length === 1 ? "There is 1 thing to fix" : `There are ${errorEntries.length} things to fix`}
                  </h3>
                  <ul>
                    {errorEntries.map(([k, msg]) => (
                      <li key={k}>
                        <a href={k === "service" ? "#plan" : `#field-${k}`}>{msg}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="your-appointment" id="field-service">
                <h3>Your appointment</h3>
                {summary.service ? (
                  <>
                    <p className="ya-line">
                      <strong>{summary.service.name}</strong>
                      {summary.addOns.length > 0 && (
                        <span>, {summary.addOns.map((a) => a.name).join(", ")}</span>
                      )}
                    </p>
                    <p className="ya-totals">
                      {joinMeta(formatDuration(summary.minutes), formatPrice(summary.price))}
                    </p>
                    <Link href="/#plan" className="text-link">
                      Change selection
                    </Link>
                  </>
                ) : (
                  <p className="ya-line">
                    No service chosen yet.{" "}
                    <Link href="/#plan" className="text-link">
                      Build your appointment
                    </Link>
                  </p>
                )}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="field-name">Full name</label>
                  <input
                    id="field-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={err("name")}
                  />
                  {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="field-email">Email</label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={err("email")}
                  />
                  {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="field-phone">
                    Mobile <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="field-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={err("phone")}
                  />
                  {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
                </div>
                <div className="field">
                  <label htmlFor="field-date">Preferred date</label>
                  <input
                    id="field-date"
                    name="date"
                    type="date"
                    min={today || undefined}
                    value={values.date}
                    onChange={(e) => set("date", e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={`date-hint${errors.date ? " date-error" : ""}`}
                  />
                  <p id="date-hint" className="field-hint">Tuesday to Saturday.</p>
                  {errors.date && <p id="date-error" className="field-error">{errors.date}</p>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="field-window">Preferred time</label>
                  <select
                    id="field-window"
                    name="window"
                    value={values.window}
                    onChange={(e) => set("window", e.target.value)}
                    aria-invalid={Boolean(errors.window)}
                    aria-describedby={err("window")}
                  >
                    <option value="">Choose a time</option>
                    {timeWindows.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {errors.window && <p id="window-error" className="field-error">{errors.window}</p>}
                </div>
                <div className="field">
                  <label htmlFor="field-stylist">Specialist</label>
                  <select
                    id="field-stylist"
                    name="stylist"
                    value={values.stylist}
                    onChange={(e) => set("stylist", e.target.value)}
                  >
                    {stylistPreferences.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="field-notes">
                  Anything we should know <span className="optional">(optional)</span>
                </label>
                <textarea
                  id="field-notes"
                  name="notes"
                  rows={3}
                  value={values.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

              <div className="field field-check">
                <label className="check">
                  <input
                    id="field-ack"
                    name="ack"
                    type="checkbox"
                    checked={values.ack}
                    onChange={(e) => set("ack", e.target.checked)}
                    aria-invalid={Boolean(errors.ack)}
                    aria-describedby={err("ack")}
                  />
                  <span>I understand this is a demonstration and nothing will be sent.</span>
                </label>
                {errors.ack && <p id="ack-error" className="field-error">{errors.ack}</p>}
              </div>

              <button type="submit" className="btn btn-ink btn-block" disabled={!hydrated}>
                Request this appointment
              </button>
              <noscript>
                <p className="fine-print">This demonstration form needs JavaScript to check and show your request.</p>
              </noscript>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
