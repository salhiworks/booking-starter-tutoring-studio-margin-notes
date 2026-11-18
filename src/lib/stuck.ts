import type { Service } from '@profitstudio/booking-engine';
import { indexOrder, kindOf, splitDescription } from './services';

/** One "Where are you stuck?" answer as the owner wrote it (src/content/site.ts → stuck.answers). */
export interface StuckAnswer {
  label: string;
  match: string;
  why: string;
}

export interface ResolvedAnswer {
  label: string;
  why: string;
  service: Service;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** "SAT" → finds "SAT & ACT Math Prep", never "Conversation": the words must start a word in the name. */
function byName(list: readonly Service[], words: string): Service | undefined {
  const re = new RegExp(`(^|[^\\p{L}\\p{N}])${escape(words)}`, 'iu');
  return list.find((s) => re.test(s.name));
}

/**
 * The answers the page can show, each pointing to a live engine service — so renaming, removing or
 * adding services never leaves "Where are you stuck?" broken or empty:
 *
 *   1. by NAME — the answer's words start a word in a session's name ("Algebra" → "Algebra & Geometry");
 *   2. else by KIND — the answer's words name a kind (src/lib/services.ts), and the first session of that
 *      kind is used ("SAT" still finds a session renamed "Exam Coaching", both test prep);
 *   3. else the answer is hidden.
 *
 * If no answer resolves at all (every session renamed beyond recognition), the section falls back to the
 * sessions themselves: one choice per session — its name, and the first sentence of its description as
 * the "why". With no sessions there is nothing to show.
 */
export function resolveAnswers(answers: readonly StuckAnswer[], services: readonly Service[]): ResolvedAnswer[] {
  const list = indexOrder(services);
  if (list.length === 0) return [];
  const resolved = answers
    .map((a) => {
      const words = a.match.trim();
      if (!words) return null;
      let service = byName(list, words);
      if (!service) {
        const kind = kindOf({ name: words, description: null });
        if (kind !== 'other') service = list.find((s) => kindOf(s) === kind);
      }
      return service ? { label: a.label, why: a.why, service } : null;
    })
    .filter((a): a is ResolvedAnswer => a !== null);
  if (resolved.length > 0) return resolved;
  return list.map((service) => {
    const lead = splitDescription(service.description).lead;
    const first = lead.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? lead;
    return { label: service.name, why: first, service };
  });
}
