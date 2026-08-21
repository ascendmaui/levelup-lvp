import { FAQS } from "@/lib/site";

export function Faq({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-charcoal-elevated">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-medium text-fg [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="text-oak transition-transform duration-150 group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
