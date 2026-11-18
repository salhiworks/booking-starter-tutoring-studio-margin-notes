# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this private tutoring studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Denver>
What I teach, who I teach and how, in a few words: <e.g. math and physics, grades 9–12 and first-year college, patient and structured>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, what I am and where, the headline (short — it is set very large), introduction, main
   button and the note on the photo, the approach heading, introduction and three principles, the
   "Where are you stuck?" heading, introduction and answers (each answer's words must start a word
   in one of my session names), the sessions heading, introduction and small print, the hour's
   heading, introduction and parts, the parents & guardians heading, introduction and points, the
   "At the table" heading, introduction and captions, the questions & policies (my real policies),
   the booking heading and introduction, the finding-us note, the footer line and the search title
   and description. Keep field ids, types, limits and photos. Keep the sample photos (they stay
   labelled "Sample photo" until I upload my own).
   Keep the honesty rules: one booking is one session with one student — no group classes, study
   groups, packages, terms or memberships; no promised grades, scores, admissions or "results"; no
   invented degrees, certifications, years of experience, success rates, reviews or testimonials;
   the booking form never asks for school reports, test scores, diagnoses or health information;
   for a student under 18 a parent or guardian books with their own details; nothing is paid online;
   no online-meeting links; no session lengths or prices written into the copy.
4. Only if violet clearly doesn't fit my brand (otherwise skip this step): change the default of
   brand.accent in src/content/site.ts (a deep colour that keeps white text at 4.5:1 — navy,
   forest, oxblood, graphite) and the light colour in src/admin-theme.css. The lime band, the
   violet booking band and the graphite footer are part of the design and stay.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent sessions, prices, opening hours or credentials I haven't told you about —
sessions, prices and hours are set in the dashboard. When done, run npm run build and fix any
error, then show me the result with npm run dev.
```

## After the prompt

- **Your sessions:** dashboard → Services. One booking is one session with you, for one service,
  with one student.
  - **Kinds.** The page reads each session's kind from the words in its name (then its description):
    *first conversation/session/meeting, introduction, consultation, assessment, welcome* → **First
    conversation** (listed first, as "New here? Start with"); *SAT, ACT, PSAT, test, exam, prep* →
    **Test prep**; *study, skills, homework, habits* → **Study skills**; *statistics, probability,
    data* → **Statistics**; *calculus, precalculus, trigonometry* → **Calculus**; *algebra,
    pre-algebra, geometry, math* → **Algebra**. Anything else is shown as a plain session. The kind
    picks the session's photograph.
  - **Who it's for.** End a description with `Good for:` — `Good for: Algebra 1 and 2, grades 8 to
    10`. Describe the course or situation, never a promised outcome.
  - **Free first conversation.** A price of 0 shows as **Free** everywhere, including the "Given"
    line on the first screen.
- **Where are you stuck?:** Website → Where are you stuck?. Each answer points to the first session
  with a word starting with the words you give ("Algebra", "SAT"); if none does, to the first session
  of the same kind ("SAT" still finds a session renamed "Exam Coaching"). An answer that finds nothing
  is hidden, and if no answer finds a session your sessions themselves become the choices — renaming
  never leaves the section broken or empty.
- **The hour:** Website → The hour. Give each part its minutes; the line is drawn to scale and the
  total is added up for you. It illustrates a typical session — the real lengths come from Services.
- **Session photos:** Website → Sessions — one upright photo each for first conversation, algebra,
  calculus, statistics, test prep and study skills.
- **Headings:** wrap a word or two in *asterisks* to set them in italics with the highlighter across
  them.
- **Photos:** Website → each section. Use only your own studio, and students only with written
  permission (a parent's or guardian's under 18). The "Sample photo" label disappears from each one
  you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).
