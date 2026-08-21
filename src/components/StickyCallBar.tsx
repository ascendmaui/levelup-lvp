import { Phone, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/site";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-charcoal/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2">
        <a
          href={SITE.phoneTel}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-oak font-semibold text-charcoal"
        >
          <Phone className="size-4" />
          Call
        </a>
        <a
          href={SITE.phoneSms}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line font-semibold text-fg"
        >
          <MessageSquare className="size-4" />
          Text
        </a>
      </div>
    </div>
  );
}
