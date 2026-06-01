import React from 'react';
import PageHeader from '../../components/PageHeader';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';
import { Reveal } from '../../components/Reveal';
import { SOLUTIONS } from '../../src/content';
import { SITE } from '../../src/siteConfig';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE.url}/solutions` },
    ],
  },
  ...SOLUTIONS.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.long,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: 'MENA',
    serviceType: 'AI automation',
  })),
];

const Solutions: React.FC = () => (
  <>
    <Seo
      title="AI Automation Solutions — Chatbots, Process & Agentic Apps"
      description="Explore Seekers AI solutions: 24/7 AI chatbots, intelligent process automation, custom agentic applications, and finance & invoice automation for MENA businesses."
      path="/solutions"
      jsonLd={jsonLd}
    />
    <PageHeader
      crumb="Solutions"
      eyebrow="Solutions portfolio"
      title={<>AI solutions that do the <span className="text-gradient">work for you</span></>}
      subtitle="From customer-facing agents to back-office automation, we build and run the systems that scale your operations — across every channel, in Arabic and English."
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 relative z-10">
      {SOLUTIONS.map((s, idx) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 py-10 sm:py-14 border-t border-white/5 first:border-t-0">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
            <Reveal className="lg:[direction:ltr]">
              <div className="border-glow rounded-3xl md:rounded-[2.5rem] p-8 sm:p-10">
                <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-3">{`0${idx + 1} — Service`}</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-snug">{s.title}</h2>
                <p className="font-body text-base sm:text-lg text-slate-400 leading-relaxed">{s.long}</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {s.tags.map((t) => (
                    <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-[0.15em] text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:[direction:ltr]">
              <ul className="space-y-4">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-4 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 hover:border-primary/30 transition-colors">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <span className="material-symbols-outlined text-base">check</span>
                    </span>
                    <span className="font-body text-sm sm:text-base text-slate-200 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}
    </div>

    <CtaBand title="Not sure which solution fits?" subtitle="Tell us your goals and we'll recommend the right mix — and show you the ROI before you commit." />
  </>
);

export default Solutions;
