export const SITE = {
  name: "LevelUp LVP",
  tagline: "Premium LVP installation, Greenville SC",
  phoneDisplay: "(864) 555-0123",
  phoneTel: "tel:+18645550123",
  phoneSms: "sms:+18645550123",
  email: "info@leveluplvp.com",
  hours: "Mon–Sat 7:30a–6:00p",
  afterHours: "After-hours qualify 24/7",
  radius: "50-mile radius from Greenville",
  addressLine: "Greenville, South Carolina",
  googleReview:
    "https://www.google.com/maps/search/?api=1&query=LevelUp+LVP+Greenville+SC",
  gbpSearch: "https://www.google.com/search?q=LevelUp+LVP+Greenville+SC",
} as const;

export const PROJECT_TYPES = [
  { value: "residential", label: "Residential home" },
  { value: "commercial", label: "Commercial / property" },
  { value: "new-construction", label: "New construction / builder" },
  { value: "other", label: "Other" },
] as const;

export const TIMELINES = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "bidding", label: "Bidding / 30–90 days" },
  { value: "planning", label: "Just planning" },
] as const;

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "installed", label: "Installed" },
  { value: "lost", label: "Lost" },
] as const;

export const TIERS = [
  {
    id: "good",
    name: "Solid",
    perSqft: 6.25,
    wear: "12–20 mil, waterproof core",
    fit: "Rentals, secondary rooms",
  },
  {
    id: "better",
    name: "Preferred",
    perSqft: 8,
    wear: "20 mil SPC, acoustic pad",
    fit: "Most kitchens, halls, whole-home",
  },
  {
    id: "best",
    name: "Builder / commercial",
    perSqft: 10.5,
    wear: "20–28 mil, glue-down option",
    fit: "High traffic, multifamily, specs",
  },
] as const;

export const ROOM_PRESETS: { label: string; sqft: number }[] = [
  { label: "Kitchen", sqft: 180 },
  { label: "Hall + foyer", sqft: 140 },
  { label: "Primary suite", sqft: 320 },
  { label: "Whole main floor", sqft: 1100 },
  { label: "Townhome spec", sqft: 1400 },
];

export type City = {
  slug: string;
  name: string;
  county: string;
  zip: string;
  drive: string;
  note: string;
};

export const CITIES: City[] = [
  {
    slug: "greenville",
    name: "Greenville",
    county: "Greenville County",
    zip: "29601",
    drive: "Home base",
    note: "West End bungalows, North Main renovations, and downtown condos. Slab moisture is the first reading we take.",
  },
  {
    slug: "greer",
    name: "Greer",
    county: "Greenville County",
    zip: "29650",
    drive: "20 min",
    note: "New construction and BMW-corridor townhomes. Builder punch lists close the same week we start.",
  },
  {
    slug: "taylors",
    name: "Taylors",
    county: "Greenville County",
    zip: "29687",
    drive: "15 min",
    note: "1990s ranches coming off carpet and sheet vinyl. Typical kitchen + hall in 2–3 days.",
  },
  {
    slug: "simpsonville",
    name: "Simpsonville",
    county: "Greenville County",
    zip: "29681",
    drive: "25 min",
    note: "Family homes and occupied renovations. We wrap kitchens so you can cook the next night.",
  },
  {
    slug: "mauldin",
    name: "Mauldin",
    county: "Greenville County",
    zip: "29662",
    drive: "20 min",
    note: "Split-levels and slab ranch floors. Floating LVP over flattened subfloors is the usual spec.",
  },
  {
    slug: "travelers-rest",
    name: "Travelers Rest",
    county: "Greenville County",
    zip: "29690",
    drive: "25 min",
    note: "Cabins and Main Street storefronts. Waterproof core for muddy boots and wet winters.",
  },
  {
    slug: "spartanburg",
    name: "Spartanburg",
    county: "Spartanburg County",
    zip: "29301",
    drive: "45 min",
    note: "Inside the 50-mile radius. Commercial corridors and occupied units after hours.",
  },
];

export const FAQS = [
  {
    q: "Does LVP work on a slab in Upstate humidity?",
    a: "Yes, if the moisture number is honest. We meter the slab, mitigate if it is high, then float or glue per the manufacturer. Skipping that is how floors cup in August.",
  },
  {
    q: "Can you go over existing tile or vinyl?",
    a: "Sometimes. Tile must be sound, flat, and within height at the transitions. If it telegraphs or the doors will not clear, we pull it. We tell you before we start, not after.",
  },
  {
    q: "Floating or glue-down?",
    a: "Homes: floating click-lock with acoustic underlayment is the default. Commercial, stairs, and some builder specs get glue-down. We match the warranty, not a preference.",
  },
  {
    q: "How long is the house a mess?",
    a: "A typical kitchen + hall is 2–3 days on site. Whole-home main floors are 3–5. We work room-by-room so you are not living on subfloor.",
  },
  {
    q: "Do you bring the material?",
    a: "Yes. Coretec, Shaw, Mohawk, and equivalent commercial lines. You can also supply a registered product — we still acclimate and install to spec.",
  },
  {
    q: "What does a site measure include?",
    a: "Square footage, moisture readings, transition list, stair count, and a written range. Twenty minutes. No pitch deck.",
  },
];

export function estimateRange(sqft: number, tierId: string, prep: boolean) {
  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[1];
  const prepAdd = prep ? 1.75 : 0;
  const mid = (tier.perSqft + prepAdd) * sqft;
  return {
    low: Math.round(mid * 0.88),
    high: Math.round(mid * 1.12),
    per: tier.perSqft + prepAdd,
    tier,
  };
}

export function cityBySlug(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

export function weekdaySlots(count = 8) {
  const out: { date: string; label: string; times: string[] }[] = [];
  const cursor = new Date();
  cursor.setHours(9, 0, 0, 0);
  while (out.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day === 0) continue;
    const label = cursor.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const iso = cursor.toISOString().slice(0, 10);
    out.push({
      date: iso,
      label,
      times: day === 6 ? ["9:00 AM", "11:00 AM"] : ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    });
  }
  return out;
}
