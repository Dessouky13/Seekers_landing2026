import React from 'react';
import { Reveal } from './Reveal';

// Optional partner logo — drop e.g. src/assets/partners/traffic.svg to use it.
const partnerLogos = (import.meta as any).glob('../src/assets/partners/*.{png,jpg,jpeg,svg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const trafficLogo =
  Object.entries(partnerLogos).find(([p]) => /traffic/i.test(p))?.[1] ||
  Object.values(partnerLogos)[0] ||
  null;

/**
 * "Official Partner" spotlight for Traffic — the marketing agency that resells
 * Seekers AI solutions. Distinct from the client logo wall.
 */
const PartnerSpotlight: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
    <Reveal>
      <div className="border-glow bg-grid relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 bg-primary/15 blur-3xl rounded-full" />
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-7">
            <p className="font-mono text-accent text-[10px] font-medium uppercase tracking-[0.3em] mb-4">
              ◆ Official Partner
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
              Powered to scale with <span className="text-gradient">Traffic</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Traffic is our official marketing partner and authorized reseller — bringing Seekers AI automation to
              more businesses across the region, backed by their go-to-market expertise.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8 min-h-[150px]">
              {trafficLogo ? (
                <img src={trafficLogo} alt="Traffic — official partner" className="max-h-28 sm:max-h-32 w-auto object-contain rounded-2xl" draggable={false} />
              ) : (
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Traffic<span className="text-primary">.</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default PartnerSpotlight;
