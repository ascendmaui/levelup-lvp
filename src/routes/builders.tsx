import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/builders")({
  component: BuilderPacket,
  head: () => ({
    meta: [{ title: "Builder packet | LevelUp LVP" }],
  }),
});

function BuilderPacket() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 print:max-w-none print:px-0 print:py-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-oak uppercase">LevelUp LVP · Greenville SC</p>
            <h1 className="mt-2 font-display text-title font-semibold">Builder & GC packet</h1>
            <p className="mt-2 text-sm text-fg-muted">Print or save as PDF from the browser. COI issued per job.</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full bg-oak px-4 text-sm font-semibold text-charcoal print:hidden"
          >
            Print / PDF
          </button>
        </div>

        <section className="mt-10 space-y-4 text-sm leading-relaxed text-fg-muted">
          <h2 className="font-display text-heading font-semibold text-fg">Scope we own</h2>
          <p>
            Luxury vinyl plank — floating click-lock or glue-down — including underlayment, reducers, stair noses, and color-matched transitions. Moisture readings recorded on the ticket before the first carton is opened.
          </p>
          <h2 className="font-display text-heading font-semibold text-fg">SLA</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Quote returned within one business day of a complete spec.</li>
            <li>Single-family spec: typical 3–5 day on-site window.</li>
            <li>Multifamily: phased, after-hours available.</li>
            <li>Punch list closed before final draw.</li>
          </ul>
          <h2 className="font-display text-heading font-semibold text-fg">Insurance & paperwork</h2>
          <p>
            General liability and workers’ comp. COI naming the GC as additional insured, W-9, and manufacturer warranties (Shaw / Coretec / Mohawk as specified). Certificates are issued per project — they are not posted as a public JPEG.
          </p>
          <h2 className="font-display text-heading font-semibold text-fg">Contact</h2>
          <p>
            {SITE.name} · {SITE.phoneDisplay} · {SITE.email} · {SITE.addressLine} · {SITE.radius}
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
