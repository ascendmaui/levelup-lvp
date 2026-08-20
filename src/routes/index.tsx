import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Clock, Shield } from "lucide-react";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/")({ component: Home });

const GALLERY = [
  {
    src: "/images/kitchen.jpg",
    alt: "Kitchen with continuous warm oak LVP flooring",
    position: "center 72%",
    className: "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-[4/3]",
  },
  {
    src: "/images/bedroom.jpg",
    alt: "Primary bedroom with oak luxury vinyl plank",
    position: "center 78%",
    className: "aspect-[4/5] sm:aspect-[4/3]",
  },
  {
    src: "/images/hallway.jpg",
    alt: "Hallway with receding oak LVP planks",
    position: "center 70%",
    className: "aspect-[4/5] sm:aspect-[4/3]",
  },
  {
    src: "/images/install.jpg",
    alt: "Installer setting a luxury vinyl plank",
    position: "center 55%",
    className: "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-[4/3]",
  },
];

function Home() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div className="min-w-0 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium tracking-wide text-oak uppercase">
            <span className="size-1.5 rounded-full bg-oak" />
            Greenville & Upstate SC
          </p>
          <h1 className="font-display text-display leading-[1.05] font-semibold tracking-tight text-fg">
            Floors that hold the room.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
            Precision luxury vinyl plank installation for builders, homeowners, and property managers. Waterproof, quiet, and finished like hardwood.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#quote"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-oak px-6 font-semibold text-charcoal transition-colors duration-150 hover:bg-fg"
            >
              Get a free quote
              <ArrowRight className="size-4" />
            </a>
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 font-medium text-fg transition-colors duration-150 hover:border-oak"
            >
              View services
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 pt-2 text-sm text-fg-muted sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Shield className="size-4 text-oak" />
              10-year workmanship
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-oak" />
              3–5 day installs
            </li>
            <li className="flex items-center gap-2">
              <Award className="size-4 text-oak" />
              Certified crews
            </li>
          </ul>
        </div>

        <FramedImage
          src="/images/hero-living.jpg"
          alt="Warm oak luxury vinyl plank in a sunlit Greenville living room"
          position="center 78%"
          priority
          className="aspect-[4/5] rounded-xl sm:aspect-[5/4] lg:aspect-[5/4]"
        />
      </section>

      <div className="border-y border-line bg-charcoal-elevated">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 text-center text-xs tracking-wide text-fg-subtle uppercase sm:px-6">
          <span>Preferred by Upstate builders</span>
          <span>100+ rooms completed</span>
          <span>Insured & bonded</span>
          <span>Moisture-tested every job</span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">What we install</p>
        <h2 className="mb-10 font-display text-title font-semibold tracking-tight">Three ways we show up</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Residential",
              copy: "Whole-home LVP that looks like hardwood and lives like it should — pets, kids, and wet kitchens included.",
              src: "/images/residential.jpg",
              position: "center 70%",
            },
            {
              title: "Commercial",
              copy: "High-traffic lobbies, suites, and multifamily corridors with phased installs and after-hours options.",
              src: "/images/commercial.jpg",
              position: "center 62%",
            },
            {
              title: "Builder",
              copy: "Spec and custom new construction on schedule, with punch-list closeout your superintendent will actually like.",
              src: "/images/install.jpg",
              position: "center 52%",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-xl border border-line bg-charcoal-elevated"
            >
              <FramedImage
                src={card.src}
                alt={`${card.title} luxury vinyl plank project`}
                position={card.position}
                className="aspect-[16/10] sm:aspect-[5/3]"
              />
              <div className="space-y-3 p-5 sm:p-6">
                <h3 className="font-display text-heading font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{card.copy}</p>
                <Link to="/services" className="inline-flex items-center gap-1 text-sm font-medium text-oak">
                  Details <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Recent rooms</p>
            <h2 className="font-display text-title font-semibold tracking-tight">The floor, in frame</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((shot) => (
            <FramedImage
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              position={shot.position}
              className={`rounded-lg ${shot.className}`}
            />
          ))}
        </div>
      </section>

      <section id="quote" className="border-t border-line bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Start a project</p>
            <h2 className="mb-4 font-display text-title font-semibold tracking-tight">
              Ready to level up the floors?
            </h2>
            <p className="mb-8 max-w-md text-fg-muted">
              Tell us the rooms, square footage, and timeline. We return a site-visit window within one business day.
            </p>
            <FramedImage
              src="/images/showroom.jpg"
              alt="LevelUp LVP showroom with oak plank samples"
              position="center 70%"
              className="hidden aspect-[16/10] rounded-xl lg:block"
            />
          </div>
          <div className="rounded-xl border border-line-strong bg-charcoal p-5 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
