# Voice agents — LevelUp LVP

Verified from source on 2026-10-13. Env vars are listed by NAME only.

## "LevelUp after hours" night desk (`/voice`)
| Item | Value |
|---|---|
| Platform | None. It is a scripted, client-side qualify flow (`src/components/VoiceDesk.tsx`), with no AI model and no telephony. The `/voice` page says: "Live phone AI plugs in here — until then, the chat books the same pipeline." |
| Account / agent name | Not applicable yet. Any planned xAI or Twilio agent is unknown and needs confirmation. |
| Script (quoted from VoiceDesk.tsx) | "LevelUp LVP, after hours. I can qualify the job and hold a measure. What zip are you in?" → "Which rooms — kitchen, hall, whole floor?" → "Rough square footage? A guess is fine." → "When do you want it done?" → "I can hold a 20-minute site measure. Name, phone, email, and a window." |
| Answers | Website visitors only. Nothing places or receives calls. |
| Lead destination | `submitLead` (`src/lib/leads.ts`) → Postgres (`DATABASE_URL`), reviewed in `/admin`. Access is limited to `ADMIN_EMAILS` and fails closed. |
| Phone number | None verified. The site shows the placeholder `(864) 555-0123` (`src/lib/site.ts`, `src/components/JsonLd.tsx`). The real number is unknown and needs confirmation. |
| Schedules / cron | None in repo |

## Known gaps
- No real voice AI or phone line is connected.
- The 555 placeholder is shown site-wide and in JSON-LD.
- `ADMIN_EMAILS` must be set in Vercel, or `/admin` denies everyone.
