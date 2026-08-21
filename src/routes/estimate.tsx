import { createFileRoute } from "@tanstack/react-router";
import { Estimator } from "@/components/Estimator";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/estimate")({
  component: EstimatePage,
  head: () => ({
    meta: [
      { title: "LVP installed cost Greenville SC | LevelUp LVP" },
      {
        name: "description",
        content:
          "Installed luxury vinyl plank ranges for Greenville, Greer, and Taylors. $5–$12 per sq ft depending on product and prep. Book a 20-minute measure to lock the number.",
      },
    ],
  }),
});

function EstimatePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Estimator</p>
        <h1 className="font-display text-display leading-[1.05] font-semibold">A range, not a pitch.</h1>
        <p className="mt-4 max-w-xl text-fg-muted">
          Local installed LVP in the Upstate typically lands $5–$9 per sq ft for standard homes. Use this to sanity-check the budget, then we meter the slab.
        </p>
        <div className="mt-10 rounded-xl border border-line bg-charcoal-elevated p-5 sm:p-8">
          <Estimator />
        </div>
      </section>
    </SiteShell>
  );
}
