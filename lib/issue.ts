import { stylists, type CategoryId } from "./services";

export const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/nacre-room";
export const ENQUIRY_URL = "https://offshiftstudio.com.au/?concept=nacre-room#contact";

export type ContentsEntry = {
  n: string;
  label: string;
  href: string;
  thumb: string;
};

export const contents: ContentsEntry[] = [
  { n: "01", label: "Cover", href: "/#cover", thumb: "cover" },
  { n: "02", label: "Colour", href: "/#colour", thumb: "colour" },
  { n: "03", label: "Cut", href: "/#cut", thumb: "cover" },
  { n: "04", label: "Care", href: "/#care", thumb: "shears" },
  { n: "05", label: "The carte", href: "/the-carte", thumb: "bottles" },
  { n: "06", label: "People", href: "/people", thumb: "people-cut" },
  { n: "07", label: "Journal", href: "/journal", thumb: "basin" },
  { n: "08", label: "Reserve", href: "/reserve", thumb: "colour" },
  { n: "09", label: "Visit", href: "/#visit", thumb: "basin" },
];

export const categoryPage: Record<CategoryId, string> = {
  hair: "10",
  colour: "11",
  treatments: "12",
  beauty: "13",
};

export const people = [
  {
    id: "colour" as const,
    name: "Ione Voss",
    anchor: "ione",
    image: "people-colour" as const,
    alt: "The back of a head of honey hair, face turned away, on a pearl ground.",
  },
  {
    id: "cut" as const,
    name: "Maren Pell",
    anchor: "maren",
    image: "people-cut" as const,
    alt: "The back of a precise dark bob, face turned away, on a pearl ground.",
  },
  {
    id: "texture" as const,
    name: "Sable Quinn",
    anchor: "sable",
    image: "people-texture" as const,
    alt: "The back of a head of dark curls, face turned away, on a pearl ground.",
  },
  {
    id: "skin" as const,
    name: "Edith Marlow",
    anchor: "edith",
    image: "people-skin" as const,
    alt: "A shoulder and neck, dark hair falling forward so the face stays hidden, on a pearl ground.",
  },
];

export function personRecord(id: (typeof people)[number]["id"]) {
  const profile = people.find((p) => p.id === id);
  const stylist = stylists.find((s) => s.id === id);
  if (!profile || !stylist) throw new Error(`Missing person ${id}`);
  return { ...stylist, ...profile };
}

export const essays = [
  {
    slug: "frame",
    kicker: "Note 01",
    title: "Leaving the face out of the frame",
    deck: "A sitting is private. The page keeps the work and lets the person go home unpictured.",
    paragraphs: [
      "The room keeps faces off the page. A sitting is private, and a photograph of it would spend that privacy. What we publish is the work itself: a line at the nape, a braid, a basin still warm.",
      "If you want to be looked at, there are other rooms. This one looks at the hair. The chair faces a wall the colour of pearl, and the mirror is there for you, not for a camera.",
      "The studies in this issue were generated for the concept. They are not clients, and they are not a promise of a result.",
    ],
  },
  {
    slug: "gloss",
    kicker: "Note 02",
    title: "A gloss is not a costume",
    deck: "Colour should grow out as kindly as it grew in.",
    paragraphs: [
      "We paint where the light already falls, then we stop. A gloss is a rinse of tone, not a new identity. It should look like the hair remembering a season, not like a decision made in a hurry.",
      "Roots are matched to the month you are actually in. Balayage is brightness placed by hand, meant to still make sense when twelve weeks have passed. If a colour needs a disguise to survive, it is the wrong colour.",
    ],
  },
  {
    slug: "thursday",
    kicker: "Note 03",
    title: "Thursday runs long",
    deck: "The late chair is kept for work that should not be hurried.",
    paragraphs: [
      "Thursday is the evening the room stays open. The street goes quiet and the chair does not. Care takes the time it takes: oil, steam, a scalp that has been listened to.",
      "We keep that sitting for the rituals that refuse to fit between other things. Nothing about the hour is a performance. It is simply later, and slower, on purpose.",
    ],
  },
] as const;
