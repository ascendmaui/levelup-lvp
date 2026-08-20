import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

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
            Premium luxury vinyl plank installation for homes, builders, and property managers across Greenville and the Upstate.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Pages</h4>
          <div className="space-y-2 text-sm text-fg-muted">
            <Link to="/services" className="block hover:text-oak">
              Services
            </Link>
            <Link to="/about" className="block hover:text-oak">
              About
            </Link>
            <Link to="/contact" className="block hover:text-oak">
              Contact
            </Link>
            <Link to="/admin" className="block hover:text-oak">
              Ops desk
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Services</h4>
          <div className="space-y-2 text-sm text-fg-muted">
            <p>LVP installation</p>
            <p>Subfloor prep</p>
            <p>Commercial projects</p>
            <p>Builder partnerships</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold tracking-wide text-fg">Contact</h4>
          <div className="space-y-3 text-sm text-fg-muted">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-oak" />
              Greenville, SC and 50-mile radius
            </p>
            <a href="tel:8645550123" className="flex items-center gap-3 hover:text-oak">
              <Phone className="size-4 shrink-0 text-oak" />
              (864) 555-0123
            </a>
            <a href="mailto:info@leveluplvp.com" className="flex items-center gap-3 hover:text-oak">
              <Mail className="size-4 shrink-0 text-oak" />
              info@leveluplvp.com
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
