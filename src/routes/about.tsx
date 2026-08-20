import { createFileRoute } from "@tanstack/react-router";
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
              LevelUp LVP was founded in Greenville to give Upstate builders and homeowners a crew that treats luxury vinyl like finish carpentry — not a weekend side job.
            </p>
            <p>
              Fifteen years of combined flooring work, thousands of square feet, and one standard: the plank line stays true from the first doorway to the last closet.
            </p>
            <p>
              We serve Greenville, Greer, Taylors, Simpsonville, and a 50-mile radius. If the job is in the Upstate, we will be there with moisture meters, not guesses.
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
        <div className="grid grid-cols-2 gap-3">
          <FramedImage
            src="/images/hallway.jpg"
            alt="Installed hallway of oak LVP"
            position="center 70%"
            className="aspect-[3/4] rounded-lg sm:aspect-[16/11]"
          />
          <FramedImage
            src="/images/kitchen.jpg"
            alt="Kitchen floor after LevelUp install"
            position="center 75%"
            className="aspect-[3/4] rounded-lg sm:aspect-[16/11]"
          />
        </div>
      </section>
    </SiteShell>
  );
}
