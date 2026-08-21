import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { VoiceDesk } from "@/components/VoiceDesk";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/voice")({
  component: VoicePage,
  head: () => ({
    meta: [
      { title: "After-hours flooring qualify | LevelUp LVP" },
      {
        name: "description",
        content: "After-hours qualification desk for LevelUp LVP. Hold a measure window when the shop is closed.",
      },
    ],
  }),
});

function VoicePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-oak uppercase">Night desk</p>
        <h1 className="font-display text-display leading-[1.05] font-semibold">After hours, still a real window.</h1>
        <p className="mt-4 text-fg-muted">
          This is the qualify script a voice receptionist will run. It stores the lead and holds a measure. Live phone AI plugs in here — until then, the chat books the same pipeline. Emergency? Call {SITE.phoneDisplay}.
        </p>
        <div className="mt-10">
          <VoiceDesk />
        </div>
      </section>
    </SiteShell>
  );
}
