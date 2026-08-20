import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Contact</p>
          <h1 className="font-display text-display leading-[1.05] font-semibold tracking-tight">
            Let's get the floor right.
          </h1>
          <p className="mt-5 max-w-md text-lg text-fg-muted">
            Share the rooms and a rough square footage. We reply within one business day with a site-visit window.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-start gap-3 text-fg-muted">
              <MapPin className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Service area</dt>
                <dd>Greenville, SC and 50 miles</dd>
              </div>
            </div>
            <div className="flex items-start gap-3 text-fg-muted">
              <Phone className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Phone</dt>
                <dd>
                  <a href="tel:8645550123" className="hover:text-oak">
                    (864) 555-0123
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3 text-fg-muted">
              <Mail className="mt-0.5 size-4 text-oak" />
              <div>
                <dt className="font-medium text-fg">Email</dt>
                <dd>
                  <a href="mailto:info@leveluplvp.com" className="hover:text-oak">
                    info@leveluplvp.com
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <FramedImage
            src="/images/hallway.jpg"
            alt="Finished oak LVP hallway"
            position="center 72%"
            className="mt-10 hidden aspect-[16/10] rounded-xl lg:block"
          />
        </div>

        <div className="rounded-xl border border-line-strong bg-charcoal-elevated p-5 sm:p-8">
          <LeadForm />
        </div>
      </section>
    </SiteShell>
  );
}
