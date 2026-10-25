export type CategoryId = "hair" | "colour" | "treatments" | "beauty";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
};

export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  minutes: number;
  price: number;
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  minutes: number;
  price: number;
  appliesTo: CategoryId[];
  excludes?: string[];
};

export const categories: Category[] = [
  { id: "hair", name: "Cut & Style", blurb: "Shape, movement and finish, tailored to how you live." },
  { id: "colour", name: "Colour", blurb: "Root retouches, gloss and hand-painted colour." },
  { id: "treatments", name: "Hair & Scalp Rituals", blurb: "Scalp care, conditioning and repair treatments." },
  { id: "beauty", name: "Brows, Lashes & Skin", blurb: "Shaping, tinting, lash lifts and facial treatments." },
];

export const services: Service[] = [
  { id: "signature-cut", category: "hair", name: "Signature Cut & Finish", description: "Consultation, a restorative wash, a precision cut and a blow-dry finish.", minutes: 60, price: 110 },
  { id: "blow-wave", category: "hair", name: "Blow-wave", description: "A wash and a polished, long-wearing finish. Smooth, bouncy or sleek.", minutes: 45, price: 70 },
  { id: "restyle", category: "hair", name: "Restyle Consultation & Cut", description: "An unhurried conversation, a full restyle and a finish you can recreate at home.", minutes: 90, price: 155 },
  { id: "fringe-trim", category: "hair", name: "Fringe & Contour Trim", description: "A quick, precise refresh between cuts. No wash or finish.", minutes: 20, price: 35 },

  { id: "root-retouch", category: "colour", name: "Root Retouch", description: "A seamless, tone-matched root application with a gloss rinse and finish.", minutes: 90, price: 140 },
  { id: "pearl-gloss", category: "colour", name: "Pearl Gloss & Tone", description: "A translucent gloss that refreshes tone and adds mirror-like shine.", minutes: 60, price: 120 },
  { id: "soft-balayage", category: "colour", name: "Soft Balayage", description: "Hand-painted, blended brightness with a toned and styled finish.", minutes: 180, price: 320 },

  { id: "scalp-ritual", category: "treatments", name: "Scalp Ritual", description: "Exfoliating cleanse, warm-oil massage and steam for a calm, clear scalp.", minutes: 45, price: 90 },
  { id: "deep-conditioning", category: "treatments", name: "Deep Conditioning Ritual", description: "A mask matched to your hair, worked in with heat and a gentle blow-dry.", minutes: 45, price: 80 },

  { id: "brow-shape", category: "beauty", name: "Brow Shape & Tint", description: "Mapped, shaped and softly tinted to frame the face naturally.", minutes: 30, price: 60 },
  { id: "lash-lift", category: "beauty", name: "Lash Lift & Tint", description: "A gentle curl and a deepened tint for a bright, awake look.", minutes: 60, price: 120 },
  { id: "express-facial", category: "beauty", name: "Luminous Express Facial", description: "Cleanse, exfoliate, mask and massage for an immediate glow.", minutes: 45, price: 95 },
  { id: "pearl-facial", category: "beauty", name: "Signature Pearl Facial", description: "Our longest skin ritual: double cleanse, enzyme polish, massage and a hydrating mask.", minutes: 75, price: 165 },
];

export const addOns: AddOn[] = [
  { id: "gloss-finish", name: "Gloss finish", description: "A shine-boosting, tone-refreshing rinse.", minutes: 15, price: 40, appliesTo: ["hair", "colour"], excludes: ["pearl-gloss"] },
  { id: "bond-repair", name: "Bond repair mask", description: "Strengthening treatment, left on while you relax.", minutes: 20, price: 45, appliesTo: ["hair", "colour"] },
  { id: "styled-blowdry", name: "Styled blow-dry", description: "A full, polished finish to take you out the door.", minutes: 30, price: 55, appliesTo: ["colour", "treatments"], excludes: ["soft-balayage"] },
  { id: "scalp-massage", name: "Scalp massage", description: "Ten slow minutes with warm oil.", minutes: 10, price: 25, appliesTo: ["hair", "colour", "treatments"], excludes: ["scalp-ritual"] },
  { id: "brow-tidy", name: "Brow tidy", description: "A light clean-up and shape.", minutes: 15, price: 25, appliesTo: ["hair", "colour", "beauty"], excludes: ["brow-shape"] },
  { id: "lash-tint", name: "Lash tint", description: "Deepens natural lashes without mascara.", minutes: 15, price: 30, appliesTo: ["beauty"], excludes: ["lash-lift"] },
  { id: "hand-massage", name: "Hand & arm massage", description: "A restorative, aromatic finish.", minutes: 10, price: 25, appliesTo: ["treatments", "beauty"] },
  { id: "take-home", name: "Take-home care set", description: "Travel-size products matched to your visit.", minutes: 0, price: 28, appliesTo: ["hair", "colour", "treatments", "beauty"] },
];

export const stylists = [
  {
    id: "colour",
    role: "The Colourist",
    speciality: "Lived-in blondes, gloss and tone",
    description: "Soft, dimensional colour that grows out gracefully. Expect a slow consultation and a plan for the months after your visit.",
    bestFor: ["Balayage", "Pearl gloss", "Root retouch"],
  },
  {
    id: "cut",
    role: "The Cutter",
    speciality: "Precision shape and restyling",
    description: "Cutting that moves well on the first day and the fifth. Strong on fringes, bobs and long layers.",
    bestFor: ["Signature cut", "Restyle", "Fringe & contour"],
  },
  {
    id: "texture",
    role: "The Texture Specialist",
    speciality: "Curls, waves and restorative care",
    description: "Work with natural pattern and fibre health: dry cuts, bond repair, conditioning and scalp rituals.",
    bestFor: ["Scalp ritual", "Deep conditioning", "Blow-wave"],
  },
  {
    id: "skin",
    role: "The Skin & Brow Therapist",
    speciality: "Facials, brows and lashes",
    description: "Calm, careful treatments for skin and framing details, with a gentle hand and honest advice.",
    bestFor: ["Pearl facial", "Brow shape & tint", "Lash lift"],
  },
] as const;

export const stylistPreferences = [
  { value: "no-preference", label: "No preference" },
  ...stylists.map((s) => ({ value: s.id, label: `${s.role}: ${s.speciality}` })),
];

export const timeWindows = [
  { value: "morning", label: "Morning (9am to 12pm)" },
  { value: "midday", label: "Midday (12pm to 3pm)" },
  { value: "afternoon", label: "Afternoon (3pm to 6pm)" },
  { value: "evening", label: "Evening, Thursdays only (6pm to 8pm)" },
  { value: "flexible", label: "I'm flexible" },
];

