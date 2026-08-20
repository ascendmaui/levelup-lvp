export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
};

const KEY = "levelup-lvp-leads";

const SEED: Lead[] = [
  {
    id: "seed-1",
    name: "Maya Ellison",
    email: "maya@ellisonbuilds.com",
    phone: "(864) 555-0142",
    projectType: "new-construction",
    message: "Need LVP for 12-unit townhome spec in Greer. Timeline 4 weeks.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "seed-2",
    name: "Chris Patton",
    email: "cpatton@live.com",
    phone: "(864) 555-0198",
    projectType: "residential",
    message: "Kitchen, hall, and primary suite. About 1,100 sq ft.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
  },
];

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : SEED;
  } catch {
    return SEED;
  }
}

export function saveLead(input: Omit<Lead, "id" | "createdAt">): Lead {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const next = [lead, ...getLeads()];
  localStorage.setItem(KEY, JSON.stringify(next));
  return lead;
}

export const PROJECT_TYPES = [
  { value: "residential", label: "Residential home" },
  { value: "commercial", label: "Commercial / property management" },
  { value: "new-construction", label: "New construction / builder" },
  { value: "other", label: "Other" },
] as const;
