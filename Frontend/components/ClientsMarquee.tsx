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

const Tile: React.FC<{ logo: { url: string; name: string } }> = ({ logo }) => (
  <div className="group flex h-20 w-40 sm:w-44 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 transition-colors duration-300 hover:border-primary/30 hover:bg-white/[0.06]">
    <img
      src={logo.url}
      alt={logo.name || 'Client logo'}
      loading="lazy"
      className="max-h-10 max-w-[7rem] w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
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
  const mid = Math.ceil(LOGOS.length / 2);
  const rowA = LOGOS.slice(0, mid);
  const rowB = LOGOS.length > 3 ? LOGOS.slice(mid) : LOGOS;

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
