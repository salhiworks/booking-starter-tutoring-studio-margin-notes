import type { CSSProperties } from 'react';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/** "5" → 5; anything that isn't a whole number of minutes is left out. */
const toMinutes = (v: string) => {
  const n = Number.parseInt(v.trim(), 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 240) : 0;
};

/**
 * How the hour is spent, drawn to scale: the owner's parts of a session laid end to end on one
 * number line — each part as long as its minutes, the running total written under its start, the
 * total at the end. Drawn left to right as it comes into view (instantly under reduced motion). On
 * phones the same line stands upright beside the parts. It illustrates a typical session; the real
 * lengths of every session come from the engine, in Sessions & prices.
 */
export function Hour({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const sized = values['hour.parts'].map((p) => ({ ...p, n: toMinutes(p.minutes) })).filter((p) => p.n > 0);
  const parts = sized.map((p, i) => ({ ...p, start: sized.slice(0, i).reduce((sum, q) => sum + q.n, 0) }));
  const total = sized.reduce((sum, p) => sum + p.n, 0);
  const photo = values['hour.photo'];
  return (
    <section className="hour margin-section" id="hour" aria-labelledby="hour-title">
      <div className="shell margin-grid">
        <SectionLabel n="04">The hour</SectionLabel>
        <div className="margin-body">
          <div className={`hour__top${photo ? '' : ' hour__top--text'}`}>
            <header className="hour__head">
              <h2 id="hour-title" className="section-title" data-reveal="">
                <Emphasis text={values['hour.title']} />
              </h2>
              {values['hour.intro'] && <p className="section-intro">{values['hour.intro']}</p>}
            </header>
            {photo && (
              <figure className="hour__photo" data-reveal="">
                <Photo image={photo} sizes="(min-width: 1080px) 34vw, 100vw" className="frame--wide" />
                {!ownerFields.includes('hour.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
              </figure>
            )}
          </div>
          {parts.length > 0 && (
            <div className="timeline" data-reveal="">
              <ol className="timeline__parts" style={{ '--parts': parts.length } as CSSProperties} role="list" aria-label={`A typical session, ${total} minutes`}>
                {parts.map((p, i) => {
                  const start = p.start;
                  return (
                    <li className="part-of-hour" key={`${i}-${p.title}`} style={{ '--n': p.n, '--i': i, '--start': start, '--total': total } as CSSProperties}>
                      <span className="part-of-hour__bar" aria-hidden="true" />
                      <span className="part-of-hour__at" aria-hidden="true">
                        {start}
                      </span>
                      <h3 className="part-of-hour__title">
                        {p.title}
                        <span className="part-of-hour__len">
                          {p.n} min<span className="sr-only">, from minute {start}</span>
                        </span>
                      </h3>
                      {p.text && <p className="part-of-hour__text">{p.text}</p>}
                    </li>
                  );
                })}
              </ol>
              <p className="timeline__total" aria-hidden="true">
                {total}
                <span> min</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
