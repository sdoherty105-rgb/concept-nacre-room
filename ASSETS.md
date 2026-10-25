# Assets

Every asset in this project, with its source and licence. Nothing is loaded from a third-party host at runtime.

## Imagery

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Hero pearl-in-arch illustration | `components/art/HeroArt.tsx` | Original inline SVG drawn for this concept by OFF/SHIFT Studio | Original work, no third-party licence |
| Space tiles: arched mirror, product bottles, ripples, linen folds | `components/art/SpaceArt.tsx` | Original inline SVG drawn for this concept | Original work |
| Specialist glyphs (colour, cut, texture, skin) | `components/art/StylistGlyphs.tsx` | Original inline SVG drawn for this concept | Original work |
| Pearl logo mark, favicon | `components/art/Logo.tsx`, `app/icon.svg` | Original inline SVG | Original work |
| Stylised street map | `components/Visit.tsx` | Original inline SVG. Not a real map and not based on real map data | Original work |

No photographs are used. No images of people or faces appear anywhere on the site.

## Fonts (self-hosted, subset to Latin, WOFF2)

| Font | File | Source | Licence |
| --- | --- | --- | --- |
| DM Serif Display (Regular 400, Latin subset) | `app/fonts/DMSerifDisplay-Latin.woff2` (subset from `DMSerifDisplay-Regular.woff2` with `pyftsubset`, U+0020–007F) | Google Fonts, via the Fontsource npm package `@fontsource/dm-serif-display` | SIL Open Font License 1.1 (`app/fonts/LICENSE-DMSerifDisplay.txt`) |
| Plus Jakarta Sans (variable, 200 to 800) | `app/fonts/PlusJakartaSans-Variable.woff2` | Google Fonts, via the Fontsource npm package `@fontsource-variable/plus-jakarta-sans` | SIL Open Font License 1.1 (`app/fonts/LICENSE-PlusJakartaSans.txt`) |

Fonts are loaded through `next/font/local`, so they are served from this site's own origin.

## Content

All copy, services, prices, hours, the business name, the suburb ("Marlowe Cove"), the street address, the phone number and the email (a reserved `.example` domain) are invented for this fictional concept. There are no reviews, testimonials, awards, ratings, statistics or client logos.
