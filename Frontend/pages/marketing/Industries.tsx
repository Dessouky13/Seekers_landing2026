import React from 'react';
import PageHeader from '../../components/PageHeader';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';
import { Reveal } from '../../components/Reveal';
import { INDUSTRIES } from '../../src/content';
import { SITE } from '../../src/siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE.url}/industries` },
  ],
};

const Industries: React.FC = () => (
  <>
    <Seo
      title="Industries We Serve — AI Automation Across MENA"
      description="Seekers AI builds AI automation for retail & e-commerce, real estate, healthcare, finance, hospitality, and education across the MENA region. See industry use cases."
      path="/industries"
      jsonLd={jsonLd}
    />
    <PageHeader
      crumb="Industries"
      eyebrow="Industries we serve"
      title={<>Automation tailored to <span className="text-gradient">your industry</span></>}
      subtitle="We've shipped AI agents and automations across sectors. Here's how teams like yours put Seekers AI to work."
    />

    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, idx) => (
          <Reveal key={ind.name} delay={(idx % 3) * 90}>
            <div className="presentation-card sheen h-full p-7 sm:p-8 rounded-3xl group">
              <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined text-2xl">{ind.icon}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3">{ind.name}</h2>
              <p className="font-body text-sm sm:text-base text-slate-400 leading-relaxed mb-5">{ind.desc}</p>
              <ul className="space-y-2.5">
                {ind.useCases.map((u) => (
                  <li key={u} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="material-symbols-outlined text-primary text-base">arrow_right</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <CtaBand title="Don't see your industry?" subtitle="If your business runs on repetitive workflows or customer conversations, we can automate it. Let's talk." />
  </>
);

export default Industries;
