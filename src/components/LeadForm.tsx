import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PROJECT_TYPES, saveLead } from "@/lib/leads";
import { cn } from "@/lib/cn";

const field =
  "w-full min-h-12 rounded-md border border-line bg-charcoal-elevated px-4 text-base text-fg placeholder:text-fg-subtle outline-none transition-colors duration-150 focus:border-oak";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "residential");
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setPending(true);
    try {
      saveLead({ name, email, phone, projectType, message });
      toast.success("Request received. We'll reach out within 24 hours.");
      form.reset();
    } catch {
      toast.error("Could not save your request. Please call us.");
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
        <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Jordan Hale" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-fg">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="(864) 555-0123"
          />
        </div>
      </div>

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
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(field, "min-h-28 resize-y py-3")}
          placeholder="Square footage, rooms, timeline..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-oak px-6 text-base font-semibold text-charcoal transition-colors duration-150 hover:bg-fg disabled:opacity-70"
      >
        {pending ? "Sending..." : "Request a free quote"}
      </button>
    </form>
  );
}
