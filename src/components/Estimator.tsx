import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { estimateRange, ROOM_PRESETS, TIERS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Estimator({
  onUse,
}: {
  onUse?: (result: { sqft: number; low: number; high: number; tierId: string }) => void;
}) {
  const [sqft, setSqft] = useState(800);
  const [tierId, setTierId] = useState("better");
  const [prep, setPrep] = useState(true);
  const result = useMemo(() => estimateRange(sqft, tierId, prep), [sqft, tierId, prep]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ROOM_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setSqft(preset.sqft)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm transition-colors duration-150",
              sqft === preset.sqft
                ? "border-oak bg-oak/15 text-oak"
                : "border-line text-fg-muted hover:border-oak",
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="sqft" className="mb-2 flex justify-between text-sm font-medium">
          <span>Square footage</span>
          <span className="tabular-nums text-oak">{sqft.toLocaleString()} sf</span>
        </label>
        <input
          id="sqft"
          type="range"
          min={80}
          max={2500}
          step={20}
          value={sqft}
          onChange={(e) => setSqft(Number(e.target.value))}
          className="w-full accent-oak"
        />
      </div>

      <div className="grid gap-2">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => setTierId(tier.id)}
            className={cn(
              "rounded-lg border px-4 py-3 text-left transition-colors duration-150",
              tierId === tier.id ? "border-oak bg-oak/10" : "border-line hover:border-oak/50",
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium">{tier.name}</span>
              <span className="text-sm tabular-nums text-oak">${tier.perSqft.toFixed(2)}/sf</span>
            </div>
            <p className="mt-1 text-sm text-fg-muted">
              {tier.wear} · {tier.fit}
            </p>
          </button>
        ))}
      </div>

      <label className="flex min-h-11 items-center gap-3 text-sm text-fg-muted">
        <input
          type="checkbox"
          checked={prep}
          onChange={(e) => setPrep(e.target.checked)}
          className="size-4 accent-oak"
        />
        Include typical subfloor prep (+$1.75/sf)
      </label>

      <div className="rounded-xl border border-line-strong bg-charcoal p-5">
        <p className="text-xs tracking-[0.16em] text-oak uppercase">Installed range, Greenville</p>
        <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-fg">
          ${result.low.toLocaleString()}–${result.high.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          Range, not a bid. Moisture, stairs, and transitions lock the number on a 20-minute measure.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {onUse ? (
            <button
              type="button"
              onClick={() =>
                onUse({ sqft, low: result.low, high: result.high, tierId })
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-oak px-5 font-semibold text-charcoal"
            >
              Use this range on the quote
            </button>
          ) : (
            <Link
              to="/book"
              search={{ sqft: String(sqft) }}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-oak px-5 font-semibold text-charcoal"
            >
              Book a site measure
            </Link>
          )}
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 font-medium text-fg"
          >
            Talk to the crew
          </Link>
        </div>
      </div>
    </div>
  );
}
