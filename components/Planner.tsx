"use client";

import Link from "next/link";
import { categories, services } from "@/lib/services";
import { addOnsFor, formatDuration, formatPrice } from "@/lib/planner";
import { usePlanner } from "./PlannerProvider";

export function Planner() {
  const { selection, summary, chooseService, toggleAddOn, reset } = usePlanner();
  const applicable = addOnsFor(selection.serviceId);
  const hasService = summary.service !== null;

  const segments = hasService
    ? [
        { key: summary.service!.id, minutes: summary.service!.minutes, kind: "main" },
        ...summary.addOns.filter((a) => a.minutes > 0).map((a) => ({ key: a.id, minutes: a.minutes, kind: "add" })),
      ]
    : [];

  return (
    <section id="plan" className="section section-plan" aria-labelledby="plan-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Plan your visit</p>
          <h2 id="plan-title">Build your appointment</h2>
          <p className="lead">
            Choose a service, add anything you would like alongside it, and we will total the time and price. Your
            selection carries straight into the booking request.
          </p>
          <noscript>
            <p className="fine-print">
              The live totals need JavaScript. Durations and prices for every service are listed in the menu above.
            </p>
          </noscript>
        </div>

        <div className="plan-grid">
          <div className="plan-steps">
            <p className="plan-mini" aria-hidden="true">
              {hasService ? (
                <>
                  <span className="plan-mini-name">
                    {summary.service!.name}
                    {summary.addOns.length > 0 && ` +${summary.addOns.length}`}
                  </span>
                  <span>
                    {formatDuration(summary.minutes)} · {formatPrice(summary.price)}
                  </span>
                </>
              ) : (
                <span>Your total will appear here</span>
              )}
            </p>
            <div className="plan-step">
              <h3>
                <span className="step-num" aria-hidden="true">1</span> Choose your service
              </h3>
              {categories.map((cat) => (
                <fieldset key={cat.id} className="choice-group">
                  <legend>{cat.name}</legend>
                  <div className="choice-grid">
                    {services
                      .filter((s) => s.category === cat.id)
                      .map((s) => (
                        <label key={s.id} className="choice">
                          <input
                            type="radio"
                            name="service"
                            value={s.id}
                            checked={selection.serviceId === s.id}
                            onChange={() => chooseService(s.id)}
                          />
                          <span className="choice-body">
                            <span className="choice-name">{s.name}</span>
                            <span className="choice-meta">
                              {formatDuration(s.minutes)} · {formatPrice(s.price)}
                            </span>
                          </span>
                        </label>
                      ))}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="plan-step">
              <h3>
                <span className="step-num" aria-hidden="true">2</span> Add anything alongside
              </h3>
              {hasService ? (
                <fieldset className="choice-group">
                  <legend>
                    Add-ons for <span>{summary.service!.name}</span>
                  </legend>
                  <div className="choice-grid">
                    {applicable.map((a) => (
                      <label key={a.id} className="choice">
                        <input
                          type="checkbox"
                          name="addon"
                          value={a.id}
                          checked={selection.addOnIds.includes(a.id)}
                          onChange={() => toggleAddOn(a.id)}
                        />
                        <span className="choice-body">
                          <span className="choice-name">{a.name}</span>
                          <span className="choice-meta">
                            {a.minutes > 0 ? `+${a.minutes} min` : "No extra time"} · +{formatPrice(a.price)}
                          </span>
                          <span className="choice-desc">{a.description}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <p className="empty-note">Choose a service first and we will show the add-ons that suit it.</p>
              )}
            </div>
          </div>

          <aside className="plan-summary" aria-labelledby="summary-title">
            <h3 id="summary-title">Your appointment</h3>
            <div role="status" aria-live="polite" aria-atomic="true">
              {hasService ? (
                <>
                  <ul className="summary-lines">
                    <li>
                      <span>{summary.service!.name}</span>
                      <span>
                        {formatDuration(summary.service!.minutes)} · {formatPrice(summary.service!.price)}
                      </span>
                    </li>
                    {summary.addOns.map((a) => (
                      <li key={a.id}>
                        <span>{a.name}</span>
                        <span>
                          {a.minutes > 0 ? `+${a.minutes} min` : "No extra time"} · +{formatPrice(a.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="timeline" aria-hidden="true">
                    {segments.map((s) => (
                      <span key={s.key} className={`timeline-seg timeline-${s.kind}`} style={{ flexGrow: s.minutes }} />
                    ))}
                  </div>
                  <dl className="totals">
                    <div>
                      <dt>Total time</dt>
                      <dd data-testid="total-time">{formatDuration(summary.minutes)}</dd>
                    </div>
                    <div>
                      <dt>Total price</dt>
                      <dd data-testid="total-price">{formatPrice(summary.price)}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <p className="empty-note">Nothing chosen yet. Pick a service to see your total time and price.</p>
              )}
            </div>
            <div className="summary-actions">
              <Link href="/#book" className="btn btn-ink btn-block">
                {hasService ? "Request this appointment" : "Go to booking request"}
              </Link>
              {hasService && (
                <button type="button" className="btn-text" onClick={reset}>
                  Start again
                </button>
              )}
            </div>
            <p className="fine-print">Indicative, invented prices. Final timing is confirmed at consultation.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
