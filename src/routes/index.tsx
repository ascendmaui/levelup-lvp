import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Phone, Shield } from "lucide-react";
import { Faq } from "@/components/Faq";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";
import { CITIES, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div className="min-w-0 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium tracking-wide text-oak uppercase">
            <span className="size-1.5 rounded-full bg-oak" />
            Greenville & 50 miles
          </p>
          <h1 className="font-display text-display leading-[1.05] font-semibold tracking-tight text-fg">
            Floors that hold the room — measured this week.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
            Luxury vinyl plank for homes, builders, and occupied units. Moisture-tested, written scope, 3–5 days on a typical main floor.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/book"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-oak px-6 font-semibold text-charcoal hover:bg-fg"
            >
              Book a 20-min measure
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.phoneTel}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-medium text-fg hover:border-oak"
            >
              <Phone className="size-4" />
              {SITE.phoneDisplay}
            </a>
          </div>
          <ul className="grid grid-cols-1 gap-3 pt-2 text-sm text-fg-muted sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Shield className="size-4 text-oak" />
              10-year workmanship
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-oak" />
              3–5 day typical install
            </li>
            <li className="flex items-center gap-2">
              Insured · bonded · metered
            </li>
          </ul>
        </div>
        <FramedImage
          src="/images/hero-living.jpg"
          alt="Warm oak luxury vinyl plank in a sunlit Greenville living room"
          position="center 78%"
          priority
          className="aspect-[4/5] rounded-xl sm:aspect-[5/4]"
        />
      </section>

      <div className="border-y border-line bg-charcoal-elevated">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 text-center text-xs tracking-wide text-fg-subtle uppercase sm:px-6">
          <span>Written moisture numbers</span>
          <span>Coretec · Shaw · Mohawk</span>
          <span>Night / weekend commercial</span>
          <span>Upstate builders welcome</span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Who it is for</p>
        <h2 className="mb-10 font-display text-title font-semibold tracking-tight">Three buyers. Three promises.</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Homeowners",
              copy: "Pets, kids, wet kitchens. The house is livable in 3–5 days. See a range before we knock.",
              href: "/go/homeowners" as const,
              src: "/images/residential.jpg",
              pos: "center 70%",
            },
            {
              title: "Builders",
              copy: "Spec and custom on the schedule you already promised. Punch list, COI, stairs included.",
              href: "/go/builders" as const,
              src: "/images/install.jpg",
              pos: "center 52%",
            },
            {
              title: "Property managers",
              copy: "Occupied units, after hours, waterproof cores that survive turnovers.",
              href: "/services" as const,
              src: "/images/commercial.jpg",
              pos: "center 62%",
            },
          ].map((card) => (
            <article key={card.title} className="overflow-hidden rounded-xl border border-line bg-charcoal-elevated">
              <FramedImage src={card.src} alt={card.title} position={card.pos} className="aspect-[16/10]" />
              <div className="space-y-3 p-5 sm:p-6">
                <h3 className="font-display text-heading font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{card.copy}</p>
                <Link to={card.href} className="inline-flex items-center gap-1 text-sm font-medium text-oak">
                  Start here <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Before / after</p>
        <h2 className="mb-3 font-display text-title font-semibold tracking-tight">Carpet and tired tile, out.</h2>
        <p className="mb-8 max-w-xl text-sm text-fg-muted">
          Style frames for kitchens and baths we see every week in Taylors and Simpsonville. Swap in job photos as they close — do not advertise these as a specific address.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-2">
            <FramedImage src="/images/before-kitchen.jpg" alt="Dated kitchen with worn carpet" position="center 70%" className="aspect-[4/5] rounded-lg sm:aspect-[4/3]" />
            <FramedImage src="/images/kitchen.jpg" alt="Same style kitchen with oak LVP" position="center 72%" className="aspect-[4/5] rounded-lg sm:aspect-[4/3]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FramedImage src="/images/before-bath.jpg" alt="Cracked almond bathroom tile" position="center 70%" className="aspect-[4/5] rounded-lg sm:aspect-[4/3]" />
            <FramedImage src="/images/after-bath.jpg" alt="Bathroom with new oak LVP" position="center 68%" className="aspect-[4/5] rounded-lg sm:aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Price, not a mystery</p>
            <h2 className="mb-4 font-display text-title font-semibold tracking-tight">Most Upstate kitchens land $1,100–$2,000 installed.</h2>
            <p className="mb-6 max-w-md text-fg-muted">
              Whole-home main floors typically $5–$9 per sq ft installed locally. Get a range in 30 seconds, then lock it with a measure.
            </p>
            <Link to="/estimate" className="inline-flex min-h-12 items-center rounded-full bg-oak px-6 font-semibold text-charcoal">
              Open the estimator
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { k: "Day 0", v: "Measure + moisture" },
              { k: "Day 1–2", v: "Material on site" },
              { k: "Day 3–5", v: "Install + walkthrough" },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border border-line bg-charcoal p-4">
                <p className="font-display text-lg text-oak">{item.k}</p>
                <p className="mt-2 text-sm text-fg-muted">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Service area</p>
            <h2 className="font-display text-title font-semibold tracking-tight">Greenville first. Upstate always.</h2>
          </div>
          <Link to="/areas" className="hidden text-sm text-oak sm:inline">
            All cities
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              to="/areas/$city"
              params={{ city: city.slug }}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-fg-muted hover:border-oak hover:text-oak"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 font-display text-title font-semibold tracking-tight">Questions we actually get</h2>
        <Faq limit={4} />
        <p className="mt-4 text-sm">
          <Link to="/voice" className="text-oak">
            After hours? Qualify with the night desk →
          </Link>
        </p>
      </section>

      <section id="quote" className="border-t border-line bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Start a project</p>
            <h2 className="mb-4 font-display text-title font-semibold tracking-tight">Tell us the rooms. We text back.</h2>
            <p className="mb-6 max-w-md text-fg-muted">
              During hours we respond inside five minutes. Nights and Sundays go through the qualify desk and get a morning callback.
            </p>
            <a href={SITE.googleReview} className="text-sm text-oak">
              If we already finished your floor, leave a Google review →
            </a>
          </div>
          <div className="rounded-xl border border-line-strong bg-charcoal p-5 sm:p-8">
            <LeadForm source="homepage" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
