# Nacre Room (concept 04, Issue 01)

A fictional hair and beauty room, designed by [OFF/SHIFT Studio](https://offshiftstudio.com.au) as a portfolio concept. This version is a magazine: a cover, a contents overlay, and spreads, not a brochure with a card grid.

- Slug: `nacre-room`
- Demo URL: https://nacre-room.offshiftstudio.com.au (see "Deployment" below for which version it serves)
- Concept page: https://offshiftstudio.com.au/concepts/nacre-room
- Enquiry link used on every page: https://offshiftstudio.com.au/?concept=nacre-room#contact

> An OFF/SHIFT concept, fictional demonstration. Nacre Room is not a real business. Services, prices, people and the address are invented, and the reservation never sends or stores anything.

## Stack

Next.js 15 (App Router, TypeScript), statically generated, deployable to Cloudflare Workers with `@opennextjs/cloudflare` (`wrangler.jsonc`, worker name `concept-nacre-room`). Plain CSS, self-hosted fonts, no analytics or trackers.

## Deployment

Checked on 10 November 2026.

- Hosting: Cloudflare Workers, worker `concept-nacre-room`, custom domain `nacre-room.offshiftstudio.com.au`.
- Nothing in this repository deploys. `.github/workflows/ci.yml` only lints, typechecks, tests, builds (`next build` and `opennextjs-cloudflare build`) and runs Lighthouse. There is no `wrangler deploy` step and no deploy script runs on push.
- Any Git-connected build lives in the Cloudflare dashboard, not in this repo, so it cannot be read from here. Evidence that branch pushes do not reach production: three commits were pushed to `redesign/2026-11` before this note and the live site still served the older `main` build.
- **What the live URL serves (10 Nov 2026): the pre-redesign `main` build, commit `3d648a8` (PR #2, "editorial salon identity").** It is a single long page with a `/first-visit` route (live `/the-carte` and `/reserve` return 404). The magazine redesign on `redesign/2026-11` (draft PR #3) is **not live**.
- To ship the redesign: review and merge PR #3 into `main`, then deploy `main` with `npm run cf:build && npx wrangler deploy` (or the dashboard build). Afterwards check that `/the-carte` and `/reserve` return 200 and `/first-visit` redirects to `/reserve`.

## Pages

- `/` cover, contents prices (each line opens the reservation), the Colour, Cut and Care spreads, then people, journal, reserve and visit
- `/the-carte` the price list in one column, with dotted leaders
- `/people` four fictional specialists, each composed differently
- `/journal` three house notes
- `/reserve` one question at a time, with a running total

The menu is a full-screen contents list. Without JavaScript it is a link to the contents spread; with JavaScript it is a modal dialog (focus stays inside, Escape closes it and returns focus to Menu, choosing a spread moves focus to that spread). The reservation totals need JavaScript and say so. Prices, hours and times are marked as demonstration data.

Every page carries a showroom slip in its first screen (the fictional-business disclosure, "Back to the concept" and "Want a website like this?"), repeated in the footer. Price lines in the cover contents open the reservation with that ritual already chosen.

noindex everywhere: `<meta name="robots">`, `X-Robots-Tag` (`next.config.ts` and `public/_headers`), `public/robots.txt`.

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

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Pearl | `#F1ECE8` | Page background |
| Ink violet | `#1E1824` | Text, and the dark spreads |
| Oxblood rose | `#8A3A4C` | One loud use on each spread. Text only on pearl or as a solid block with pearl type |
| Sea glass | `#A9C1BB` | Quiet rules and the grade of the photographs |
| Champagne | `#B79C6B` | Hairlines and small labels on ink. Not body text on pearl |

Bodoni Moda is display only, at 20px and above. Body text is Jost.
