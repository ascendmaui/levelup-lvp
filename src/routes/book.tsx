import { createFileRoute } from "@tanstack/react-router";
import { BookingCalendar } from "@/components/BookingCalendar";
import { SiteShell } from "@/components/SiteShell";

type BookSearch = { sqft?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): BookSearch => ({
    sqft: typeof s.sqft === "string" ? s.sqft : undefined,
  }),
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a flooring measure | LevelUp LVP Greenville" },
      {
        name: "description",
        content: "Hold a 20-minute on-site measure in Greenville, Greer, Taylors, or Simpsonville. Moisture reading included.",
      },
    ],
  }),
});

function BookPage() {
  const { sqft } = Route.useSearch();
  const n = sqft ? Number(sqft) : undefined;
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Schedule</p>
        <h1 className="font-display text-display leading-[1.05] font-semibold">Twenty minutes. Moisture meter in the truck.</h1>
        <p className="mt-4 max-w-xl text-fg-muted">
          Pick a window. We confirm by text. If you already have a range from the estimator, bring it — we will beat or explain it on site.
        </p>
        <div className="mt-10">
          <BookingCalendar sqft={n && Number.isFinite(n) ? n : undefined} />
        </div>
      </section>
    </SiteShell>
  );
}
