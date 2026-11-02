# Nacre Room (concept 04, Issue 01)

A fictional hair and beauty room, designed by [OFF/SHIFT Studio](https://offshiftstudio.com.au) as a portfolio concept. This version is a magazine: a cover, a contents overlay, and spreads, not a brochure with a card grid.

- Slug: `nacre-room`
- Intended demo URL: `nacre-room.offshiftstudio.com.au` (not configured from this branch)
- Concept page: https://offshiftstudio.com.au/concepts/nacre-room

> An OFF/SHIFT concept, fictional demonstration. Nacre Room is not a real business. Services, prices, people and the address are invented, and the reservation never sends or stores anything.

## Stack

Next.js 15 (App Router, TypeScript), statically generated, deployable to Cloudflare Workers with `@opennextjs/cloudflare` (`wrangler.jsonc`, worker name `concept-nacre-room`). Plain CSS, self-hosted fonts, no analytics or trackers. This branch does not deploy.

## Pages

- `/` cover, contents prices, and the Colour, Cut and Care spreads, then the carte, people, journal, reserve and visit
- `/the-carte` the price list in one column, with dotted leaders
- `/people` four fictional specialists, each composed differently
- `/journal` three house notes
- `/reserve` one question at a time, with a running total

The menu is a full-screen contents list. It works without JavaScript, because it is a link to an in-page overlay. The reservation totals need JavaScript and say so. Prices, hours and times are marked as demonstration data.

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
