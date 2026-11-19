# Assets

Every asset in this project, with its source and licence. Nothing is loaded from a third-party host at runtime.

Photographs are generated editorial studies for a fictional salon. They are not pictures of clients, staff, or a real room. Faces are kept out of the frame: the camera sits behind the subject, or the crop is hair, shoulder, tools, or the basin.

## Generated photographs

Made on 2 November 2026 with the Cursor image generator, then resized locally with `sharp` (AVIF and WebP). Master JPEGs live in `assets/source/`. Delivery files live in `public/media/`. The same grade is used throughout: 85mm-style shallow focus, a warm pearl ground, shadows cooled toward sea glass, no text and no logos.

| Delivery name | Source master | What it shows | Used for |
| --- | --- | --- | --- |
| `cover-640`, `cover-768`, `cover-864` | `assets/source/cover-portrait.jpg` | Dark hair in motion, seen from behind | Cover. 640 and 768 are the small-screen candidates (768 is encoded a step tighter, at the size a phone actually paints), 864 the desktop one |
| `colour-864` | `assets/source/colour-braid.jpg` | Chestnut braid with one rose ribbon, no face | Colour spread, contents thumbnail |
| `shears-840` | `assets/source/still-shears.jpg` | Shears, two brushes, a lock of hair on linen | Care cluster, contents thumbnail |
| `bottles-840` | `assets/source/still-bottles.jpg` | Three unlabelled frosted bottles and a dish of oil | Care cluster, contents thumbnail |
| `basin-1100` | `assets/source/still-basin.jpg` | Matte cream basin, linen, a hairpin | Care cluster, journal, contents thumbnail |
| `people-colour-800` | `assets/source/people-colour.jpg` | Honey hair, back of the head | Ione Voss, people opener |
| `people-cut-800` | `assets/source/people-cut.jpg` | A precise dark bob, back of the head | Maren Pell, people index |
| `people-texture-800` | `assets/source/people-texture.jpg` | Dark curls, back of the head | Sable Quinn |
| `people-skin-864` | `assets/source/people-skin.jpg` | Shoulder and neck, hair covering the face | Edith Marlow |

Each delivery name has an `.avif` and a `.webp`. Thumbnails are `thumb-{name}.avif` and `thumb-{name}.webp` at 240 pixels wide, for the contents overlay. The cover is also served at 800 pixels wide for small screens. Source frames were 864 by 1152 (3:4) except the basin, which is 1152 by 864 (4:3), so some filenames keep the encoded width rather than a larger requested width.

Prompt sheet, shared by every picture: fashion editorial photograph, shallow depth of field, seamless warm pearl backdrop close to `#F1ECE8`, soft light, cool grey-green shadows, no text, no logo, no face. Portraits add "seen from behind" or "hair falling forward so the face is hidden". Still lifes add "no people, no hands".

The pictures are original generations for this concept. There is no third-party stock licence because they were not taken from a stock library.

## Fonts (self-hosted, subset to Latin, WOFF2)

| Font | File | Source | Licence |
| --- | --- | --- | --- |
| Bodoni Moda display, static roman (weight 520, optical size 72, Latin) | `app/fonts/BodoniModa-Display.woff2` | Instanced from the variable roman, then subset. Preloaded with `font-display: swap` and a size-adjusted Times fallback | SIL Open Font License 1.1 (`app/fonts/OFL-BodoniModa.txt`) |
| Bodoni Moda cover cut, static (weight 520, optical size 72, glyphs for Nacre and Room only) | `app/fonts/BodoniModa-Cover.woff2`, also inlined in `app/globals.css` | Instanced at the same weight as the display headings, then subset | SIL Open Font License 1.1 |
| Bodoni Moda variable, italic | `app/fonts/BodoniModa-Italic.woff2` | same family, not preloaded | SIL Open Font License 1.1 |
| Jost variable, roman (weight 100 to 900) | `app/fonts/Jost-Roman.woff2` | [google/fonts](https://github.com/google/fonts) `ofl/jost`, subset with `pyftsubset` | SIL Open Font License 1.1 (`app/fonts/OFL-Jost.txt`) |
| Jost variable, italic | `app/fonts/Jost-Italic.woff2` | same family, not preloaded | SIL Open Font License 1.1 |

The cover masthead uses the static Bodoni cut at weight 520, inlined in CSS, so those glyphs match the display headings and do not wait on a second request. The variable roman is preloaded with `font-display: swap` and a size-adjusted Times fallback, so the other pages replace the fallback once the file arrives. Italics and Jost italic stay unpreloaded. On the cover, the italic face is attached after the photograph has painted, so that file does not compete with the cover. The cover photograph is preloaded at 640, 768 and 864 pixels wide.

## Mark

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Letter N favicon | `app/icon.svg` | Original, set in Georgia on a pearl square | Original work |

## Content

All copy, services, prices, hours, the business name, the suburb ("Marlowe Cove"), the street address, the phone number and the email (a reserved `.example` domain) are invented for this fictional concept. The four specialists are fictional characters. There are no reviews, testimonials, awards, ratings, statistics or client logos. Prices, times and the reservation are labelled on the page as demonstration data.
