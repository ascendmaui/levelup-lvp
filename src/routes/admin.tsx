import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getLeads, type Lead } from "@/lib/leads";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const TYPE_LABEL: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "new-construction": "Builder",
  other: "Other",
};

function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const counts = useMemo(() => {
    return {
      total: leads.length,
      builder: leads.filter((l) => l.projectType === "new-construction").length,
      residential: leads.filter((l) => l.projectType === "residential").length,
    };
  }, [leads]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Ops desk</p>
        <h1 className="font-display text-title font-semibold tracking-tight">Marketing & leads</h1>
        <p className="mt-3 max-w-xl text-fg-muted">
          Incoming quotes, creative notes, and voice-agent scaffolding. Quotes submitted on the site appear here.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Open leads", v: counts.total },
            { k: "Builder", v: counts.builder },
            { k: "Residential", v: counts.residential },
          ].map((stat) => (
            <div key={stat.k} className="rounded-xl border border-line bg-charcoal-elevated p-5">
              <p className="text-xs tracking-wide text-fg-subtle uppercase">{stat.k}</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-oak">{stat.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-charcoal-elevated p-5 lg:col-span-3">
            <h2 className="mb-4 font-display text-heading font-semibold">Recent leads</h2>
            <ul className="space-y-3">
              {leads.map((lead) => (
                <li key={lead.id} className="rounded-lg border border-line bg-charcoal p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-fg">{lead.name}</p>
                    <span className="text-xs text-oak">{TYPE_LABEL[lead.projectType] ?? lead.projectType}</span>
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">
                    {lead.email} · {lead.phone}
                  </p>
                  {lead.message ? <p className="mt-2 text-sm text-fg-subtle">{lead.message}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-line bg-charcoal-elevated p-5">
              <h2 className="mb-3 font-display text-heading font-semibold">Ad creatives</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                Hero stills live in the media library: living room, kitchen, commercial lobby, and install process. Crop with floor-weighted object position (center 68–78%) so Meta and Google placements keep the plank in frame.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-charcoal-elevated p-5">
              <h2 className="mb-3 font-display text-heading font-semibold">xAI voice agents</h2>
              <div className="space-y-4 text-sm text-fg-muted">
                <p>
                  <span className="font-medium text-fg">Lead qualification.</span> Call, score budget/timeline, write a summary.
                </p>
                <p>
                  <span className="font-medium text-fg">Installer interview.</span> Screen crews, rate answers, send follow-up email or text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
