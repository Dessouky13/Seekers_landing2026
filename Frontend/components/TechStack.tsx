import React from 'react';
import { Reveal } from './Reveal';
import Tilt from './Tilt';
import { TECH } from '../src/content';

/**
 * "Technologies We Deploy On" — premium icon+name cards for the platforms we
 * build on. Trademark-safe (no embedded brand logos); drop official SVGs in
 * src/assets/tech/ later to upgrade. Pointer-tilt + hover glow.
 */
const TechStack: React.FC = () => (
  <section id="technologies" className="scroll-mt-24 md:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
    <Reveal className="text-center mb-12 sm:mb-16">
      <p className="font-mono text-primary text-[10px] font-medium uppercase tracking-[0.3em] mb-4">Our stack</p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Technologies we deploy on</h2>
      <p className="mt-4 mx-auto max-w-xl font-body text-slate-400">
        Enterprise-grade infrastructure and leading AI platforms — so your automations are fast, reliable, and secure.
      </p>
    </Reveal>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
      {TECH.map((t, idx) => (
        <Reveal key={t.name} delay={(idx % 6) * 70}>
          <Tilt max={9} className="h-full">
            <div className="presentation-card sheen group flex h-full flex-col items-center justify-center gap-4 rounded-3xl p-5 sm:p-7 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <span className="material-symbols-outlined text-3xl">{t.icon}</span>
              </div>
              <span className="font-display text-sm font-semibold leading-tight text-white">{t.name}</span>
            </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  </section>
);

export default TechStack;
