import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { checkAdminAccess, listLeads, updateLeadStatus, type Lead } from "@/lib/leads";
import { LEAD_STATUSES } from "@/lib/site";
import { SiteShell } from "@/components/SiteShell";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
});

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [access, setAccess] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    checkAdminAccess()
      .then(() => {
        if (cancelled) return;
        setAccess("allowed");
        return listLeads().then((rows) => {
          if (!cancelled) setLeads(rows);
        });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        if (e instanceof Error && (e.message === "Forbidden" || e.message === "Unauthorized")) {
          setAccess("denied");
        } else {
          setAccess("denied");
          setError(e instanceof Error ? e.message : "Could not load leads");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const counts = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      scheduled: leads.filter((l) => l.status === "scheduled" || Boolean(l.slot)).length,
    };
  }, [leads]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn to="/login" />;
  if (access !== "allowed") {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          {access === "checking" ? (
            <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
          ) : (
            <p className="text-fg-muted">Not authorized.</p>
          )}
        </div>
      </SiteShell>
    );
  }

  async function setStatus(id: string, status: string) {
    await updateLeadStatus({ data: { id, status } });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Ops desk</p>
        <h1 className="font-display text-title font-semibold tracking-tight">Pipeline</h1>
        <p className="mt-3 max-w-xl text-fg-muted">
          Every quote, measure, and night-desk book lands here. Wire Resend + Twilio to make the queued SMS/email actually leave the building.
        </p>
        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Leads", v: counts.total },
            { k: "New", v: counts.new },
            { k: "Windows held", v: counts.scheduled },
          ].map((stat) => (
            <div key={stat.k} className="rounded-xl border border-line bg-charcoal-elevated p-5">
              <p className="text-xs tracking-wide text-fg-subtle uppercase">{stat.k}</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-oak">{stat.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-charcoal-elevated text-xs tracking-wide text-fg-subtle uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Who</th>
                <th className="px-4 py-3 font-medium">Job</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-fg-muted">
                    No leads yet. Submit a quote on the site.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-line">
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-fg">{lead.name}</p>
                      <p className="text-fg-muted">
                        {lead.phone}
                        {lead.zip ? ` · ${lead.zip}` : ""}
                      </p>
                      <p className="text-xs text-fg-subtle">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 align-top text-fg-muted">
                      {lead.rooms || lead.projectType}
                      {lead.sqft ? ` · ${lead.sqft} sf` : ""}
                      {lead.slot ? (
                        <span className="mt-1 block text-oak">{lead.slot}</span>
                      ) : null}
                      {lead.estimateLow && lead.estimateHigh ? (
                        <span className="block text-xs">
                          ${lead.estimateLow.toLocaleString()}–${lead.estimateHigh.toLocaleString()}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top text-fg-subtle">{lead.source}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-wrap gap-1">
                        {LEAD_STATUSES.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => void setStatus(lead.id, s.value)}
                            className={cn(
                              "rounded-full border px-2 py-1 text-[11px]",
                              lead.status === s.value
                                ? "border-oak bg-oak text-charcoal"
                                : "border-line text-fg-subtle",
                            )}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/go/homeowners" className="rounded-xl border border-line p-5 text-sm text-fg-muted hover:border-oak">
            Homeowner lander for Meta / LSA
          </Link>
          <Link to="/go/builders" className="rounded-xl border border-line p-5 text-sm text-fg-muted hover:border-oak">
            Builder lander for Google
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
