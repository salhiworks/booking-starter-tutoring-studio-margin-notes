/**
 * A section's margin label: its number set like an equation number — "(03)" — and its name in the
 * mono label face. On wide screens it stands in the margin column, left of the violet rule.
 */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'light' | 'ink' }) {
  return (
    <p className={`label${tone ? ` label--${tone}` : ''}`}>
      {n && (
        <span className="label__n" aria-hidden="true">
          {n}
        </span>
      )}
      <span className="label__text">{children}</span>
    </p>
  );
}
