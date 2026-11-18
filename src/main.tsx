import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Literata (variable, optical sizes, with italics): every heading, figure and the name mark — a book
// face made for long reading, its italics carrying the emphasised words. Lexend (variable): reading
// text — a face designed to make reading easier. Atkinson Hyperlegible Mono: small labels only.
import '@fontsource-variable/literata/opsz.css';
import '@fontsource-variable/literata/opsz-italic.css';
import '@fontsource-variable/lexend';
import '@fontsource-variable/atkinson-hyperlegible-mono';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
