import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-charcoal px-6 text-fg">
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-line bg-charcoal-elevated p-6">
        <p className="text-xs tracking-[0.16em] text-oak uppercase">Ops desk</p>
        <h1 className="font-display text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-fg-muted">Crew only. Public quote forms do not need an account.</p>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
              className="w-full min-h-12 rounded-full border border-line px-4 font-medium hover:border-oak"
            >
              Continue with {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-fg-subtle">Sign-in is disabled.</p>
        )}
        <Link to="/" className="block text-center text-sm text-oak">
          Back to the site
        </Link>
      </div>
    </main>
  );
}
