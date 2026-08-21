import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [{ title: "Reviews | LevelUp LVP Greenville" }],
  }),
});

function ReviewsPage() {
  const draft =
    "LevelUp LVP installed our floors in [city]. Moisture tested, on schedule, kitchen was usable the next night.";

  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Proof</p>
        <h1 className="font-display text-display leading-[1.05] font-semibold">Reviews live on Google, not on this page.</h1>
        <p className="mt-5 text-fg-muted">
          We do not invent five-star quotes. If we finished your floor, the highest-leverage thing you can do is a Google review with a photo of the plank line.
        </p>
        <a
          href={SITE.googleReview}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-oak px-6 font-semibold text-charcoal"
        >
          Leave a Google review
        </a>
        <div className="mt-10 rounded-xl border border-line bg-charcoal-elevated p-5">
          <p className="text-sm font-medium">If you are stuck on what to write</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{draft}</p>
        </div>
        <p className="mt-8 text-sm text-fg-subtle">
          Crew: after closeout, text this link. Ten honest reviews beat any headline we could write.
        </p>
      </section>
    </SiteShell>
  );
}
