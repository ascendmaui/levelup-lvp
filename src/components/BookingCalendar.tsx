import { useState } from "react";
import { weekdaySlots } from "@/lib/site";
import { cn } from "@/lib/cn";
import { LeadForm } from "@/components/LeadForm";

export function BookingCalendar({
  source = "book",
  sqft,
}: {
  source?: string;
  sqft?: number;
}) {
  const days = weekdaySlots();
  const [date, setDate] = useState(days[0]?.date ?? "");
  const [time, setTime] = useState("");
  const selected = days.find((d) => d.date === date);
  const slot = date && time ? `${selected?.label ?? date} · ${time}` : "";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-medium text-fg">Pick a 20-minute measure</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              onClick={() => {
                setDate(day.date);
                setTime("");
              }}
              className={cn(
                "min-h-12 rounded-lg border px-2 text-sm transition-colors duration-150",
                date === day.date ? "border-oak bg-oak/15 text-oak" : "border-line text-fg-muted",
              )}
            >
              {day.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(selected?.times ?? []).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm",
                time === t ? "border-oak bg-oak text-charcoal" : "border-line text-fg-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-line-strong bg-charcoal-elevated p-5 sm:p-6">
        {slot ? (
          <LeadForm source={source} defaultSlot={slot} defaultSqft={sqft} cta="Hold this window" />
        ) : (
          <p className="text-sm text-fg-muted">Choose a day and time, then drop your name and phone.</p>
        )}
      </div>
    </div>
  );
}
