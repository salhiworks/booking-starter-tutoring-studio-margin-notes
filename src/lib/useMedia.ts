import { useEffect, useState } from 'react';

/** True while the media query matches (re-renders when it changes). */
export function useMedia(query: string): boolean {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatch(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);
  return match;
}
