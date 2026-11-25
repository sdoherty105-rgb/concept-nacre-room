import { stylists } from "./services";

export const STUDIO_URL = "https://offshiftstudio.com.au";
export const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/nacre-room";
export const ENQUIRY_URL = "https://offshiftstudio.com.au/?concept=nacre-room#contact";

export type ContentsEntry = {
  label: string;
  href: string;
  thumb: string;
};

export const contents: ContentsEntry[] = [
  { label: "Cover", href: "/#cover", thumb: "cover" },
  { label: "Colour", href: "/#colour", thumb: "colour" },
  { label: "Cut", href: "/#cut", thumb: "cover" },
  { label: "Care", href: "/#care", thumb: "shears" },
  { label: "The carte", href: "/the-carte", thumb: "bottles" },
  { label: "People", href: "/people", thumb: "people-cut" },
  { label: "Journal", href: "/journal", thumb: "basin" },
  { label: "Reserve", href: "/reserve", thumb: "colour" },
  { label: "Visit", href: "/#visit", thumb: "basin" },
];

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
    kicker: "House note",
    title: "Leaving the face out of the frame",
    deck: "A sitting is private. The page keeps the work and lets the person go home unpictured.",
    paragraphs: [
      "The room keeps faces off the page. A sitting is private, and a photograph of it would spend that privacy. What we publish is the work itself: a line at the nape, a braid, a basin still warm.",
      "This room looks at the hair. The chair faces a wall the colour of pearl, and the mirror is there for you, not for a camera.",
      "The studies in this issue were generated for the concept. They are generated images and do not show clients or promise a result.",
    ],
  },
  {
    slug: "gloss",
    kicker: "House note",
    title: "A gloss sits lightly",
    deck: "Colour should grow out as kindly as it went in.",
    paragraphs: [
      "We paint where the light already falls, then we stop. A gloss is a rinse of tone and leaves your own colour in charge. It should look like the hair remembering a season.",
      "Roots are matched to the month you are actually in. Balayage is brightness placed by hand, meant to still make sense when twelve weeks have passed. A colour that needs a disguise to survive is the wrong colour for that head.",
    ],
  },
  {
    slug: "thursday",
    kicker: "House note",
    title: "Thursday runs long",
    deck: "The late chair is kept for work that should not be hurried.",
    paragraphs: [
      "Thursday is the evening the room stays open. The street goes quiet and the chair does not. Care takes the time it takes: oil, steam, a scalp that has been listened to.",
      "We keep that sitting for the rituals that refuse to fit between other things. The hour is later and slower on purpose.",
    ],
  },
] as const;
