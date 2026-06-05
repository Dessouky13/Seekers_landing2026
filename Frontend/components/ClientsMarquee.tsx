import React from 'react';
import { Reveal } from './Reveal';

// Auto-load every image dropped into src/assets/clients/ — no list to maintain.
const modules = (import.meta as any).glob('../src/assets/clients/*.{png,jpg,jpeg,svg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const LOGOS = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({
    url,
    name: (path.split('/').pop() || '')
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+[-_\s]*/, '')
      .replace(/[-_]+/g, ' ')
      .trim(),
  }));

// Repeat a row enough times to comfortably fill the viewport, then it's rendered
// twice so the -50% marquee loop is seamless.
const fill = <T,>(arr: T[]): T[] => {
  if (!arr.length) return arr;
  const k = Math.max(2, Math.ceil(10 / arr.length));
  return Array.from({ length: k }).flatMap(() => arr);
};

// Uniform white logo cards — keeps mixed-background logos (transparent, white,
// or dark) all crisp and legible, with a subtle lift on hover.
const Tile: React.FC<{ logo: { url: string; name: string } }> = ({ logo }) => (
  <div className="group flex h-24 w-44 sm:w-48 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-[0_12px_34px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1.5">
    <img
      src={logo.url}
      alt={logo.name || 'Client logo'}
      loading="lazy"
      className="max-h-16 max-w-full w-auto object-contain"
      draggable={false}
    />
  </div>
);

const Row: React.FC<{ items: { url: string; name: string }[]; reverse?: boolean }> = ({ items, reverse }) => {
  const seq = fill(items);
  return (
    <div className="flex w-max gap-4 sm:gap-5">
      <div className="flex w-max gap-4 sm:gap-5 animate-marquee" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {[...seq, ...seq].map((l, i) => (
          <Tile key={i} logo={l} />
        ))}
      </div>
    </div>
  );
};

/**
 * "Trusted by" client-logo marquee — two rows gliding in opposite directions,
 * glass tiles, grayscale→color on hover. Renders nothing until logos exist in
 * src/assets/clients/, so an empty state never ships.
 */
const ClientsMarquee: React.FC = () => {
  if (!LOGOS.length) return null;
  // Both rows show all logos; row B is offset by half so they don't line up.
  const half = Math.floor(LOGOS.length / 2) || 1;
  const rowA = LOGOS;
  const rowB = LOGOS.length > 1 ? [...LOGOS.slice(half), ...LOGOS.slice(0, half)] : LOGOS;

  return (
    <section id="clients" className="scroll-mt-24 md:scroll-mt-28 relative z-10 py-16 sm:py-24 overflow-hidden">
      <Reveal className="text-center mb-10 sm:mb-14 px-4">
        <p className="font-mono text-primary text-[10px] font-medium uppercase tracking-[0.3em] mb-4">Trusted by</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          The brands we&rsquo;ve helped grow
        </h2>
      </Reveal>

      <div className="relative space-y-4 sm:space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-background-dark to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-background-dark to-transparent" />
        <Row items={rowA} />
        {rowB.length > 0 && <Row items={rowB} reverse />}
      </div>
    </section>
  );
};

export default ClientsMarquee;
