import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedImage } from "@/components/FramedImage";
import { LeadForm } from "@/components/LeadForm";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/go/homeowners")({
  component: HomeownerLander,
  head: () => ({
    meta: [
      { title: "Replace carpet with LVP | Greenville homeowners" },
      {
        name: "description",
        content:
          "Waterproof luxury vinyl plank for Greenville kitchens and halls. 3–5 days, pets and kids included. Book a 20-minute measure.",
      },
    ],
  }),
});

function HomeownerLander() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Homeowners · 15-mile radius</p>
          <h1 className="font-display text-display leading-[1.05] font-semibold">
            Pull the carpet. Keep the house livable.
          </h1>
          <p className="mt-5 text-lg text-fg-muted">
            Most kitchens and halls are done in a long weekend. Waterproof core, quiet pad, transitions that do not trip the dog.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            <li>— Range on this page, bid after we meter.</li>
            <li>— You cook the night we finish the kitchen.</li>
            <li>— Call {SITE.phoneDisplay} if you would rather talk.</li>
          </ul>
          <FramedImage
            src="/images/kitchen.jpg"
            alt="Kitchen with oak LVP"
            position="center 75%"
            className="mt-8 hidden aspect-[16/10] rounded-xl lg:block"
          />
        </div>
        <div className="rounded-xl border border-line-strong bg-charcoal-elevated p-5 sm:p-8">
          <p className="mb-4 text-sm font-medium">Hold a measure — we text back.</p>
          <LeadForm source="homeowners-ad" cta="Book my measure" />
          <Link to="/estimate" className="mt-4 inline-block text-sm text-oak">
            Or see a price range first
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
