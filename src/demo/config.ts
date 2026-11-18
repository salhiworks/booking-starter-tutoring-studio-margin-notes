import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 * Bookings for students under 18 are made by a parent or guardian, so most sample
 * "students" here are the adults who booked.
 */
export const demoConfig: DemoConfig = {
  id: 'tutoring-studio-margin-notes',
  preset: sitePreset,
  business: {
    name: 'Lemma Math Studio',
    timezone: 'America/Chicago',
    email: 'hello@lemma.example',
    phone: '+1 608-555-0147',
    address: '1857 Monroe St, Suite 2, Madison, WI 53711',
  },
  ownerEmail: 'owner@lemma.example',
  referencePrefix: 'LM',
  sampleNotes: [
    'Booking for my son Theo, grade 10 — Algebra 2, unit test on quadratics next Friday.',
    'Returning to college after ten years; intro statistics this semester.',
    'Maya, grade 11. Derivatives make sense in class but not on homework.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '+1 608 555 0112' },
    { name: 'Jonah Becker', email: 'jonah.becker@example.com', phone: '+1 608 555 0126' },
    { name: 'Alicia Moreno', email: 'alicia.moreno@example.com', phone: '+1 608 555 0133' },
    { name: 'Kevin Osei', email: 'kevin.osei@example.com', phone: '+1 608 555 0148' },
    { name: 'Hannah Lindqvist', email: 'hannah.lindqvist@example.com', phone: '+1 608 555 0150' },
    { name: 'Marcus Chen', email: 'marcus.chen@example.com', phone: '+1 608 555 0161' },
    { name: 'Sofia Rossi', email: 'sofia.rossi@example.com', phone: '+1 608 555 0174' },
    { name: 'Daniel Okafor', email: 'daniel.okafor@example.com', phone: '+1 608 555 0187' },
    { name: 'Emma Nowak', email: 'emma.nowak@example.com', phone: '+1 608 555 0195' },
    { name: 'Leah Goldberg', email: 'leah.goldberg@example.com', phone: '+1 608 555 0109' },
  ],
};
