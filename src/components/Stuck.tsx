import { useId, useMemo, useState } from 'react';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, minutesLabel, priceTerms, splitDescription } from '../lib/services';
import { resolveAnswers } from '../lib/stuck';
import { Emphasis } from './Emphasis';
import { SectionLabel } from './SectionLabel';

interface StuckProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * "Where are you stuck?", on the highlighter band. The visitor picks the sentence that sounds like
 * them (a real radio group: arrow keys move, the choice is announced), and the answer is set like the
 * end of a worked problem — "∴" and the session's name, why it fits, its real length and price from
 * the engine, and its own Book button. Answers find their session by name, else by kind, and fall back
 * to the sessions themselves when none resolves (src/lib/stuck.ts) — renamed services never break it.
 */
export function Stuck({ values, services, business, onBook }: StuckProps) {
  const id = useId();
  const answers = useMemo(
    () => (services.status === 'ready' ? resolveAnswers(values['stuck.answers'], services.data) : []),
    [values, services],
  );
  const [chosen, setChosen] = useState(0);
  if (answers.length === 0) return null;
  const current = answers[Math.min(chosen, answers.length - 1)];
  const locale = business?.locale ?? 'en-US';
  const price = priceTerms(current.service, locale);
  const goodFor = splitDescription(current.service.description).goodFor;

  return (
    <section className="stuck" id="stuck" aria-labelledby="stuck-title">
      <div className="shell margin-grid">
        <SectionLabel n="02" tone="ink">
          Where to start
        </SectionLabel>
        <div className="margin-body stuck__grid">
          <div className="stuck__ask">
            <h2 id="stuck-title" className="section-title" data-reveal="">
              <Emphasis text={values['stuck.title']} />
            </h2>
            {values['stuck.intro'] && <p className="section-intro">{values['stuck.intro']}</p>}
            <fieldset className="choices">
              <legend className="sr-only">Which sounds most like you?</legend>
              {answers.map((a, i) => (
                <label className="choice" key={`${i}-${a.label}`}>
                  <input type="radio" name={`${id}-stuck`} checked={i === chosen} onChange={() => setChosen(i)} />
                  <span className="choice__box" aria-hidden="true" />
                  <span className="choice__text">{a.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="worked" aria-live="polite">
            <p className="worked__label">Then start with</p>
            <p className="worked__answer" key={current.service.id}>
              <span className="worked__therefore" aria-hidden="true">
                ∴
              </span>
              <span className="worked__name">{current.service.name}</span>
            </p>
            {current.why && <p className="worked__why">{current.why}</p>}
            {goodFor && (
              <p className="worked__good">
                <span>Good for</span> {goodFor}
              </p>
            )}
            <dl className="worked__facts">
              <div>
                <dt>Length</dt>
                <dd>
                  <span aria-hidden="true">{minutesLabel(current.service.durationMinutes)}</span>
                  <span className="sr-only">{durationSpoken(current.service.durationMinutes)}</span>
                </dd>
              </div>
              <div>
                <dt>{price.label}</dt>
                <dd>{price.amount}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn--accent" aria-label={`Book ${current.service.name}`} onClick={() => onBook(current.service.id)}>
              Book this session
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
