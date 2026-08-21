import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";
import { PROJECT_TYPES, TIMELINES } from "@/lib/site";
import { cn } from "@/lib/cn";

const field =
  "w-full min-h-12 rounded-md border border-line bg-charcoal-elevated px-4 text-base text-fg placeholder:text-fg-subtle outline-none transition-colors duration-150 focus:border-oak";

export function LeadForm({
  source = "website",
  compact = false,
  defaultSqft,
  defaultSlot,
  estimateLow,
  estimateHigh,
  cta = "Request a free quote",
}: {
  source?: string;
  compact?: boolean;
  defaultSqft?: number;
  defaultSlot?: string;
  estimateLow?: number;
  estimateHigh?: number;
  cta?: string;
}) {
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const zip = String(data.get("zip") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "residential");
    const timeline = String(data.get("timeline") ?? "");
    const rooms = String(data.get("rooms") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const sqftRaw = String(data.get("sqft") ?? "").trim();
    const sqft = sqftRaw ? Number(sqftRaw) : defaultSqft ?? null;

    setPending(true);
    try {
      await submitLead({
        data: {
          name,
          email,
          phone,
          zip,
          projectType,
          timeline,
          rooms,
          message,
          source,
          sqft: sqft && Number.isFinite(sqft) ? sqft : null,
          slot: defaultSlot ?? "",
          estimateLow: estimateLow ?? null,
          estimateHigh: estimateHigh ?? null,
        },
      });
      toast.success("Got it. We text within 5 minutes during hours — or first thing next morning.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save. Call or text us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", compact && "space-y-4")}>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
          Full name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Jordan Hale" required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" required />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-fg">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(864) 555-0123" required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="zip" className="mb-2 block text-sm font-medium text-fg">
            Zip
          </label>
          <input id="zip" name="zip" inputMode="numeric" className={field} placeholder="29687" />
        </div>
        <div>
          <label htmlFor="sqft" className="mb-2 block text-sm font-medium text-fg">
            Sq ft (rough is fine)
          </label>
          <input
            id="sqft"
            name="sqft"
            inputMode="numeric"
            className={field}
            defaultValue={defaultSqft ? String(defaultSqft) : ""}
            placeholder="800"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-fg">
            Project type
          </label>
          <select id="projectType" name="projectType" className={cn(field, "appearance-none")}>
            {PROJECT_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-charcoal text-fg">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-fg">
            Timeline
          </label>
          <select id="timeline" name="timeline" className={cn(field, "appearance-none")}>
            {TIMELINES.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-charcoal text-fg">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rooms" className="mb-2 block text-sm font-medium text-fg">
          Rooms
        </label>
        <input id="rooms" name="rooms" className={field} placeholder="Kitchen, hall, primary" />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className={cn(field, "min-h-24 resize-y py-3")}
          placeholder="Over tile? Occupied house? Builder spec?"
        />
      </div>

      {defaultSlot ? (
        <p className="rounded-md border border-line bg-charcoal-elevated px-4 py-3 text-sm text-fg-muted">
          Measure window: <span className="text-oak">{defaultSlot}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-oak px-6 text-base font-semibold text-charcoal transition-colors duration-150 hover:bg-fg disabled:opacity-70"
      >
        {pending ? "Sending..." : cta}
      </button>
    </form>
  );
}
