import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CITIES, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-oak font-display text-sm font-semibold text-charcoal">
              LU
            </span>
            <span className="font-display text-lg font-semibold text-fg">LevelUp LVP</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            Luxury vinyl plank installation for homes, builders, and property managers across Greenville and the Upstate.
          </p>
          <p className="mt-3 text-xs text-fg-subtle">
            {SITE.hours} · {SITE.afterHours}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Work</h4>
          <div className="space-y-2 text-sm text-fg-muted">
            <Link to="/services" className="block hover:text-oak">
              Services
            </Link>
            <Link to="/estimate" className="block hover:text-oak">
              Price range
            </Link>
            <Link to="/book" className="block hover:text-oak">
              Book a measure
            </Link>
            <Link to="/builders" className="block hover:text-oak">
              Builder packet
            </Link>
            <Link to="/voice" className="block hover:text-oak">
              After-hours qualify
            </Link>
            <Link to="/reviews" className="block hover:text-oak">
              Reviews
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Areas</h4>
          <div className="space-y-2 text-sm text-fg-muted">
            {CITIES.map((city) => (
              <Link key={city.slug} to="/areas/$city" params={{ city: city.slug }} className="block hover:text-oak">
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Contact</h4>
          <div className="space-y-3 text-sm text-fg-muted">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-oak" />
              {SITE.addressLine} · {SITE.radius}
            </p>
            <a href={SITE.phoneTel} className="flex items-center gap-3 hover:text-oak">
              <Phone className="size-4 shrink-0 text-oak" />
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-oak">
              <Mail className="size-4 shrink-0 text-oak" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-fg-subtle">
        © {new Date().getFullYear()} LevelUp LVP. Serving Greenville, SC.
      </div>
    </footer>
  );
}
