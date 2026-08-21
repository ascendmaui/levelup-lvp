import { useMemo, useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";
import { weekdaySlots } from "@/lib/site";

type Step = "zip" | "rooms" | "sqft" | "timeline" | "contact" | "done";

const BOT = "LevelUp after hours";

export function VoiceDesk() {
  const slots = useMemo(() => weekdaySlots(4), []);
  const [step, setStep] = useState<Step>("zip");
  const [zip, setZip] = useState("");
  const [rooms, setRooms] = useState("");
  const [sqft, setSqft] = useState("");
  const [timeline, setTimeline] = useState("this-month");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [slot, setSlot] = useState("");
  const [pending, setPending] = useState(false);

  const lines: { who: string; text: string }[] = [
    { who: BOT, text: "LevelUp LVP, after hours. I can qualify the job and hold a measure. What zip are you in?" },
  ];
  if (zip) lines.push({ who: "You", text: zip }, { who: BOT, text: "Got it. Which rooms — kitchen, hall, whole floor?" });
  if (rooms) lines.push({ who: "You", text: rooms }, { who: BOT, text: "Rough square footage? A guess is fine." });
  if (sqft) lines.push({ who: "You", text: `${sqft} sf` }, { who: BOT, text: "When do you want it done?" });
  if (step !== "zip" && step !== "rooms" && step !== "sqft" && timeline) {
    lines.push({ who: "You", text: timeline.replace("-", " ") }, { who: BOT, text: "I can hold a 20-minute site measure. Name, phone, email, and a window." });
  }
  if (step === "done") {
    lines.push({ who: BOT, text: `Held ${slot}. A human texts you at open. If it is an emergency leak, call the office.` });
  }

  async function finish() {
    setPending(true);
    try {
      await submitLead({
        data: {
          name,
          email,
          phone,
          zip,
          rooms,
          timeline,
          sqft: Number(sqft) || null,
          slot,
          source: "voice",
          projectType: "residential",
          message: "After-hours voice qualify",
        },
      });
      setStep("done");
      toast.success("Window held. We text at open.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not book. Call us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="space-y-3 rounded-xl border border-line bg-charcoal-elevated p-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.who === BOT
                ? "max-w-[90%] rounded-lg bg-charcoal px-3 py-2 text-sm text-fg"
                : "ml-auto max-w-[90%] rounded-lg bg-oak/20 px-3 py-2 text-sm text-fg"
            }
          >
            <p className="text-[11px] tracking-wide text-oak uppercase">{line.who}</p>
            <p className="mt-1">{line.text}</p>
          </div>
        ))}
      </div>

      {step === "zip" ? (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (zip.length >= 5) setStep("rooms");
          }}
        >
          <input
            className="min-h-12 flex-1 rounded-full border border-line bg-charcoal-elevated px-4"
            placeholder="29687"
            inputMode="numeric"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button className="min-h-12 rounded-full bg-oak px-5 font-semibold text-charcoal" type="submit">
            Send
          </button>
        </form>
      ) : null}

      {step === "rooms" ? (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (rooms.trim()) setStep("sqft");
          }}
        >
          <input
            className="min-h-12 flex-1 rounded-full border border-line bg-charcoal-elevated px-4"
            placeholder="Kitchen and hall"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
          <button className="min-h-12 rounded-full bg-oak px-5 font-semibold text-charcoal" type="submit">
            Send
          </button>
        </form>
      ) : null}

      {step === "sqft" ? (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("timeline");
          }}
        >
          <input
            className="min-h-12 flex-1 rounded-full border border-line bg-charcoal-elevated px-4"
            placeholder="800"
            inputMode="numeric"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
          />
          <button className="min-h-12 rounded-full bg-oak px-5 font-semibold text-charcoal" type="submit">
            Send
          </button>
        </form>
      ) : null}

      {step === "timeline" ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {["this-week", "this-month", "bidding"].map((t) => (
            <button
              key={t}
              type="button"
              className="min-h-11 rounded-full border border-line px-4 text-sm"
              onClick={() => {
                setTimeline(t);
                setStep("contact");
              }}
            >
              {t.replace("-", " ")}
            </button>
          ))}
        </div>
      ) : null}

      {step === "contact" ? (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void finish();
          }}
        >
          <input className="min-h-12 w-full rounded-md border border-line bg-charcoal-elevated px-4" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="min-h-12 w-full rounded-md border border-line bg-charcoal-elevated px-4" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input className="min-h-12 w-full rounded-md border border-line bg-charcoal-elevated px-4" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="flex flex-wrap gap-2">
            {slots.flatMap((d) =>
              d.times.slice(0, 2).map((t) => {
                const label = `${d.label} · ${t}`;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSlot(label)}
                    className={`min-h-11 rounded-full border px-3 text-xs ${slot === label ? "border-oak bg-oak text-charcoal" : "border-line"}`}
                  >
                    {label}
                  </button>
                );
              }),
            )}
          </div>
          <button disabled={pending || !slot} className="flex min-h-12 w-full items-center justify-center rounded-full bg-oak font-semibold text-charcoal disabled:opacity-70" type="submit">
            {pending ? "Holding..." : "Hold the window"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
