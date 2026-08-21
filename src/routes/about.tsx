import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedImage } from "@/components/FramedImage";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Our story</p>
          <h1 className="font-display text-display leading-[1.05] font-semibold tracking-tight">
            Crafting floors that last a lifetime.
          </h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            <p>
              LevelUp LVP was founded in Greenville so Upstate builders and homeowners could hire a crew that treats luxury vinyl like finish carpentry — not a weekend side job.
            </p>
            <p>
              We meter the slab, write the square footage, and walk the punch list before we leave. The plank line stays true from the first doorway to the last closet.
            </p>
            <p>
              Service area: Greenville, Greer, Taylors, Simpsonville, Mauldin, Travelers Rest, and Spartanburg — 50 miles from downtown.
            </p>
          </div>
        </div>
        <FramedImage
          src="/images/showroom.jpg"
          alt="LevelUp LVP showroom floor samples"
          position="center 68%"
          className="aspect-[4/5] rounded-xl sm:aspect-[5/4] lg:aspect-[4/5]"
        />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {[
            { k: "50 mi", v: "Service radius from Greenville" },
            { k: "3–5 d", v: "Typical single-home install" },
            { k: "10 yr", v: "Workmanship warranty" },
          ].map((stat) => (
            <div key={stat.k} className="rounded-xl border border-line bg-charcoal-elevated p-6">
              <p className="font-display text-4xl font-semibold text-oak">{stat.k}</p>
              <p className="mt-2 text-sm text-fg-muted">{stat.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="mb-4 font-display text-title font-semibold">Paper we send before we mobilize</h2>
        <p className="max-w-2xl text-sm text-fg-muted">
          General liability, workers’ comp, and manufacturer warranties. Certificates of insurance are issued per job with the GC named — they are not a stock JPEG on this site. Ask and we send the current cert the same day.
        </p>
        <Link to="/builders" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-oak">
          Builder packet →
        </Link>
      </section>
    </SiteShell>
  );
}
