import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Business, Service, SiteImage } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, indexOrder, kindOf, KIND_LABEL, minutesLabel, priceTerms, splitDescription } from '../lib/services';
import type { SessionKind } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

interface SessionsProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

const PHOTO_FIELD: Record<SessionKind, keyof SiteValues & `sessions.photo${string}`> = {
  intro: 'sessions.photoIntro',
  algebra: 'sessions.photoAlgebra',
  calculus: 'sessions.photoCalculus',
  statistics: 'sessions.photoStatistics',
  test: 'sessions.photoTest',
  skills: 'sessions.photoSkills',
  other: 'sessions.photoAlgebra',
};

/** The session's photograph (by its kind), whether it is still the sample, or null when removed. */
function photoFor(values: SiteValues, ownerFields: string[], service: Service): { image: SiteImage; sample: boolean; field: string } | null {
  const field = PHOTO_FIELD[kindOf(service)];
  const image = values[field] as SiteImage | null;
  return image ? { image, sample: !ownerFields.includes(field), field } : null;
}

/** The number line's end: the longest session rounded up to a quarter hour, never under an hour. */
function scaleEnd(list: readonly Service[]): number {
  const longest = Math.max(60, ...list.map((s) => s.durationMinutes));
  return Math.ceil(longest / 15) * 15;
}

/**
 * Sessions & prices, set like a problem set: every session from the engine as a numbered row (3.1,
 * 3.2…) with its kind, name, description, who it is good for, its real length drawn on one shared
 * number line, its price and its own Book. On wide screens the photograph of the session being read
 * stands in a sticky panel beside the list (it follows the row under the pointer, in focus, or in the
 * middle of the screen); on phones each row carries its own small photograph. Nothing is hidden.
 */
export function Sessions({ values, ownerFields, services, business, onRetry, onBook }: SessionsProps) {
  const list = useMemo(() => (services.status === 'ready' ? indexOrder(services.data) : []), [services]);
  const locale = business?.locale ?? 'en-US';
  const end = scaleEnd(list);
  const [active, setActive] = useState<string | null>(null);
  const current = list.find((s) => s.id === active) ?? list[0] ?? null;
  const rows = useRef<HTMLOListElement>(null);

  // The row crossing the middle of the screen becomes the one pictured.
  useEffect(() => {
    const root = rows.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.service ?? null);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    root.querySelectorAll('[data-service]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [list]);

  // One photograph per kind in the panel: sessions of the same kind share it.
  const panel = useMemo(() => {
    const seen = new Map<string, { image: SiteImage; sample: boolean; field: string }>();
    for (const s of list) {
      const p = photoFor(values, ownerFields, s);
      if (p && !seen.has(p.field)) seen.set(p.field, p);
    }
    return [...seen.values()];
  }, [list, values, ownerFields]);
  const currentPhoto = current ? photoFor(values, ownerFields, current) : null;

  return (
    <section className="sessions margin-section" id="sessions" aria-labelledby="sessions-title">
      <div className="shell margin-grid">
        <SectionLabel n="03">Sessions &amp; prices</SectionLabel>
        <div className="margin-body">
          <header className="sessions__head">
            <h2 id="sessions-title" className="section-title" data-reveal="">
              <Emphasis text={values['sessions.title']} />
            </h2>
            {values['sessions.intro'] && <p className="section-intro">{values['sessions.intro']}</p>}
          </header>

          {services.status === 'loading' && (
            <div className="sessions__loading" aria-busy="true">
              <p className="sr-only" role="status">
                Loading sessions…
              </p>
              <span className="skeleton skeleton--block" aria-hidden="true" />
            </div>
          )}
          {services.status === 'error' && (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn’t load the sessions just now.</p>
            </Notice>
          )}
          {services.status === 'ready' && list.length === 0 && (
            <p className="sessions__empty">Sessions aren’t listed online yet — please call or email the studio.</p>
          )}

          {list.length > 0 && (
            <div className={`problem-set${panel.length ? '' : ' problem-set--text'}`}>
              {panel.length > 0 && (
                <div className="problem-set__panel" aria-hidden="true">
                  <div className="problem-set__photos">
                    {panel.map((p) => (
                      <div className={`problem-set__photo${currentPhoto?.field === p.field ? ' is-on' : ''}`} key={p.field}>
                        <Photo image={p.image} sizes="(min-width: 1080px) 26vw, 1px" className="frame--session" />
                        {p.sample && <span className="photo-label">Sample photo</span>}
                      </div>
                    ))}
                  </div>
                  {current && (
                    <p className="problem-set__caption">
                      <span>Pictured</span>
                      {current.name}
                    </p>
                  )}
                </div>
              )}
              <ol className="problems" role="list" ref={rows}>
                {list.map((s, i) => (
                  <Problem
                    key={s.id}
                    service={s}
                    n={`3.${i + 1}`}
                    end={end}
                    locale={locale}
                    active={current?.id === s.id}
                    photo={photoFor(values, ownerFields, s)}
                    onActive={() => setActive(s.id)}
                    onBook={onBook}
                  />
                ))}
              </ol>
            </div>
          )}

          {list.length > 0 && values['sessions.footnote'] && <p className="sessions__footnote">{values['sessions.footnote']}</p>}
        </div>
      </div>
    </section>
  );
}

interface ProblemProps {
  service: Service;
  n: string;
  end: number;
  locale: string;
  active: boolean;
  photo: { image: SiteImage; sample: boolean } | null;
  onActive: () => void;
  onBook: StartBooking;
}

function Problem({ service, n, end, locale, active, photo, onActive, onBook }: ProblemProps) {
  const { lead, goodFor } = splitDescription(service.description);
  const price = priceTerms(service, locale);
  const kind = kindOf(service);
  const titleId = `session-title-${service.id}`;
  return (
    <li
      className={`problem${active ? ' is-active' : ''}${kind === 'intro' ? ' problem--intro' : ''}`}
      id={`session-${service.id}`}
      data-service={service.id}
      onMouseEnter={onActive}
      onFocus={onActive}
    >
      <p className="problem__n" aria-hidden="true">
        {n}
      </p>
      {photo && (
        <div className="problem__thumb">
          <Photo image={photo.image} sizes="(min-width: 1080px) 1px, 6.5rem" className="frame--thumb" />
          {photo.sample && <span className="photo-label photo-label--tiny">Sample</span>}
        </div>
      )}
      <div className="problem__main">
        <p className="problem__kind">{kind === 'intro' ? 'New here? Start with' : KIND_LABEL[kind]}</p>
        <h3 className="problem__name" id={titleId}>
          {service.name}
        </h3>
        {lead && <p className="problem__lead">{lead}</p>}
        {goodFor && (
          <p className="problem__good">
            <span>Good for</span> {goodFor}
          </p>
        )}
      </div>
      <div className="problem__figures">
        <Scale minutes={service.durationMinutes} end={end} />
        <p className="problem__price">
          <span className="problem__price-label">{price.label}</span>
          <span className="problem__price-amount">{price.amount}</span>
          {price.kind !== 'free' && price.kind !== 'request' && <span className="problem__price-note">paid at the studio</span>}
          {price.note && price.kind === 'from' && <span className="problem__price-note">{price.note}</span>}
        </p>
        <button type="button" className="btn btn--accent btn--book" aria-label={`Book ${service.name}`} onClick={() => onBook(service.id)}>
          Book
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </li>
  );
}

/** The session's length on the shared number line: ticks every 15 minutes, the length drawn in ink. */
function Scale({ minutes, end }: { minutes: number; end: number }) {
  const ticks = Array.from({ length: end / 15 + 1 }, (_, i) => i * 15);
  return (
    <div className="scale" style={{ '--len': Math.min(1, minutes / end) } as CSSProperties}>
      <p className="scale__value">
        <span aria-hidden="true">{minutesLabel(minutes)}</span>
        <span className="sr-only">Length: {durationSpoken(minutes)}</span>
      </p>
      <div className="scale__line" aria-hidden="true">
        <span className="scale__fill" />
        {ticks.map((t) => (
          <span className="scale__tick" key={t} style={{ '--at': t / end } as CSSProperties}>
            {t % 30 === 0 && <span className="scale__tick-label">{t}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
