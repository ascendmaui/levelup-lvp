import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";
import { cityBySlug } from "@/lib/site";

export const Route = createFileRoute("/areas/$city")({
  loader: ({ params }) => {
    const city = cityBySlug(params.city);
    if (!city) throw notFound();
    return city;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `LVP flooring installation ${loaderData?.name ?? ""} SC | LevelUp LVP`,
      },
      {
        name: "description",
        content: `Luxury vinyl plank installation in ${loaderData?.name}, ${loaderData?.county}. Moisture-tested, 3–5 day typical install, 20-minute site measure.`,
      },
    ],
  }),
  component: CityPage,
});

function CityPage() {
  const city = Route.useLoaderData();
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">
            {city.county} · {city.zip}
          </p>
          <h1 className="font-display text-display leading-[1.05] font-semibold">
            LVP installation in {city.name}, SC
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">{city.note}</p>
          <p className="mt-3 text-sm text-fg-subtle">Drive time from Greenville: {city.drive}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="inline-flex min-h-12 items-center rounded-full bg-oak px-6 font-semibold text-charcoal">
              Book a measure in {city.name}
            </Link>
            <Link to="/estimate" className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium">
              Price range
            </Link>
          </div>
        </div>
        <FramedImage
          src="/images/residential.jpg"
          alt={`Luxury vinyl plank style example for ${city.name} homes`}
          position="center 70%"
          className="aspect-[4/5] rounded-xl sm:aspect-[5/4]"
        />
      </section>
      <section className="border-t border-line bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-title font-semibold">What a {city.name} job usually is</h2>
            <ul className="mt-6 space-y-3 text-sm text-fg-muted">
              <li>Moisture reading on slab or crawl before a plank is opened.</li>
              <li>Written sq ft, transitions, and stair count.</li>
              <li>Kitchen + hall in 2–3 days; main floor 3–5.</li>
              <li>We do not advertise a fake address. Real job photos go here as they close.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line-strong bg-charcoal p-5 sm:p-8">
            <LeadForm source={`city-${city.slug}`} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
