import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import ProcessTimeline from '../../components/ProcessTimeline';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';
import CountUp from '../../components/CountUp';
import Tilt from '../../components/Tilt';
import { Reveal, useParallax } from '../../components/Reveal';
import { SOLUTIONS, STATS } from '../../src/content';
import { SITE } from '../../src/siteConfig';

// Code-split the heavy three.js hero so it doesn't block first paint / LCP.
const ParticleHero = lazy(() => import('../../components/ParticleHero'));

const MARQUEE = [
  { icon: 'smart_toy', label: 'Autonomous Agents' },
  { icon: 'forum', label: 'WhatsApp & Meta' },
  { icon: 'account_tree', label: 'n8n Workflows' },
  { icon: 'database', label: 'Knowledge Bases' },
  { icon: 'bolt', label: 'Real-time Ops' },
  { icon: 'verified_user', label: 'Enterprise Security' },
  { icon: 'insights', label: 'Live Analytics' },
  { icon: 'language', label: 'Arabic · English · Franco' },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: 'Seekers',
    url: SITE.url,
    logo: `${SITE.url}/seekers-logo.png`,
    image: `${SITE.url}/seekers-logo.png`,
    description:
      'Seekers AI is an AI automation agency based in Cairo, Egypt, serving the MENA region. We design, deploy, and optimize AI chatbots, intelligent process automation, custom agentic applications, and finance automation.',
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phones[0],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      addressCountry: 'EG',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 30.0444, longitude: 31.2357 },
    areaServed: [
      { '@type': 'Country', name: 'Egypt' },
      { '@type': 'Place', name: 'Middle East and North Africa (MENA)' },
    ],
    knowsLanguage: ['ar', 'en'],
    sameAs: [SITE.social.linkedin, SITE.social.x, SITE.social.instagram],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      telephone: SITE.phones[0],
      availableLanguage: ['Arabic', 'English'],
      areaServed: 'EG',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Automation Services',
      itemListElement: SOLUTIONS.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.short },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${SITE.url}/#organization` },
  },
];

const Home: React.FC = () => {
  const glowY = useParallax(0.25);
  const driftY = useParallax(-0.12);
  // Bento order: featured 5x first, then the rest.
  const bento = [STATS[2], STATS[0], STATS[1], STATS[3]];
  const spans = ['col-span-2 lg:row-span-2', 'col-span-2', 'col-span-1', 'col-span-1'];

  return (
    <>
      <Seo
        title="Seekers AI — Intelligent AI Automation for the MENA Region"
        description={SITE.description}
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-surface-dark/40 via-background-dark to-background-dark" />}>
          <ParticleHero />
        </Suspense>
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background-dark/40 via-transparent to-background-dark" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-28 sm:pb-32 text-center">
          <Reveal>
            <h1 className="mt-6 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-white">
              Transform your business with <span className="text-gradient">intelligent AI</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 mx-auto max-w-xl font-body text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed">
              We design, deploy, and optimize autonomous AI agents that handle support, sales, and operations —
              24/7, across every channel.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-background-dark rounded-2xl font-display text-sm font-bold uppercase tracking-[0.15em] shadow-[0_24px_60px_rgba(161,158,255,0.45)] hover:scale-[1.03] active:scale-95 transition-all">
                Book a Discovery Call
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <Link to="/solutions" className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md font-display text-sm font-medium uppercase tracking-[0.15em] text-slate-200 hover:border-primary/50 hover:text-white transition-all">
                Explore Solutions
              </Link>
            </div>
          </Reveal>
        </div>

        <a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' }); }} aria-label="Scroll to solutions" className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-slate-500 hover:text-primary transition-colors">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="material-symbols-outlined text-xl animate-bounce">keyboard_arrow_down</span>
        </a>
      </section>

      {/* Trust marquee */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background-dark to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background-dark to-transparent" />
        <div className="flex w-max animate-marquee gap-12 sm:gap-16">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-500 whitespace-nowrap">
              <span className="material-symbols-outlined text-primary/70 text-xl">{item.icon}</span>
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions teaser */}
      <section id="solutions" className="scroll-mt-24 md:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 relative z-10">
        <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-primary text-[10px] font-medium uppercase tracking-[0.3em] mb-4">Our solutions portfolio</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Comprehensive AI solutions <br className="hidden md:block" /> for modern business
            </h2>
          </div>
          <Link to="/solutions" className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-primary hover:text-white transition-colors whitespace-nowrap">
            View all solutions
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SOLUTIONS.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 90}>
              <Link to={`/solutions#${item.id}`} className="presentation-card sheen block h-full p-8 md:p-11 rounded-3xl md:rounded-[2.5rem] group">
                <div className="size-16 md:size-[4.5rem] bg-primary/10 text-primary rounded-2xl md:rounded-3xl flex items-center justify-center mb-7 md:mb-9 group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-2xl shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl md:text-4xl">{item.icon}</span>
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] font-bold mb-4 tracking-tight leading-snug">{item.title}</h3>
                <p className="text-slate-400 font-body text-base md:text-lg leading-relaxed mb-7">{item.short}</p>
                <div className="flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-[11px] font-mono font-medium text-slate-300 uppercase tracking-[0.15em]">{tag}</span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Impact — bento grid */}
      <section id="impact" className="scroll-mt-24 md:scroll-mt-28 relative z-10 overflow-hidden py-16 sm:py-28">
        {/* parallax glow layers */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-primary/10 blur-[130px] rounded-full" style={{ transform: `translateY(${glowY}px)` }} />
          <div className="absolute bottom-0 right-1/4 w-[34vw] h-[34vw] bg-accent/10 blur-[130px] rounded-full" style={{ transform: `translateY(${driftY}px)` }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="font-mono text-primary text-[10px] font-medium uppercase tracking-[0.3em] mb-4">Proven ROI &amp; impact</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Results that scale your business</h2>
            <p className="mt-4 mx-auto max-w-xl font-body text-slate-400">Real numbers from teams that put Seekers AI to work across support, sales, and operations.</p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:auto-rows-[168px]">
            {bento.map((item, idx) => {
              const featured = idx === 0;
              return (
                <Reveal key={item.label} delay={idx * 80} className={spans[idx]}>
                  <Tilt className="h-full">
                    <div
                      className={`relative h-full overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between group ${
                        featured ? 'border-glow' : 'presentation-card sheen'
                      }`}
                    >
                      {featured && (
                        <>
                          <div className="absolute -right-10 -top-10 size-44 rounded-full border border-primary/20 animate-spin-slow" />
                          <div className="absolute -right-16 -bottom-16 size-52 bg-primary/10 blur-3xl rounded-full" />
                        </>
                      )}
                      <div className="relative flex items-center justify-between">
                        <div className={`flex items-center justify-center rounded-2xl bg-primary/15 text-primary ${featured ? 'size-14' : 'size-11'}`}>
                          <span className={`material-symbols-outlined ${featured ? 'text-3xl' : 'text-xl'}`}>{item.icon}</span>
                        </div>
                        {featured && <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Avg. outcome</span>}
                      </div>
                      <div className="relative">
                        <p className={`font-display font-bold text-gradient tracking-tighter leading-none ${featured ? 'text-6xl sm:text-7xl md:text-8xl' : 'text-4xl sm:text-5xl'}`}>
                          <CountUp end={item.value} suffix={item.suffix} />
                        </p>
                        <h3 className={`mt-2 font-display font-semibold text-white ${featured ? 'text-xl' : 'text-sm sm:text-base'}`}>{item.label}</h3>
                        {featured && <p className="mt-2 font-body text-sm text-slate-400 leading-relaxed max-w-xs">{item.desc}</p>}
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 md:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        <Reveal className="text-center mb-12 sm:mb-20">
          <p className="font-mono text-primary text-[10px] font-medium uppercase tracking-[0.3em] mb-4">The process</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">From strategy to execution</h2>
        </Reveal>
        <Reveal delay={120}><ProcessTimeline /></Reveal>
      </section>

      <CtaBand />
    </>
  );
};

export default Home;
