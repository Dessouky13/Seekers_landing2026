import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';
import { Reveal } from '../../components/Reveal';
import { FAQS } from '../../src/content';
import { SITE } from '../../src/siteConfig';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
    ],
  },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <Seo
        title="Frequently Asked Questions — Seekers AI"
        description="Answers to common questions about Seekers AI: what we do, supported channels, timelines, integrations, security, pricing, and where we're based."
        path="/faq"
        jsonLd={jsonLd}
      />
      <PageHeader
        crumb="FAQ"
        eyebrow="Frequently asked questions"
        title={<>Questions, <span className="text-gradient">answered</span></>}
        subtitle="Everything you need to know about working with Seekers AI. Can't find your answer? Reach out and we'll help."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="space-y-3">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div className={`rounded-2xl border transition-colors ${isOpen ? 'border-primary/30 bg-primary/[0.04]' : 'border-white/10 bg-white/[0.02]'}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-white">{f.q}</span>
                    <span className={`material-symbols-outlined shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>add</span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-6 font-body text-sm sm:text-base text-slate-400 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand title="Still have questions?" subtitle="Our team is happy to walk you through anything. Book a free 30-minute discovery call." />
    </>
  );
};

export default Faq;
