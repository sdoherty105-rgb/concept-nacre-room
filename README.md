# Nacre Room (concept 05)

A fictional hair and beauty salon website, designed by [OFF/SHIFT Studio](https://offshiftstudio.com.au) as a portfolio concept.

- Slug: `nacre-room`
- Intended demo URL: `nacre-room.offshiftstudio.com.au` (not configured)
- Concept page: https://offshiftstudio.com.au/concepts/nacre-room

> An OFF/SHIFT concept — fictional demonstration. Nacre Room is not a real business. Services, prices, people and the address are invented, and the booking form never sends or stores anything.

## Stack

Next.js 15 (App Router, TypeScript), statically generated, deployable to Cloudflare Workers with `@opennextjs/cloudflare` (`wrangler.jsonc`, worker name `concept-nacre-room`). Plain CSS, self-hosted fonts, no analytics or trackers.

## Pages and features

- `/` hero, services menu with prices and durations, **appointment builder** (service + add-ons, live total time and price), the space and experience, specialists (by speciality only), demo booking request form, hours and location, footer
- `/first-visit` what to expect, how an appointment unfolds, FAQ
- Signature interaction: the builder's selection is shared (React context) with the booking form, so the chosen service, add-ons, total time and price appear in the request
- Progressive enhancement: all content, the menu and prices render without JavaScript; interactive totals and the form need JS and say so
- noindex everywhere: `<meta name="robots">`, `X-Robots-Tag` header (`next.config.ts` and `public/_headers`), `public/robots.txt`

## Scripts

```bash
npm install
npm run dev          # local dev
npm run build && npm run start
npm run lint && npm run typecheck
npm test             # unit (vitest) + end-to-end (Playwright, needs a build)
npm run lhci         # Lighthouse CI, mobile (needs a build)
npm run screens      # regenerate docs/screens (server must be running)
npm run contrast     # WCAG contrast ratios for the palette
npm run cf:build     # OpenNext Cloudflare build (does not deploy)
```

This repository does not deploy anything. Deployment and domain setup are done separately.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Pearl | `#F3EFEA` | Page background |
| Umber | `#554840` | Body text, dark sections |
| Blush | `#DBBBB3` | Soft fills, accents on dark |
| Bronze | `#AD9275` | Decorative lines and accents (never body text on light) |
| Ink | `#24201E` | Headings, primary buttons, dark sections |

Derived tints (`mist`, `pearl-deep`, `blush-soft`, `bronze-deep`) are used for cards and small accent text so every text pairing meets WCAG AA. Run `npm run contrast` for the numbers.
