import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Contact</p>
          <h1 className="font-display text-display leading-[1.05] font-semibold tracking-tight">
            Call, text, or hold a measure.
          </h1>
          <p className="mt-5 max-w-md text-lg text-fg-muted">
            {SITE.hours}. After hours the night desk still qualifies and holds a window.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-start gap-3 text-fg-muted">
              <Phone className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Call / text</dt>
                <dd className="flex flex-wrap gap-3">
                  <a href={SITE.phoneTel} className="hover:text-oak">
                    {SITE.phoneDisplay}
                  </a>
                  <a href={SITE.phoneSms} className="hover:text-oak">
                    SMS
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3 text-fg-muted">
              <Mail className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="hover:text-oak">
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3 text-fg-muted">
              <MapPin className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Area</dt>
                <dd>
                  {SITE.addressLine} · {SITE.radius}
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="inline-flex min-h-11 items-center rounded-full bg-oak px-5 text-sm font-semibold text-charcoal">
              Book a measure
            </Link>
            <Link to="/voice" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm">
              After-hours desk
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-line-strong bg-charcoal-elevated p-5 sm:p-8">
          <LeadForm source="contact" />
        </div>
      </section>
    </SiteShell>
  );
}
