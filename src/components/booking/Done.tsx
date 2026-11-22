import type { RefObject } from 'react';
import { roleOf } from '../../lib/services';
import { formatClockTime, formatDate, timeZoneLabel } from '@profitstudio/booking-engine';
import type { BookingConfirmation, Business, Service } from '@profitstudio/booking-engine';
import { ContactInstead } from './ContactInstead';
import { INACTIVE_TITLE, answerOf, inactiveNext } from '../../lib/bookingStatus';

export type Outcome =
  | { kind: 'booked'; confirmation: BookingConfirmation; email: string }
  | { kind: 'preview' }
  | { kind: 'limit' };

interface DoneProps {
  outcome: Outcome;
  business: Business;
  /** The service as listed when it was booked (for where it happens), or null. */
  service?: Service | null;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAgain: () => void;
}

/** Shown only after verifyBooking answered ok: true — or, honestly, after PREVIEW_MODE. */
export function Done({ outcome, business, service = null, headingRef, onAgain }: DoneProps) {
  if (outcome.kind === 'preview') {
    return (
      <div className="done done--preview">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          Preview — nothing was saved
        </h2>
        <p>
          This site is running on sample data, so no email was sent and no session was stored. Once the studio's booking system is
          connected, families and students see their confirmation here.
        </p>
        <button type="button" className="button button--quiet" onClick={onAgain}>
          Start again
        </button>
      </div>
    );
  }

  if (outcome.kind === 'limit') {
    return (
      <div className="done">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          You already have sessions booked with us
        </h2>
        <ContactInstead
          business={business}
          title="Let's find a time together"
          text="This email address already has as many upcoming sessions as we can hold online, so we couldn't add another and the time was released. Call or email the studio and we'll gladly help."
        />
      </div>
    );
  }

  const { confirmation, email } = outcome;
  // Only 'confirmed' is booked and only 'pending' is a request; the flow never brings anything else here.
  const answer = answerOf(confirmation);
  if (answer === 'inactive') {
    return (
      <div className="done">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          {INACTIVE_TITLE}
        </h2>
        <ContactInstead business={business} title="Contact us" text={inactiveNext(confirmation.reference)} />
        <button type="button" className="button button--quiet" onClick={onAgain}>
          Choose a new time
        </button>
      </div>
    );
  }
  const pending = answer === 'pending';
  const { locale } = business;
  return (
    <div className="done">
      <p className="done__mark" aria-hidden="true" />
      <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
        {pending ? 'Request received — we’ll review your session and confirm the time shortly.' : 'Your session is booked.'}
      </h2>
      <p>
        {__BOOKING_DEMO__ ? (
          // Live Demo build only: no email exists to promise.
          <>
            This is a demo, so no email is sent.{' '}
            {pending ? 'Your request is waiting in the demo dashboard — confirm it there as the tutor.' : 'Your session is in the demo dashboard.'}{' '}
            <a href="/admin/#bookings">Open the demo dashboard</a>
          </>
        ) : pending ? (
          `We're holding the time for you while your tutor reviews your request. We'll email ${email} as soon as it's confirmed.`
        ) : (
          `A confirmation is on its way to ${email}.`
        )}
      </p>
      <p className="done__note">{doneNote(confirmation.serviceName, pending, service && service.name === confirmation.serviceName ? service : null)}</p>
      <dl className="done__details">
        <div>
          <dt>Session</dt>
          <dd>{confirmation.serviceName}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(confirmation.date, locale, { weekday: 'long', month: 'long', day: 'numeric' })}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>
            {formatClockTime(confirmation.time, locale)}{' '}
            <span className="summary__zone">{timeZoneLabel(confirmation.timezone, locale)}</span>
          </dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd className="done__reference">{confirmation.reference}</dd>
        </div>
      </dl>
      <button type="button" className="button button--quiet" onClick={onAgain}>
        Book another session
      </button>
    </div>
  );
}

/**
 * What this booking is: always ONE private session — one tutor, one student — at the studio. Nothing is
 * paid online. The note gives practical preparation only and never promises a grade or a score.
 */
function doneNote(serviceName: string, pending: boolean, _service: Service | null): string {
  const role = roleOf({ name: serviceName });
  const until = pending ? 'Until it’s confirmed, this is a request — not a confirmed time. ' : '';
  const first =
    role === 'intro'
      ? 'Bring the student and, if they are under 18, a parent or guardian. Recent homework or a test they found hard helps. '
      : 'Bring the class notes, homework or practice test you are working on, a pencil and a calculator if your class uses one. ';
  return `${until}${first}Nothing is paid online: you pay at the studio.`;
}
