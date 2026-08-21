import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  projectType: string;
  source: string;
  status: string;
  sqft: number | null;
  rooms: string;
  timeline: string;
  message: string;
  slot: string;
  estimateLow: number | null;
  estimateHigh: number | null;
  notes: string;
  createdAt: string;
};

export type LeadEvent = {
  id: string;
  leadId: string;
  kind: string;
  detail: string;
  createdAt: string;
};

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  zip?: string;
  projectType?: string;
  source?: string;
  sqft?: number | null;
  rooms?: string;
  timeline?: string;
  message?: string;
  slot?: string;
  estimateLow?: number | null;
  estimateHigh?: number | null;
};

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  project_type: string;
  source: string;
  status: string;
  sqft: number | null;
  rooms: string;
  timeline: string;
  message: string;
  slot: string;
  estimate_low: number | null;
  estimate_high: number | null;
  notes: string;
  created_at: string;
};

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    zip: row.zip,
    projectType: row.project_type,
    source: row.source,
    status: row.status,
    sqft: row.sqft,
    rooms: row.rooms,
    timeline: row.timeline,
    message: row.message,
    slot: row.slot,
    estimateLow: row.estimate_low,
    estimateHigh: row.estimate_high,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function newId() {
  return crypto.randomUUID();
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: LeadInput) => input)
  .handler(async ({ data }) => {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();
    if (name.length < 2) throw new Error("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Valid email required.");
    if (phone.replace(/\D/g, "").length < 10) throw new Error("Valid phone required.");

    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = newId();
    const zip = (data.zip ?? "").trim().slice(0, 10);
    const projectType = data.projectType ?? "residential";
    const source = data.source ?? "website";
    const rooms = (data.rooms ?? "").trim();
    const timeline = data.timeline ?? "";
    const message = (data.message ?? "").trim();
    const slot = data.slot ?? "";
    const sqft = data.sqft ?? null;
    const estimateLow = data.estimateLow ?? null;
    const estimateHigh = data.estimateHigh ?? null;

    await sql`
      insert into leads (
        id, name, email, phone, zip, project_type, source, status,
        sqft, rooms, timeline, message, slot, estimate_low, estimate_high
      ) values (
        ${id}, ${name}, ${email}, ${phone}, ${zip}, ${projectType}, ${source}, ${"new"},
        ${sqft}, ${rooms}, ${timeline}, ${message}, ${slot}, ${estimateLow}, ${estimateHigh}
      )
    `;

    const events = [
      { kind: "captured", detail: `Source: ${source}` },
      { kind: "sms_queued", detail: "Text the crew within 5 minutes (wire Twilio to send live)." },
      { kind: "email_queued", detail: "Owner + customer confirmation queued (wire Resend to send live)." },
    ];
    if (slot) events.push({ kind: "booked", detail: slot });

    for (const ev of events) {
      await sql`
        insert into lead_events (id, lead_id, kind, detail)
        values (${newId()}, ${id}, ${ev.kind}, ${ev.detail})
      `;
    }

    return { id, ok: true as const };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<LeadRow>`
      select id, name, email, phone, zip, project_type, source, status, sqft, rooms,
             timeline, message, slot, estimate_low, estimate_high, notes, created_at
      from leads
      order by created_at desc
      limit 100
    `;
    return rows.map(mapLead);
  });

export const listLeadEvents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((leadId: string) => leadId)
  .handler(async ({ data: leadId }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    return sql<LeadEvent>`
      select id, lead_id as "leadId", kind, detail, created_at as "createdAt"
      from lead_events
      where lead_id = ${leadId}
      order by created_at desc
    `;
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; status: string; notes?: string }) => input)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      update leads
      set status = ${data.status},
          notes = coalesce(${data.notes ?? null}, notes),
          updated_at = now()
      where id = ${data.id}
    `;
    await sql`
      insert into lead_events (id, lead_id, kind, detail)
      values (${newId()}, ${data.id}, ${"status"}, ${data.status})
    `;
    return { ok: true as const };
  });
