import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/services")({ component: ServicesPage });

const SERVICES = [
  {
    title: "Luxury vinyl plank installation",
    copy: "Floating or glue-down LVP from Coretec, Shaw, Mohawk, and equivalent commercial lines. Acclimation, expansion, and transitions handled to spec.",
    features: ["Waterproof locking systems", "Acoustic underlayment", "Stair noses and reducers"],
    src: "/images/residential.jpg",
    position: "center 68%",
  },
  {
    title: "Subfloor prep and repair",
    copy: "Moisture testing, leveling, and plywood replacement so the finish floor never telegraphs the problems underneath.",
    features: ["In-situ moisture readings", "Self-leveling compounds", "Vapor mitigation"],
    src: "/images/install.jpg",
    position: "center 50%",
  },
  {
    title: "Commercial and multifamily",
    copy: "Phased installs that keep units rentable and lobbies open. After-hours crews available across the Upstate.",
    features: ["Night and weekend windows", "Punch-list closeout", "Warranty-backed"],
    src: "/images/commercial.jpg",
    position: "center 60%",
  },
];

function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Services</p>
        <h1 className="max-w-3xl font-display text-display leading-[1.05] font-semibold tracking-tight">
          Installation, done to the plank.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-fg-muted">
          One crew, one standard — residential, commercial, and builder work across Greenville and a 50-mile radius.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 pb-16 sm:px-6">
        {SERVICES.map((service, i) => (
          <article
            key={service.title}
            className="grid overflow-hidden rounded-xl border border-line bg-charcoal-elevated lg:grid-cols-2"
          >
            <FramedImage
              src={service.src}
              alt={service.title}
              position={service.position}
              className={`aspect-[16/11] lg:aspect-auto lg:min-h-[22rem] ${i % 2 === 1 ? "lg:order-2" : ""}`}
            />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <h2 className="font-display text-title font-semibold tracking-tight">{service.title}</h2>
              <p className="mt-4 text-fg-muted">{service.copy}</p>
              <ul className="mt-6 space-y-2 text-sm text-fg-muted">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-oak">–</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-oak"
              >
                Request this service <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-line bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
          {[
            { n: "01", t: "Certified crews", d: "Specialized LVP training, not a general-hand crew rotating through." },
            { n: "02", t: "Written scope", d: "Moisture numbers, product, and square footage locked before we start." },
            { n: "03", t: "Clean closeout", d: "Transitions, base, and a walkthrough before we leave the keys." },
          ].map((item) => (
            <div key={item.n}>
              <p className="font-display text-3xl text-oak">{item.n}</p>
              <h3 className="mt-3 font-display text-heading font-semibold">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 font-display text-title font-semibold">Ask about a room</h2>
        <div className="rounded-xl border border-line-strong p-5 sm:p-8">
          <LeadForm source="services" />
        </div>
      </section>
    </SiteShell>
  );
}
