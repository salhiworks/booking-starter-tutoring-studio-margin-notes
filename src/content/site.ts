import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, lengths, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set in italics with
 * the highlighter pulled across them (Emphasis).
 *
 * Copy rules (CLAUDE.md): honest tutoring — no promised grades, scores or
 * admissions, no invented qualifications, years, success rates, reviews or
 * testimonials, and never a request for school reports, diagnoses or other
 * sensitive details.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos of your own studio, and of students only with their (and, under 18, a parent’s or guardian’s) written permission, or photos you have the right to use. Never show a student’s graded work, scores or results.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const T = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1200 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them in italics, with the highlighter pulled across them.';
const SESSION_PHOTO = `Upright (4:5), shown beside the session. A student working at the table reads best; keep hands and paper near the middle. ${SAMPLE_HELP}`;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo and the colour of the main buttons.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The name in the header and, very large, in the footer. One or two short words read best.',
          default: 'Lemma',
          maxLength: 24,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Math Studio',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo on a transparent background, drawn for a light background (the header is paper white). It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'The tutor’s pen: the main buttons, the margin rule, numbers and selected choices. Buttons carry white text, so pick a deep colour — violet ink (the original), navy, forest, oxblood, graphite. Light colours are refused because white text would not read on them.',
          default: '#4b22c9',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction, the main photograph and the note pinned to it.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Math tutoring studio', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'Monroe Street, Madison', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large. Say how learning feels here, never a promised grade or score. ${EMPHASIS}`,
          default: 'Math, *worked out* together.',
          maxLength: 44,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One tutor, one student, one table. Patient, unhurried sessions in algebra, calculus, statistics and test prep — for high school, college and adults coming back to math.',
          maxLength: 220,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book a session', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.note',
          label: 'Note on the photo',
          help: 'A short margin note, the kind a tutor writes beside a student’s working. Leave empty for none.',
          default: 'Step 3 — check the sign before you divide.',
          maxLength: 60,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (upright)',
          help: `Upright (4:5), shown tall beside the headline. Hands and paper from above read best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-working-960.webp',
            alt: 'Seen from above: two hands with pencils pointing at the same line of a worksheet, its rows marked in mint and pink highlighter.',
            width: 960,
            height: 1200,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'approach',
      label: 'Approach',
      description: 'How you teach: three short principles beside a photograph.',
      fields: [
        { type: 'text', id: 'approach.title', label: 'Heading', help: EMPHASIS, default: 'Nobody learns math *by watching.*', maxLength: 52, required: true },
        {
          type: 'longText',
          id: 'approach.intro',
          label: 'Introduction',
          default:
            'So the pencil stays with the student. I ask, point and wait — and we slow down at exactly the step where it stopped making sense.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'approach.points',
          label: 'Three principles',
          help: 'Up to three: a short title and a sentence or two each.',
          itemLabel: 'Principle',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 32, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 220, rows: 3 },
          ],
          default: [
            { title: 'Find the missing step', text: 'Most trouble in math starts a few topics back. We look for the step that never quite landed, and rebuild from there.' },
            { title: 'Work it out loud', text: 'The student explains each line as they write it. Saying it is how you find out whether you understand it.' },
            { title: 'Leave with a plan', text: 'Every session ends with a short written note: what we covered, and what to practise before next time.' },
          ],
        },
        {
          type: 'image',
          id: 'approach.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2). A tutor and a student at work reads best. ${SAMPLE_HELP}`,
          default: L('approach-point', 'A tutor leaning in and pointing at a notebook while a smiling student writes, at a low wooden table in front of a grey sofa.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'stuck',
      label: 'Where are you stuck?',
      description:
        'Answers that point to a session. Each answer points to the first session whose name has a word starting with the words you give (for example “Algebra” or “SAT”); if none does, to the first session of the same kind (an answer with “SAT” still finds a session renamed “Exam Coaching”). An answer that finds nothing is hidden, and if no answer finds a session, your sessions themselves are offered as the choices.',
      fields: [
        { type: 'text', id: 'stuck.title', label: 'Heading', help: EMPHASIS, default: 'Where are *you stuck?*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'stuck.intro',
          label: 'Introduction',
          default: 'Pick the one that sounds most like you. Not sure? The first conversation is for exactly that.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'list',
          id: 'stuck.answers',
          label: 'Answers',
          help: 'Up to six. “Why” is one or two sentences shown beside the session.',
          itemLabel: 'Answer',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'label', label: 'Answer', default: '', maxLength: 56, required: true },
            { type: 'text', id: 'match', label: 'Words in the session’s name', default: '', maxLength: 30, required: true },
            { type: 'longText', id: 'why', label: 'Why this session', default: '', maxLength: 200, rows: 2 },
          ],
          default: [
            { label: 'We’re new and not sure where to start', match: 'First Conversation', why: 'Half an hour with some recent work on the table. We agree where tutoring should begin — or whether it’s needed at all.' },
            { label: 'Algebra stopped making sense somewhere', match: 'Algebra', why: 'We go back to the step that went missing and build forward from there, one line at a time.' },
            { label: 'Calculus is moving faster than I am', match: 'Calculus', why: 'The idea behind each rule first, then enough practice that the method holds without notes.' },
            { label: 'I’m taking statistics for college or work', match: 'Statistics', why: 'Real examples, worked with the calculator or software your course actually uses.' },
            { label: 'The SAT or ACT is coming up', match: 'SAT', why: 'A timed section, every missed question worked through, and a realistic plan for the weeks that are left.' },
            { label: 'I follow in class, then lose marks in tests', match: 'Study Skills', why: 'Checking your own work, an error log and a way to prepare that isn’t the night before.' },
          ],
        },
      ],
    },
    {
      id: 'sessions',
      label: 'Sessions',
      description:
        'The words and photographs around your sessions. The sessions themselves — names, descriptions, lengths and prices — are edited in Services. A description can end with “Good for: Algebra 1 and 2”, shown as its own line. The photo beside each session is chosen from its name: first conversation, algebra, calculus, statistics, test prep (SAT, ACT, test, exam) or study skills.',
      fields: [
        { type: 'text', id: 'sessions.title', label: 'Heading', help: EMPHASIS, default: 'Sessions *& prices.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'sessions.intro',
          label: 'Introduction',
          default: 'Every session is one to one, at the studio. Lengths are the real time at the table; prices are paid at the studio, never online.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'image', id: 'sessions.photoIntro', label: 'Photo — first conversation', help: SESSION_PHOTO, default: P('session-intro', 'A tutor kneeling beside a student at a low table, both looking at a worksheet marked with highlighter.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoAlgebra', label: 'Photo — algebra', help: SESSION_PHOTO, default: P('session-algebra', 'A student in glasses following a tutor’s finger along a line of her notebook, pencil ready.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoCalculus', label: 'Photo — calculus', help: SESSION_PHOTO, default: P('session-calculus', 'A student writing in a notebook with a mint pen while a tutor’s hand points to the next line.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoStatistics', label: 'Photo — statistics', help: SESSION_PHOTO, default: P('session-statistics', 'A student leaning over a worksheet covered in highlighted rows, a tutor’s pencil beside hers.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoTest', label: 'Photo — test prep', help: SESSION_PHOTO, default: P('session-test', 'A student concentrating as she writes, the tutor’s hand resting at the edge of the page.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoSkills', label: 'Photo — study skills', help: SESSION_PHOTO, default: P('session-skills', 'A student writing notes in an open exercise book with a mint pen, a stack of notebooks beside her.'), aspectRatio: 4 / 5 },
        {
          type: 'text',
          id: 'sessions.footnote',
          label: 'Small print under the sessions',
          default: 'One session per booking. Want a weekly time? Book each session on its own — there are no packages, terms or memberships to buy.',
          maxLength: 200,
        },
      ],
    },
    {
      id: 'hour',
      label: 'The hour',
      description: 'How a session is usually spent, drawn to scale: each part’s minutes set its length on the line.',
      fields: [
        { type: 'text', id: 'hour.title', label: 'Heading', help: EMPHASIS, default: 'How the hour *is spent.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'hour.intro',
          label: 'Introduction',
          default: 'A typical subject session, drawn to scale. The shape stays the same; what fills it comes from the student’s own class, homework and questions.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'hour.parts',
          label: 'Parts of the session',
          help: 'Up to five, in order. Minutes are whole numbers; they are drawn to scale and added up.',
          itemLabel: 'Part',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'minutes', label: 'Minutes', default: '10', maxLength: 3, required: true },
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 24, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 180, rows: 2 },
          ],
          default: [
            { minutes: '5', title: 'Check in', text: 'What happened in class this week, what’s due, and what felt shaky.' },
            { minutes: '30', title: 'Work it out', text: 'The student holds the pencil and explains each line. The tutor asks, points — and waits.' },
            { minutes: '15', title: 'Try it alone', text: 'A few problems without help, so we can both see what has stuck.' },
            { minutes: '5', title: 'The note', text: 'What we covered and what to practise, written down before the student leaves.' },
          ],
        },
        {
          type: 'image',
          id: 'hour.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2). ${SAMPLE_HELP}`,
          default: L('hour-side', 'A tutor and a student side by side at a low table, both writing on the same highlighted worksheet.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'guardians',
      label: 'Parents & guardians',
      description: 'How bookings for students under 18 work: who books, who is contacted, what you never ask for.',
      fields: [
        { type: 'text', id: 'guardians.title', label: 'Heading', help: EMPHASIS, default: 'For parents *and guardians.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'guardians.intro',
          label: 'Introduction',
          default: 'Most students here are in high school. This is how it works when the student is under 18.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'list',
          id: 'guardians.points',
          label: 'Points',
          help: 'Up to four: a short title and a sentence or two each.',
          itemLabel: 'Point',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 32, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            { title: 'You book, you hear from us', text: 'A parent or guardian makes the booking with their own name, email and phone. Every confirmation and change goes to you.' },
            { title: 'Stay, or wait nearby', text: 'You are welcome at the table for the first conversation, and in the front room during any session. The study-room door stays open.' },
            { title: 'Nothing sensitive online', text: 'We never ask for school reports, test scores, diagnoses or health information in the booking form. If something matters, tell the tutor in person.' },
            { title: 'A note after every session', text: 'What we covered and what to practise, written at the end of each session — the student takes it home.' },
          ],
        },
        {
          type: 'image',
          id: 'guardians.photo',
          label: 'Photo (tall)',
          help: `Tall (2:3). ${SAMPLE_HELP}`,
          default: T('guardian-alone', 'A student sitting on the floor against a grey sofa, working through a highlighted worksheet on her own, an open book beside her.'),
          aspectRatio: 2 / 3,
        },
      ],
    },
    {
      id: 'table',
      label: 'At the table',
      description: 'Three photographs of the studio and the work, each with a short caption.',
      fields: [
        { type: 'text', id: 'table.title', label: 'Heading', help: EMPHASIS, default: 'At the *table.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'table.intro',
          label: 'Introduction',
          default: 'Pencils, highlighters, squared paper and one low table by the window. Nothing to log in to, nothing on a screen.',
          maxLength: 200,
          rows: 2,
        },
        { type: 'image', id: 'table.photo1', label: 'Photo 1 (wide)', help: `Wide (3:2). ${SAMPLE_HELP}`, default: L('table-pen', 'Close up: a hand with a mint pen writing in an exercise book, the student blurred behind.'), aspectRatio: 3 / 2 },
        { type: 'text', id: 'table.caption1', label: 'Caption 1', default: 'Writing out every line', maxLength: 48 },
        { type: 'image', id: 'table.photo2', label: 'Photo 2 (tall)', help: `Tall (2:3). ${SAMPLE_HELP}`, default: T('table-notebook', 'A student writing in a highlighted workbook on a wooden table beside an orange notebook and a phone.'), aspectRatio: 2 / 3 },
        { type: 'text', id: 'table.caption2', label: 'Caption 2', default: 'Highlighter for what changed', maxLength: 48 },
        { type: 'image', id: 'table.photo3', label: 'Photo 3 (tall)', help: `Tall (2:3). ${SAMPLE_HELP}`, default: T('table-above', 'From above: a tutor and a student kneeling at a table, two pencils on one worksheet.'), aspectRatio: 2 / 3 },
        { type: 'text', id: 'table.caption3', label: 'Caption 3', default: 'Two pencils, one problem', maxLength: 48 },
      ],
    },
    {
      id: 'faq',
      label: 'Questions & policies',
      description: 'Practical answers before a first session. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Good *questions.*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'Who teaches the sessions?',
              answer: 'One tutor teaches every session here — the same person each week, who knows the student’s course and what happened last time. Ask anything you like at the first conversation.',
            },
            {
              question: 'Which students do you work with?',
              answer: 'High school students from about grade 8, college students, and adults coming back to math. For a student under 18, a parent or guardian books and is welcome to stay for the first conversation.',
            },
            {
              question: 'Can you guarantee a grade or a test score?',
              answer: 'No — and we’d be wary of anyone who does. What we promise is patient, prepared sessions and an honest note after each one about what is working and what isn’t yet.',
            },
            {
              question: 'Do you teach online?',
              answer: 'Not at the moment. Every session is in person, at the studio, at one table.',
            },
            {
              question: 'How often should we book?',
              answer: 'Once a week suits most students during a course, sometimes more in the weeks before a test. Each session is booked on its own — there are no packages or terms to buy.',
            },
            {
              question: 'What should the student bring?',
              answer: 'The class notes, homework or practice test they are working on, a pencil, and the calculator their class uses. Paper, highlighters and water are here.',
            },
            {
              question: 'What if we need to cancel?',
              answer: 'Please let us know at least 24 hours before, so another student can have the time. Arriving more than ten minutes late may mean a shorter session.',
            },
            {
              question: 'How do we pay?',
              answer: 'At the studio, after the session, by card or cash. Nothing is paid online, and there are no deposits.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Start with *one session.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a session and a time. Every request is read and confirmed by your tutor, usually within a day.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5), shown in the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: P('book-smile', 'A student smiling down at her worksheet as she writes, a tutor’s hand pointing from the side.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find you.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find *the studio.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'Suite 2 is up one flight of stairs above the bookshop on Monroe Street. Street parking on Monroe and Harrison, a bike rack by the door, and the bus stops outside. Students under 18 are dropped off and collected in the front room.',
          maxLength: 400,
          rows: 3,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Math tutoring · one student at a time · Madison', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Lemma Math Studio — one-to-one math tutoring in Madison',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent math tutoring studio in Madison: one tutor, one student, in person. Algebra, calculus, statistics, SAT & ACT math and study skills. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});
