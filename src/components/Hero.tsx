import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { cheapest, kindOf, lengthRange, priceLabel } from '../lib/services';
import type { OpeningInfo } from '../lib/useOpening';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** imagesizes must match the preload in index.html. */
export const HERO_SIZES = '(min-width: 1024px) min(34vw, 36rem), (min-width: 640px) 70vw, 100vw';

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  opening: OpeningInfo;
  onBook: StartBooking;
}

/**
 * The first screen, on squared paper. The headline on the left (its emphasised words in italics with
 * the highlighter pulled across them), the introduction, the main action and — set like the opening
 * of a problem — "Given": one tutor to one student, the range of lengths, the lowest price and the
 * first conversation, all live from the engine. On the right, an upright photograph from above with
 * the tutor's margin note pinned to its edge. The photograph's height follows the screen's, so the
 * action stays in the first screen from 320 × 568 to 2560 × 1440.
 */
export function Hero({ values, ownerFields, services, business, opening, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  const note = values['hero.note'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker">
            {kicker && <span>{kicker}</span>}
            {place && <span>{place}</span>}
            {opening.status && (
              <span className="hero__open" data-open={opening.status.open}>
                <span className="hero__open-dot" aria-hidden="true" />
                {opening.status.text}
              </span>
            )}
          </p>
          <h1 id="hero-title" className="hero__title">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
          <div className="hero__actions">
            <a className="btn btn--accent btn--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero__link" href="#stuck">
              Not sure where to start?
            </a>
          </div>
          <Given services={services} business={business} />
        </div>
        {photo && (
          <figure className="hero__figure">
            <Photo image={photo} sizes={HERO_SIZES} priority className="frame--hero" />
            {!own && <figcaption className="photo-label">Sample photo</figcaption>}
            {note && (
              <p className="hero__note">
                <span className="hero__note-mark" aria-hidden="true">
                  ✎
                </span>
                {note}
              </p>
            )}
          </figure>
        )}
      </div>
    </section>
  );
}

/** "Given: 1 : 1 · 30–80 min · from $70 · first conversation free" — live from the engine. */
function Given({ services, business }: { services: Resource<Service[]>; business: Business | null }) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const locale = business?.locale ?? 'en-US';
  const low = cheapest(services.data);
  const range = lengthRange(services.data);
  const first = services.data.find((s) => kindOf(s) === 'intro');
  return (
    <div className="given">
      <p className="given__head" aria-hidden="true">
        Given
      </p>
      <dl className="given__list">
        <div>
          <dt>Tutor to student</dt>
          <dd>
            <span aria-hidden="true">1 : 1</span>
            <span className="sr-only">One to one</span>
          </dd>
        </div>
        {range && (
          <div>
            <dt>Sessions</dt>
            <dd>{range}</dd>
          </div>
        )}
        {low && (
          <div>
            <dt>From</dt>
            <dd>{priceLabel(low, locale).replace(/^from /, '')}</dd>
          </div>
        )}
        {first && (
          <div>
            <dt>{first.name}</dt>
            <dd>{priceLabel(first, locale)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
