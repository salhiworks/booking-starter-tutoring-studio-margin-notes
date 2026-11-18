/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#approach', label: 'Approach' },
  { href: '#stuck', label: 'Where to start', header: false },
  { href: '#sessions', label: 'Sessions & prices' },
  { href: '#hour', label: 'The hour' },
  { href: '#guardians', label: 'Parents' },
  { href: '#questions', label: 'Questions', header: false },
  { href: '#visit', label: 'Visit' },
];
