import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-charcoal/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-oak font-display text-sm font-semibold text-charcoal">
            LU
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-semibold leading-none tracking-tight text-fg">
              LevelUp LVP
            </span>
            <span className="mt-1 block text-[11px] tracking-[0.14em] text-oak uppercase">
              Premium flooring
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-fg-muted md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "transition-colors duration-150 hover:text-oak",
                pathname === link.to && "text-oak",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden min-h-11 items-center rounded-full bg-oak px-5 text-sm font-semibold text-charcoal transition-colors duration-150 hover:bg-fg md:inline-flex"
        >
          Get a quote
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-charcoal px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-md px-3 text-base text-fg-muted",
                  pathname === link.to && "bg-charcoal-elevated text-oak",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-oak px-5 font-semibold text-charcoal"
            >
              Get a quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
