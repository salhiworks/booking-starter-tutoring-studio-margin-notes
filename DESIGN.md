# Margin Notes — the visual system

A well-kept study notebook. Tutoring is working something out next to someone: a pencil, a page of
working, a highlighter pulled across the line that changed, a note in the margin. The page is built
the same way — from **paper**, **one book face**, **one highlighter**, **the tutor's violet pen** and
**one ornament, the margin**. No chalkboards, apples, mortarboards or cartoon icons; no gradients;
no "edtech" purple glow.

## Tokens (src/styles/tokens.css — the only file with raw values)

| | |
|---|---|
| Paper `--paper` #f7f5ef | the reading pages; with a faint 24 px squared grid (`--grid`) on the first screen and the hour |
| Turned page `--paper-2` #efede6 | parents & guardians |
| White `--raised` #ffffff | sessions & prices, questions, the worked answer, inputs, the booking sheet |
| Highlighter `--lime` #d8f36a | behind emphasised words; the "Where are you stuck?" band (ink on it 14:1); the footer's closing square |
| Violet ink `--field` #2e1785 | the booking band, the booking sheet's header (white on it 13.3:1; lime words 10.7:1) |
| Graphite `--night` #16151d | the footer |
| Ink `--ink` #191a1f | type (16:1 on paper) |
| Accent `--accent` #4b22c9 | the tutor's pen — buttons, the margin rule, section and session numbers, the selected choice, the active number line (owner-editable; white on it 8.9:1, as text 8.1:1 on paper, 7.2:1 on lime) |
| Muted `--muted` #5d606b | secondary text (≥ 5.3:1 on every light field) |

The lime, violet and graphite fields are fixed, so their contrast is known. The owner's accent colours
the buttons, the rule, the numbers and selected choices on the light pages.

Type:

- **Literata** (variable, optical sizes) for every heading, figure, the name mark and the worked
  answer — a book face made for long reading, set upright and calm (weight ~380–420, `opsz` 72 at
  display sizes).
- A heading's *emphasised* words are the **same face in italics, with the highlighter pulled across
  them** (`.hl`: a lime stroke low in the line, wrapping with the words). On lime the stroke turns
  white; on violet and graphite the words turn lime instead.
- **Lexend** for reading text — a face designed to make reading easier, with plain (unslashed)
  figures for prices and times. **Atkinson Hyperlegible Mono** (`--font-label`) for small capital
  labels only — kinds, "Good for", section names — never for figures (its zeros are slashed): times,
  prices, minutes and the booking sheet use Lexend (`--font-mono` points at it for booking.css).

Shape: photographs with barely-there corners (3 px), like prints; buttons as pills (a pen cap); thin
ink rules (1.5 px) at the top of lists, hairlines between rows. One long soft shadow under the
first-screen photo, the worked answer and the booking photo.

## The margin — the one ornament (`.margin-grid`, `SectionLabel.tsx`)

From 1080 px every reading section is a two-column grid: the **margin column** holds the section's
number set like an equation number — "(03)" in Literata italics, in the accent — and its name in mono
capitals; it is sticky while the section is read. A **violet rule** (1.5 px, the accent) runs down
the left edge of the text, carried through each section's padding so it reads as one line from
Approach to Visit, the way an exercise book's margin runs down every page. On the lime band the rule
turns ink. The violet booking band and the graphite footer break it. Below 1080 px the number and
name sit above the heading.

The same idea is echoed, never repeated as decoration: "Given:" in the first screen (the opening of a
problem), the three principles numbered (1) (2) (3) at the right edge like equations, the worked
answer's "∴", session rows numbered 3.1–3.6, "Fig. 1" captions, roman numerals for the guardians'
points, and the proof's closing square ∎ after the name mark.

## Composition, section by section

Every section, the header bar and the bands share ONE centred shell (`.shell`, page max 90 rem;
96 rem from 1600 px; 112 rem and a 112.5 % root from 2200 px).

1. **First screen** (squared paper): kicker (what · where · open now), the headline (13–14 ch), the
   introduction, **Book a session** + "Not sure where to start?", and **Given:** — tutor to student
   1 : 1 · the range of lengths · the lowest price · the first conversation, all live from the engine,
   behind a violet rule. Right: an upright photograph from above with a **margin note** pinned to its
   edge (owner-editable, set down at a slight angle on load). Height-aware: the action stays in the
   first screen from 320 × 568 to 2560 × 1440 (short phones put the photo after the words).
2. **Approach**: heading + intro beside a wide photo; three principles as numbered equations.
3. **Where are you stuck?** (lime band): a real radio group of sentences; the **worked answer** on a
   sheet of squared paper — "Then start with ∴ <session>", why, Good for, length and price from the
   engine, and its own Book (sticky beside the list on wide screens).
4. **Sessions & prices** (white): a problem set — every engine session as a row (3.1…): kind, name,
   description, Good for, its length drawn on **one shared number line** (ticks every 15 min, labels
   every 30), price and Book. Wide screens: the photograph of the row in the middle of the screen (or
   under the pointer / in focus) in a sticky panel. Phones: a small photograph floats beside each
   row's name.
5. **How the hour is spent** (squared paper): the owner's parts laid end to end on one line, each as
   long as its minutes, drawn left to right as it arrives; equal columns of words below; the total at
   the end. Phones: the line stands upright.
6. **Parents & guardians** (turned page): a tall photo and four clauses (i.–iv.).
7. **At the table**: three photographs set like textbook figures — "Fig. 1" captions.
8. **Questions & policies** (white): sticky heading with the "Sample policies" label; native
   disclosure rows.
9. **Booking band** (violet): photo, heading, the three steps (1) (2) (3) in lime, "Choose a session".
10. **Visit**, then the **footer** (graphite): the name mark page-wide in Literata with a lime ∎.

## Motion

The highlighter pulled across a heading's words as it arrives (on load for the headline); the margin
note set down; the hour's line drawn left to right; photographs settling 1.25 rem; the worked answer
fading up when the choice changes; the header's pencil line drawn as the page is read. All of it is
off under `prefers-reduced-motion` (`html.js-reveal` is never set, so nothing starts hidden).
