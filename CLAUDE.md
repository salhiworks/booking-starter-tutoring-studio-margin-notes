# Private Tutoring Studio "Margin Notes" Starter — project rules

A one-page booking website for an independent tutor who teaches one student at a time, shipped as
**Lemma Math Studio** (a fictional one-tutor math studio in Madison, WI: a free first conversation,
algebra & geometry, precalculus & calculus, statistics, SAT & ACT math prep and study skills — one
student per session, in person) for the owner to make their own. Its identity lives in
`src/site.config.ts`; `CUSTOMIZE.md` is the prompt that personalizes it. Built around
**@profitstudio/booking-engine** **2.0.0-beta.3** (pinned; lock in `booking-engine.lock.json`). The
engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your session and confirm the time shortly.",
  confirmed → "Your session is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one tutoring session: a reserved block of the tutor's time with ONE student, for one
service, on one calendar (one tutor, one table), in person at the studio.** Its length is the real
time at the table; the buffer after it is the tutor's time to write the session note. Prices are paid
at the studio — never online. The tutor reviews and confirms every request (`autoConfirm: false`).

**One to one, not group.** There are no classes, study groups, capacities, "spots left", waitlists,
second tutors or online lessons on this site. Never present a session as a class, never show a
headcount, never imply two students can share one booking, never promise or generate a meeting link.

**Kinds are read from names.** "First Conversation", "Algebra & Geometry", "SAT & ACT Math Prep"…
are ordinary engine services; the website only reads their KIND from the words in the name
(`src/lib/services.ts`) to choose a photograph and to list the first conversation first. "Where are
you stuck?" answers point to a session by a word in its name (matched from the start of a word), else
by kind; an answer that finds nothing hides itself, and if none resolves the sessions themselves become
the choices (`src/lib/stuck.ts`). Two sessions are two bookings — never present them as a
course, a term, a package or a combined price.

**Honest teaching.** Never promise or imply a grade, a score, a score increase, an admission or a
"result"; never quote success rates or pass rates; never invent the tutor's name, degrees,
certifications, teaching years, schools, reviews or testimonials. The *Good for:* line names a course,
a grade or a situation ("students with a test date in the next few months") — never an outcome.

**Students under 18.** A parent or guardian books with their own name, email and phone and receives
every email; they are welcome at the first conversation. The booking form never asks for a student's
school reports, test scores, diagnoses, learning-support records, health or other sensitive details —
the notes field asks only for the student's first name, grade or course and the topic coming up. The
booking system screens nobody and the site never implies it does.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- group classes, study groups, capacities, waitlists;
- intake or consent forms, student records, progress reports, file uploads (homework, report cards);
- linked or recurring bookings (a weekly slot), courses, terms or series;
- deposits, cancellation fees, packages, memberships, gift cards or any online payment;
- online sessions or generated meeting links; several tutors or calendars; rooms.

The booking notes field is **Anything the tutor should know? (optional)** with the helper "For example
the student's first name, their grade or course, and the topic or test coming up. Please don't include
school reports, diagnoses, health or other sensitive details here." The name field's hint says a parent
or guardian books for a student under 18. Proposed engine work:
`docs/ENGINE-PROPOSAL-tutoring-studio.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Chicago`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample sessions, hours, policies; "students"/"sessions") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kind (first conversation · algebra · calculus · statistics · test prep · study skills · other, from the name), page order (first conversation first), booking-sheet groups (`kinds`), "Good for:" parsing, length and price terms, `cheapest`, `lengthRange` | `src/lib/services.ts` |
| What the owner can edit (every text and photo — hero photo and margin note, approach photo and principles, "Where are you stuck?" answers, six session photos, the hour's parts and photo, parents & guardians points and photo, three "At the table" photos and captions, questions & policies, booking words and photo, finding-us note, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` (note: booking.css owns `.rail`, `.parts`, `.part`, `.pick`, `.time`, `.summary` — the page uses its own names: `.problem`, `.scale`, `.part-of-hour`, `.choice`, `.worked`) |
| Sections | `src/components/*.tsx` (Header (pencil-line scroll progress), Hero `#top` ("Given" live facts, open-now, margin note), Approach `#approach`, Stuck `#stuck` (radio group → worked answer), Sessions `#sessions` (problem set, number line, sticky photo panel ≥ 1080 px, floated thumbnails on phones), Hour `#hour` (drawn to scale), Guardians `#guardians`, Table `#table`, GoodToKnow `#questions`, BookingSection `#book` (violet band), Visit `#visit`, Footer); the margin label `SectionLabel.tsx`; scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/tutoring-studio-margin-notes/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A session's "Book
  this session" button passes THAT service's engine id — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a service, length, price or id in copy (questions and first-session steps included).
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`). Never present a stock photograph as the studio's tutor, a student or a student's
  work; never show graded work, scores or report cards; never invent a student, a name, a degree,
  years of experience, awards, press, reviews or testimonials.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` equal to a key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the
  first-screen default changes, update the `<link rel="preload">` in `index.html` (`imagesizes` must
  match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Questions & policies shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** calm, precise, plain ("the pencil stays with the student"); no "unlock your potential",
  "guaranteed", "boost your grades", "ace the test", "elite", "top tutors", no pressure, no score or
  grade promises.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs` in the concept
  folder). The button colour on light pages is owner-editable and always carries white text
  (`--on-accent`); the lime band, the violet booking band and the graphite footer are fixed (not
  owner-editable) so their contrast is known — buttons on them are paper with ink text or the accent.
- **Composition (DESIGN.md):** paper (with a faint squared grid on the first screen and the hour),
  white, lime, violet, graphite; Literata headings with the emphasised words in italics under the
  highlighter; Lexend for text, Atkinson Hyperlegible Mono for small labels only (its zeros
  are slashed — figures use the text face); the margin as the one ornament — every reading section in
  `.margin-grid` (number and name in the margin column, a violet rule down the text from 1080 px);
  every section inside the one centred shell (`.shell`, `--page-max`). Motion: the highlighter pulled
  across headings as they arrive, the margin note set down, the hour drawn left to right, photographs
  settling in — all off under `prefers-reduced-motion`; never hide content without `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5243 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
