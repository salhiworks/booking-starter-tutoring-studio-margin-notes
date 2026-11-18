import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

const SLOTS = [
  { photo: 'table.photo1', caption: 'table.caption1', frame: 'frame--wide', sizes: '(min-width: 1080px) 46vw, 100vw' },
  { photo: 'table.photo2', caption: 'table.caption2', frame: 'frame--tall', sizes: '(min-width: 1080px) 22vw, 50vw' },
  { photo: 'table.photo3', caption: 'table.caption3', frame: 'frame--tall', sizes: '(min-width: 1080px) 22vw, 50vw' },
] as const;

/** At the table: three photographs set like figures in a textbook — "Fig. 1", with a caption. */
export function Table({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const figures = SLOTS.map((s) => ({ ...s, image: values[s.photo] as SiteImage | null, text: values[s.caption] })).filter((f) => f.image);
  if (figures.length === 0) return null;
  return (
    <section className="table margin-section" id="table" aria-labelledby="table-title">
      <div className="shell margin-grid">
        <SectionLabel n="06">At the table</SectionLabel>
        <div className="margin-body">
          <header className="table__head">
            <h2 id="table-title" className="section-title" data-reveal="">
              <Emphasis text={values['table.title']} />
            </h2>
            {values['table.intro'] && <p className="section-intro">{values['table.intro']}</p>}
          </header>
          <div className={`figures figures--${figures.length}`}>
            {figures.map((f, i) => (
              <figure className={`figure figure--${i + 1}`} key={f.photo} data-reveal="">
                <Photo image={f.image as SiteImage} sizes={f.sizes} className={f.frame} />
                {!ownerFields.includes(f.photo) && <span className="photo-label">Sample photo</span>}
                <figcaption>
                  <span className="figure__n">Fig. {i + 1}</span>
                  {f.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
