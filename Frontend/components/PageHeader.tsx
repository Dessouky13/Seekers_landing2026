import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  /** Breadcrumb label for the current page (Home is implicit). */
  crumb?: string;
}

/** Consistent inner-page header: breadcrumb, eyebrow, gradient title, subtitle. */
const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, subtitle, crumb }) => (
  <header className="relative overflow-hidden">
    <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 text-center">
      {crumb && (
        <Reveal className="flex justify-center">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2 text-slate-700">/</span>
            <span className="text-primary">{crumb}</span>
          </nav>
        </Reveal>
      )}
      <Reveal delay={60} className="flex justify-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-primary backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={140}>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-white max-w-4xl mx-auto">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={240}>
          <p className="mt-5 mx-auto max-w-2xl font-body text-base sm:text-lg text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  </header>
);

export default PageHeader;
