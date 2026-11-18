import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * How the tutor teaches: the heading and introduction beside a wide photograph, then three principles
 * set like numbered equations — each title runs to its number, "(1)", at the right-hand edge.
 */
export function Approach({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['approach.photo'];
  const points = values['approach.points'];
  return (
    <section className="approach margin-section" id="approach" aria-labelledby="approach-title">
      <div className="shell margin-grid">
        <SectionLabel n="01">Approach</SectionLabel>
        <div className="margin-body">
          <div className={`approach__top${photo ? '' : ' approach__top--text'}`}>
            <header className="approach__head">
              <h2 id="approach-title" className="section-title" data-reveal="">
                <Emphasis text={values['approach.title']} />
              </h2>
              {values['approach.intro'] && <p className="section-intro">{values['approach.intro']}</p>}
            </header>
            {photo && (
              <figure className="approach__photo" data-reveal="">
                <Photo image={photo} sizes="(min-width: 1080px) 40vw, 100vw" className="frame--wide" />
                {!ownerFields.includes('approach.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
              </figure>
            )}
          </div>
          {points.length > 0 && (
            <ol className="equations" role="list">
              {points.map((p, i) => (
                <li className="equation" key={`${i}-${p.title}`} data-reveal="">
                  <h3 className="equation__title">
                    <span>{p.title}</span>
                    <span className="equation__leader" aria-hidden="true" />
                    <span className="equation__n" aria-hidden="true">
                      ({i + 1})
                    </span>
                  </h3>
                  {p.text && <p className="equation__text">{p.text}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
