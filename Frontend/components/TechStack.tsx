import React from 'react';
import { Reveal } from './Reveal';
import Tilt from './Tilt';
import { TECH } from '../src/content';

// Brand logo SVGs via SimpleIcons CDN — official brand colors on dark background.
// Falls back to Material Symbol if image fails to load.
const BRAND: Record<string, { slug: string; color: string }> = {
  'Amazon Web Services': { slug: 'amazonaws', color: 'FF9900' },
  'Microsoft Azure': { slug: 'microsoftazure', color: '0078D4' },
  'Google Cloud': { slug: 'googlecloud', color: '4285F4' },
  'Meta': { slug: 'meta', color: '0866FF' },
  'OpenAI': { slug: 'openai', color: 'FFFFFF' },
};

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
      {TECH.map((t, idx) => {
        const brand = BRAND[t.name];
        return (
          <Reveal key={t.name} delay={(idx % 6) * 70}>
            <Tilt max={9} className="h-full">
              <div className="presentation-card sheen group flex h-full flex-col items-center justify-center gap-4 rounded-3xl p-5 sm:p-7 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {brand ? (
                    <>
                      <img
                        src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color}`}
                        alt={`${t.name} logo`}
                        loading="lazy"
                        className="size-8 object-contain"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = 'none';
                          const fb = el.nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = 'inline';
                        }}
                      />
                      <span className="material-symbols-outlined text-3xl" style={{ display: 'none' }}>{t.icon}</span>
                    </>
                  ) : (
                    <span className="material-symbols-outlined text-3xl">{t.icon}</span>
                  )}
                </div>
                <span className="font-display text-sm font-semibold leading-tight text-white">{t.name}</span>
              </div>
            </Tilt>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default TechStack;
