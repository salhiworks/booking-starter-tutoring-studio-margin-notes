import type { SiteValues } from '../lib/content';
import { SectionLabel } from './SectionLabel';
import { Emphasis } from './Emphasis';

/**
 * The practical questions before a first session, as native disclosure rows (keyboard and screen-reader
 * ready). Until the owner edits them, they are labelled as sample policies.
 */
export function GoodToKnow({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const items = values['faq.items'];
  if (items.length === 0) return null;
  return (
    <section className="faq margin-section" id="questions" aria-labelledby="faq-title">
      <div className="shell margin-grid">
      <SectionLabel n="07">Questions &amp; policies</SectionLabel>
      <div className="margin-body faq__grid">
      <header className="faq__head">
        <h2 id="faq-title" className="section-title faq__title" data-reveal="">
          <Emphasis text={values['faq.title']} />
        </h2>
        {!ownerFields.includes('faq.items') && (
          <p className="sample-note">
            <span className="tag">Sample policies</span> Example answers and policies the studio edits in its dashboard — please check the details with the studio
            before you rely on them.
          </p>
        )}
      </header>
      <div className="faq__list">
        {items.map((item, i) => (
          <details className="qa" key={`${i}-${item.question}`} open={i === 0}>
            <summary>
              <span className="qa__q">{item.question}</span>
              <span className="qa__icon" aria-hidden="true" />
            </summary>
            {item.answer && <p className="qa__a prewrap">{item.answer}</p>}
          </details>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
}
