import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/go/builders")({
  component: BuilderLander,
  head: () => ({
    meta: [
      { title: "Builder LVP crews | Greer & Greenville specs" },
      {
        name: "description",
        content:
          "On-schedule luxury vinyl plank for Upstate new construction. Punch list, COI, stairs, and superintendent-friendly closeout.",
      },
    ],
  }),
});

function BuilderLander() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Builders · Greer corridor</p>
          <h1 className="font-display text-display leading-[1.05] font-semibold">
            We do not blow your closing date.
          </h1>
          <p className="mt-5 text-lg text-fg-muted">
            Spec LVP, townhome stacks, and custom punch. Crew sized to the schedule you already sold.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            <li>— COI and W-9 on file before we mobilize.</li>
            <li>— Stairs, reducers, and color-matched noses in the same ticket.</li>
            <li>— Superintendent walk before we leave the keys.</li>
          </ul>
          <Link to="/builders" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-oak">
            Download the builder packet →
          </Link>
          <p className="mt-4 text-sm text-fg-subtle">Office: {SITE.phoneDisplay}</p>
        </div>
        <div className="rounded-xl border border-line-strong bg-charcoal-elevated p-5 sm:p-8">
          <p className="mb-4 text-sm font-medium">Send the spec. We return a window.</p>
          <LeadForm source="builders-ad" cta="Request a builder slot" />
        </div>
      </section>
    </SiteShell>
  );
}
