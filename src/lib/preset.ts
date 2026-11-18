import type { Preset } from '@profitstudio/booking-engine';

/**
 * Lemma Math Studio's own preset (INTEGRATION.md §5): the sample services, hours and policies preview
 * mode shows, and the starter set the dashboard offers an owner who has no services yet
 * (<BookingAdmin presets>). Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE tutoring session: a reserved block of the tutor's time with
 * ONE student, at the studio, on the studio's one calendar (one tutor, one table), for ONE service.
 * There are no classes, no study groups, no second tutor and no online lessons. Its length is the real
 * time at the table; the buffer after it is the tutor's time to write the session note and reset. The
 * tutor reviews and confirms every request (`autoConfirm: false`) — for a student under 18 the person
 * who books is a parent or guardian.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of that session, paid at the
 * studio — never online. The first conversation is free (price 0). No packages, terms or memberships
 * (they need an engine with payments).
 *
 * Honest teaching: a description never promises a grade, a score or an admission, and the booking
 * form never asks for school reports, diagnoses or other sensitive details (see CLAUDE.md). A
 * description may end with "Good for: …" — who it usually suits, in plain terms. The website shows it
 * as its own line.
 *
 * The website reads each session's KIND (first conversation · algebra · calculus · statistics · test
 * prep · study skills) from its name (src/lib/services.ts) to pick its photograph and its place in
 * "Where are you stuck?".
 */
export const sitePreset = {
  id: 'tutoring-studio',
  label: 'Private Tutoring Studio',
  terminology: { customer: 'student', customers: 'students', booking: 'session', bookings: 'sessions' },
  previewBusiness: {
    name: 'Sample Tutoring Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 608-555-0100',
      address: '100 Example Street, Madison, WI',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 1440,
    maxAdvanceDays: 42,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // One tutor, after school on weekdays and a Saturday morning; closed Sunday.
  workingHours: [
    { weekday: 1, start: '14:30', end: '20:00' },
    { weekday: 2, start: '14:30', end: '20:00' },
    { weekday: 3, start: '14:30', end: '20:00' },
    { weekday: 4, start: '14:30', end: '20:00' },
    { weekday: 5, start: '14:30', end: '18:00' },
    { weekday: 6, start: '09:00', end: '14:00' },
  ],
  services: [
    {
      name: 'First Conversation',
      description:
        'Half an hour at the studio with the student — and a parent or guardian if they are under 18. We look at some recent work together, talk about the course, and agree where tutoring should start. Nothing to sign up for. Good for: anyone new to the studio',
      durationMinutes: 30,
      bufferAfterMinutes: 10,
      priceCents: 0,
      priceFrom: false,
    },
    {
      name: 'Algebra & Geometry',
      description:
        'From linear equations to proofs. We find the step that went missing, rebuild from there, and the student does the working — out loud, at their pace. Good for: Algebra 1 and 2, Geometry, grades 8 to 10',
      durationMinutes: 55,
      bufferAfterMinutes: 10,
      priceCents: 8000,
      priceFrom: false,
    },
    {
      name: 'Precalculus & Calculus',
      description:
        'Functions, trigonometry, limits, derivatives and integrals: the idea behind each rule first, then practice until the method holds without notes. Good for: grades 11 and 12, AP Calculus, first-year college calculus',
      durationMinutes: 55,
      bufferAfterMinutes: 10,
      priceCents: 9500,
      priceFrom: false,
    },
    {
      name: 'Statistics',
      description:
        'Data, probability and inference, worked through with real examples and the calculator or software the course uses. Good for: AP Statistics, an introductory college course, adults returning to study',
      durationMinutes: 55,
      bufferAfterMinutes: 10,
      priceCents: 9000,
      priceFrom: false,
    },
    {
      name: 'SAT & ACT Math Prep',
      description:
        'A longer session: one timed section, then every question that went wrong worked through, and a realistic plan for the weeks before the test. Steady practice, not score promises. Good for: students with a test date in the next few months',
      durationMinutes: 80,
      bufferAfterMinutes: 10,
      priceCents: 12500,
      priceFrom: false,
    },
    {
      name: 'Study Skills for Math',
      description:
        'How to take notes in a math class, check your own work, keep an error log and prepare for a test without cramming the night before. Good for: students who follow in class but lose marks in tests',
      durationMinutes: 45,
      bufferAfterMinutes: 10,
      priceCents: 7000,
      priceFrom: false,
    },
  ],
} satisfies Preset;
