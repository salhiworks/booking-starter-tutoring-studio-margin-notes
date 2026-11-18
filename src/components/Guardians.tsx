import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

const ROMAN = ['i', 'ii', 'iii', 'iv'];

/**
 * For parents and guardians: who books for a student under 18, who hears from the studio, where they
 * can be during a session, and what the site never asks for — beside a tall photograph.
 */
export function Guardians({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['guardians.photo'];
  const points = values['guardians.points'];
  return (
    <section className="guardians margin-section" id="guardians" aria-labelledby="guardians-title">
      <div className="shell margin-grid">
        <SectionLabel n="05">Parents &amp; guardians</SectionLabel>
        <div className={`margin-body guardians__grid${photo ? '' : ' guardians__grid--text'}`}>
          {photo && (
            <figure className="guardians__photo" data-reveal="">
              <Photo image={photo} sizes="(min-width: 1080px) 26vw, (min-width: 640px) 40vw, 100vw" className="frame--tall" />
              {!ownerFields.includes('guardians.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
            </figure>
          )}
          <div className="guardians__copy">
            <h2 id="guardians-title" className="section-title" data-reveal="">
              <Emphasis text={values['guardians.title']} />
            </h2>
            {values['guardians.intro'] && <p className="section-intro">{values['guardians.intro']}</p>}
            {points.length > 0 && (
              <ul className="clauses" role="list">
                {points.map((p, i) => (
                  <li className="clause" key={`${i}-${p.title}`}>
                    <span className="clause__n" aria-hidden="true">
                      {ROMAN[i] ?? i + 1}.
                    </span>
                    <h3 className="clause__title">{p.title}</h3>
                    {p.text && <p className="clause__text">{p.text}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
