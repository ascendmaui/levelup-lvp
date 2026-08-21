import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CITIES } from "@/lib/site";

export const Route = createFileRoute("/areas/")({
  component: AreasIndex,
  head: () => ({
    meta: [
      { title: "LVP installation service area | Greenville SC & Upstate" },
      {
        name: "description",
        content:
          "LevelUp LVP installs luxury vinyl plank in Greenville, Greer, Taylors, Simpsonville, Mauldin, Travelers Rest, and Spartanburg — 50-mile radius.",
      },
    ],
  }),
});

function AreasIndex() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Service area</p>
        <h1 className="max-w-3xl font-display text-display leading-[1.05] font-semibold">
          Greenville is home. The Upstate is the map.
        </h1>
        <p className="mt-4 max-w-xl text-fg-muted">
          Fifty miles from downtown. If the slab is in that circle, we will meter it.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              to="/areas/$city"
              params={{ city: city.slug }}
              className="rounded-xl border border-line bg-charcoal-elevated p-5 transition-colors duration-150 hover:border-oak"
            >
              <p className="font-display text-heading font-semibold">{city.name}</p>
              <p className="mt-1 text-xs text-oak">
                {city.county} · {city.zip} · {city.drive}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{city.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
