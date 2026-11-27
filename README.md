# Private Tutoring Studio Booking Website — "Margin Notes" Starter

A finished, premium booking website for an independent tutor who teaches one student at a time,
ready to make your own with Claude Code and publish on Hostinger. It ships as **Lemma Math Studio**,
a fictional one-tutor math studio on Monroe Street in Madison, Wisconsin:

- a one-page studio website set like a well-kept study notebook — a first screen on squared paper
  with a book-face headline whose emphasised words get the highlighter ("Math, *worked out*
  together."), **Book a session**, a "Given:" line of live facts from the booking system (one tutor
  to one student, the range of lengths, the lowest price, the first conversation) and a photograph
  from above with the tutor's margin note pinned to it; **the approach** as three numbered
  principles; **"Where are you stuck?"** on a lime band — pick the sentence that sounds like you and
  the answer is set like the end of a worked problem (∴ the session, why, its real length and price,
  its own Book); **sessions & prices** as a problem set (3.1, 3.2…) with every length drawn on one
  number line and the photograph of the row you are reading beside it; **how the hour is spent**,
  drawn to scale; **parents & guardians** (who books for a student under 18, who hears from you,
  what you never ask for); **at the table** as three textbook figures; questions and sample policies
  (labelled); a violet booking band; directions — from 320 px phones up, with booking in a sheet over
  the page;
- online booking — **one tutoring session per booking**, a day and time, contact details and an
  optional note, and an emailed 6-digit code; the tutor confirms each request;
- the owner dashboard at `/admin/` — requests to confirm, sessions and prices, hours and closures,
  email health, and the website's own text, photos and button colour.

The look — *Margin Notes*: warm paper with a faint squared grid, graphite ink, the tutor's violet pen
and one lime highlighter; Literata (a book face) for headings with the emphasised words in its
italics under the highlighter, Lexend for reading, Atkinson Hyperlegible Mono for labels; one ornament,
the margin — a violet rule down the left of every section, its number standing in the margin like an
equation number "(03)".

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.1** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list of files
(name, city, words, colours) — the booking system, the dashboard and the layout stay as they are.

Sessions, prices, hours and contact details are **not** code: you set them in the dashboard once the
booking backend is connected. Each session's photograph follows the words in its name (first
conversation · algebra · calculus · statistics · test prep · study skills — see `CUSTOMIZE.md`), and
each "Where are you stuck?" answer points to a session by a word in its name. **Your own
photographs** go in the dashboard → Website. Each sample photo stays labelled "Sample photo" until you
replace it; use only photos of your own studio, and of students only with written permission (a
parent's or guardian's for anyone under 18). Your name, degrees, teaching experience and subjects are
yours to add: the starter invents none.

**A booking is one tutoring session.** The booking engine books single sessions on one calendar —
one tutor's time, one student, one service. It does not run group classes or study groups, collect
school records or other sensitive information, link bookings into courses or weekly series, sell
packages or terms, take deposits or payments, create online-meeting links, or run several tutors'
calendars (see *What the engine does not do* in `CLAUDE.md`). Sessions are paid at the studio. The
site promises patient, prepared teaching — never a grade, a score or an admission. For a student
under 18, a parent or guardian makes the booking with their own contact details.

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key (Windows Command Prompt: copy .env.example .env.local)
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells you
exactly what is left for you to do (your dashboard login and the two email secrets). Full steps:
the Profit Studio guide *Build a Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App** from it
(Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero` ("Given"), `Approach`, `Stuck` ("Where are you stuck?"), `Sessions` (the problem set and number line), `Hour`, `Guardians`, `Table`, `GoodToKnow`, `Visit`…), the margin label (`SectionLabel.tsx`) and the booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample sessions and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How sessions find their kind (by the words in their names), "Good for:", lengths and prices |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5243
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed in [`ASSETS.md`](ASSETS.md)
(the photographs file by file in [`PHOTOS.md`](PHOTOS.md)).
