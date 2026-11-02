"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { categories, services, stylistPreferences, timeWindows, type CategoryId } from "@/lib/services";
import { addOnsFor, findService, formatDuration, formatPrice } from "@/lib/planner";
import { joinMeta } from "@/lib/meta";
import { emptyBooking, validateBooking, type BookingErrors, type BookingValues } from "@/lib/booking";
import { usePlanner } from "./PlannerProvider";
import { DemoNote } from "./DemoNote";
import { Imprint } from "./Imprint";

const questions = [
  "Which practice shall we open?",
  "Which ritual shall we set?",
  "Anything alongside it?",
  "Who should see you?",
  "When shall we hold the chair?",
  "How should we address the note?",
];

const subscribeNoop = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNoop, () => true, () => false);
const useTodayInPerth = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Perth" }),
    () => "",
  );

export function Planner() {
  const { selection, summary, chooseService, toggleAddOn, reset } = usePlanner();
  const hydrated = useHydrated();
  const today = useTodayInPerth();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [values, setValues] = useState<BookingValues>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState<BookingValues | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const firstFocus = useRef(true);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const id = new URLSearchParams(window.location.search).get("service");
    const service = findService(id);
    if (!service) return;
    chooseService(service.id);
    setCategory(service.category);
    setStep(1);
  }, [chooseService]);

  useEffect(() => {
    if (firstFocus.current) {
      firstFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, submitted]);

  const setField = <K extends keyof BookingValues>(key: K, value: BookingValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key as keyof BookingErrors]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const showErrors = (found: BookingErrors) => {
    const live = Object.fromEntries(Object.entries(found).filter(([, message]) => message)) as BookingErrors;
    setErrors(live);
    if (Object.keys(live).length > 0) {
      requestAnimationFrame(() => errorRef.current?.focus());
      return true;
    }
    return false;
  };

  const onContinue = () => {
    if (step === 0 && !category) {
      showErrors({ service: "Choose a practice." });
      return;
    }
    if (step === 1 && !selection.serviceId) {
      showErrors({ service: "Choose a service." });
      return;
    }
    if (step === 4) {
      const found = validateBooking(values, summary.service !== null, today);
      const partial: BookingErrors = {};
      if (found.date) partial.date = found.date;
      if (found.window) partial.window = found.window;
      if (showErrors(partial)) return;
    }
    setErrors({});
    setStep((current) => Math.min(questions.length - 1, current + 1));
  };

  const onBack = () => {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateBooking(values, summary.service !== null, today);
    if (showErrors(found)) return;
    setSubmitted(values);
  };

  const applicable = addOnsFor(selection.serviceId);
  const summaryLine = summary.service
    ? [
        summary.service.name,
        ...summary.addOns.map((addOn) => addOn.name),
        formatDuration(summary.minutes),
        formatPrice(summary.price),
      ].join(", ")
    : "Your total will appear here.";

  const errorEntries = Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <section className="reserve opener" aria-labelledby="reserve-question">
      <form className="reserve-form" data-testid="booking-form" noValidate onSubmit={onSubmit}>
        {submitted ? (
          <div className="reserve-body" data-testid="booking-success" tabIndex={-1} ref={headingRef}>
            <p className="kicker">
              Question closed, <span className="accent">demonstration</span>
            </p>
            <h1 id="reserve-question">Noted, and not sent.</h1>
            <p>This is a demo. The request was not sent and was not stored.</p>
            <p>{summaryLine}</p>
            <p>
              {submitted.name}, {submitted.email}
              {submitted.date ? `, ${submitted.date}` : ""}
            </p>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                reset();
                setValues(emptyBooking);
                setCategory(null);
                setSubmitted(null);
                setStep(0);
              }}
            >
              Start again
            </button>
          </div>
        ) : (
          <div className="reserve-body">
            <p className="kicker">
              Question <span className="accent">{step + 1}</span> of {questions.length}
            </p>
            <h1 id="reserve-question" tabIndex={-1} ref={headingRef}>
              {questions[step]}
            </h1>
            <DemoNote kind="booking" />
            {errorEntries.length > 0 ? (
              <div className="error-summary" role="alert" tabIndex={-1} ref={errorRef}>
                <p>The note needs a correction.</p>
                <ul>
                  {errorEntries.map(([key, message]) => (
                    <li key={key}>
                      <a href={`#field-${key}`}>{message}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {step === 0 ? (
              <fieldset id="field-service" aria-labelledby="reserve-question">
                <legend className="sr-only">{questions[0]}</legend>
                <div className="choice-list">
                  {categories.map((item) => (
                    <label key={item.id} className="choice">
                      <input
                        type="radio"
                        name="practice"
                        value={item.id}
                        checked={category === item.id}
                        onChange={() => {
                          setCategory(item.id);
                          reset();
                          setErrors({});
                        }}
                      />
                      <span className="choice-copy">
                        <span className="choice-name">{item.name}</span>
                        <span className="choice-meta">{item.blurb}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <fieldset id="field-service" aria-labelledby="reserve-question">
                <legend className="sr-only">{questions[1]}</legend>
                <div className="choice-list">
                  {services
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <label key={service.id} className="choice">
                        <input
                          id={selection.serviceId === service.id ? "field-service" : undefined}
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={selection.serviceId === service.id}
                          onChange={() => {
                            chooseService(service.id);
                            setErrors({});
                          }}
                        />
                        <span className="choice-copy">
                          <span className="choice-name">{service.name}</span>
                          <span className="choice-meta">{joinMeta(formatDuration(service.minutes), formatPrice(service.price))}</span>
                        </span>
                      </label>
                    ))}
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset aria-labelledby="reserve-question">
                <legend className="sr-only">{questions[2]}</legend>
                {applicable.length === 0 ? (
                  <p>Nothing further sits alongside this ritual.</p>
                ) : (
                  <div className="choice-list">
                    {applicable.map((addOn) => (
                      <label key={addOn.id} className="choice">
                        <input
                          type="checkbox"
                          name="addon"
                          value={addOn.id}
                          checked={selection.addOnIds.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                        />
                        <span className="choice-copy">
                          <span className="choice-name">{addOn.name}</span>
                          <span className="choice-meta">
                            {joinMeta(
                              addOn.minutes > 0 ? `${addOn.minutes} min extra` : "No extra time",
                              `add ${formatPrice(addOn.price)}`,
                            )}
                          </span>
                          <span className="choice-meta">{addOn.description}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
            ) : null}

            {step === 3 ? (
              <fieldset aria-labelledby="reserve-question">
                <legend className="sr-only">{questions[3]}</legend>
                <div className="choice-list">
                  {stylistPreferences.map((pref) => (
                    <label key={pref.value} className="choice">
                      <input
                        type="radio"
                        name="stylist"
                        value={pref.value}
                        checked={values.stylist === pref.value}
                        onChange={() => setField("stylist", pref.value)}
                      />
                      <span className="choice-copy">
                        <span className="choice-name">{pref.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 4 ? (
              <fieldset aria-labelledby="reserve-question" className="when-fields">
                <legend className="sr-only">{questions[4]}</legend>
                <div className="field">
                  <label htmlFor="field-date">Preferred date</label>
                  <input
                    id="field-date"
                    type="date"
                    name="date"
                    value={values.date}
                    min={today || undefined}
                    aria-invalid={errors.date ? true : undefined}
                    onChange={(event) => setField("date", event.target.value)}
                  />
                </div>
                <div className="choice-list" id="field-window" role="group" aria-labelledby="time-label">
                  <p id="time-label" className="field-label">
                    Preferred time
                  </p>
                  {timeWindows.map((slot) => (
                    <label key={slot.value} className="choice">
                      <input
                        id={values.window === slot.value ? "field-window" : undefined}
                        type="radio"
                        name="window"
                        value={slot.value}
                        checked={values.window === slot.value}
                        onChange={() => setField("window", slot.value)}
                      />
                      <span className="choice-copy">
                        <span className="choice-name">{slot.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 5 ? (
              <fieldset aria-labelledby="reserve-question" className="reach-fields">
                <legend className="sr-only">{questions[5]}</legend>
                <div className="field">
                  <label htmlFor="field-name">Full name</label>
                  <input
                    id="field-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={errors.name ? true : undefined}
                    onChange={(event) => setField("name", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="field-email">Email</label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={errors.email ? true : undefined}
                    onChange={(event) => setField("email", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="field-phone">Mobile</label>
                  <input
                    id="field-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    aria-invalid={errors.phone ? true : undefined}
                    onChange={(event) => setField("phone", event.target.value)}
                  />
                  <p className="field-hint">Optional. Leave it blank if you prefer the note by email.</p>
                </div>
                <div className="field">
                  <label htmlFor="field-notes">A note, if you wish</label>
                  <textarea
                    id="field-notes"
                    name="notes"
                    rows={3}
                    value={values.notes}
                    onChange={(event) => setField("notes", event.target.value)}
                  />
                </div>
                <label className="ack" htmlFor="field-ack">
                  <input
                    id="field-ack"
                    type="checkbox"
                    name="ack"
                    checked={values.ack}
                    aria-invalid={errors.ack ? true : undefined}
                    onChange={(event) => setField("ack", event.target.checked)}
                  />
                  <span>I understand this is a demonstration and nothing will be sent.</span>
                </label>
              </fieldset>
            ) : null}

            <div className="reserve-actions">
              {step > 0 ? (
                <button type="button" className="text-button" onClick={onBack}>
                  Back
                </button>
              ) : null}
              {step < questions.length - 1 ? (
                <button type="button" className="text-button primary-action" onClick={onContinue} disabled={!hydrated}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="text-button primary-action" disabled={!hydrated}>
                  Request this appointment
                </button>
              )}
            </div>
          </div>
        )}

        <p className="running" role="status" aria-live="polite" data-testid="running-summary">
          {summary.service ? (
            <>
              <span>{summary.service.name}</span>
              {summary.addOns.length > 0 ? <span>{summary.addOns.map((addOn) => addOn.name).join(", ")}</span> : null}
              <span data-testid="total-time">{formatDuration(summary.minutes)}</span>
              <span data-testid="total-price">{formatPrice(summary.price)}</span>
            </>
          ) : (
            <span>Your total will appear here.</span>
          )}
        </p>
      </form>
      <noscript>
        <div className="noscript-note">
          <p>
            Demonstration data. The question by question reservation needs JavaScript. Nothing would be sent either way.
            Prices are printed on the carte.
          </p>
          <button type="button" disabled>
            Request this appointment
          </button>
        </div>
      </noscript>
      <Imprint />
    </section>
  );
}
