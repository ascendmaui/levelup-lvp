import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/estimate", label: "Estimate" },
  { to: "/areas", label: "Areas" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="size-8 animate-pulse rounded-full bg-white/10" />;
  return user ? (
    <div className="flex items-center gap-3">
      <Link to="/admin" className="hidden text-sm text-oak lg:inline">
        Ops
      </Link>
      <UserButton />
    </div>
  ) : (
    <Link to="/login" className="hidden text-sm text-fg-subtle hover:text-oak lg:inline">
      Ops login
    </Link>
  );
}

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
              Greenville · {SITE.phoneDisplay}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-fg-muted lg:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.phoneTel}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-fg hover:border-oak"
          >
            <Phone className="size-4 text-oak" />
            Call
          </a>
          <Link
            to="/book"
            className="inline-flex min-h-11 items-center rounded-full bg-oak px-5 text-sm font-semibold text-charcoal transition-colors duration-150 hover:bg-fg"
          >
            Book a measure
          </Link>
          <AuthSlot />
        </div>

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
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-oak px-5 font-semibold text-charcoal"
            >
              Book a measure
            </Link>
            <SignedOut>
              <Link to="/login" onClick={() => setOpen(false)} className="flex min-h-11 items-center px-3 text-sm text-fg-subtle">
                Ops login
              </Link>
            </SignedOut>
            <SignedIn>
              <Link to="/admin" onClick={() => setOpen(false)} className="flex min-h-11 items-center px-3 text-sm text-oak">
                Ops desk
              </Link>
            </SignedIn>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
