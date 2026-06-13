import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

interface CtaBandProps {
  title?: string;
  subtitle?: string;
}

const CtaBand: React.FC<CtaBandProps> = ({
  title = 'Ready to transform your business?',
  subtitle = 'Tell us about your goals and a Seekers strategist will reach out within one business day.',
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
      <Reveal>
        <div className="border-glow relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-12 py-16 sm:py-24 text-center">
          {/* static depth layers */}
          <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[70%] h-56 bg-primary/25 blur-[110px] rounded-full" />
          <div className="pointer-events-none absolute -left-10 top-1/2 size-40 rounded-full border border-primary/15" />
          <div className="pointer-events-none absolute -right-8 bottom-2 size-28 rounded-full bg-accent/10 blur-2xl" />

          <Reveal className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-md mb-6">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Let's build together
            </span>
          </Reveal>
          <h2 className="relative font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h2>
          <p className="relative mt-5 mx-auto max-w-xl font-body text-base sm:text-lg text-slate-400 leading-relaxed">
            {subtitle}
          </p>
          <div className="relative mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-background-dark rounded-2xl font-display text-sm font-bold uppercase tracking-[0.15em] shadow-[0_24px_60px_rgba(161,158,255,0.45)] hover:scale-[1.03] active:scale-95 transition-all"
            >
              Get your free AI audit
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
            <Link
              to="/solutions"
              className="px-8 py-4 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md font-display text-sm font-medium uppercase tracking-[0.15em] text-slate-200 hover:border-primary/50 hover:text-white transition-all"
            >
              Explore Solutions
            </Link>
          </div>
          <p className="relative mt-4 font-mono text-[10px] text-slate-500 tracking-[0.15em] uppercase">
            Free 30-min call &nbsp;·&nbsp; No commitment &nbsp;·&nbsp; Response within 1 business day
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default CtaBand;
