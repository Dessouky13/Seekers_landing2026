import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';
import { Reveal } from '../../components/Reveal';
import { STATS } from '../../src/content';
import { SITE } from '../../src/siteConfig';

const VALUES = [
  { icon: 'target', title: 'Outcome-obsessed', desc: 'We measure success in your ROI — cost saved, response time cut, revenue unlocked.' },
  { icon: 'bolt', title: 'Ship fast, iterate', desc: 'Live deployments in weeks, then continuous tuning based on real conversations and data.' },
  { icon: 'verified_user', title: 'Secure by design', desc: 'Least-privilege integrations, audit trails, and cloud-based architecture from day one.' },
  { icon: 'diversity_3', title: 'MENA-first', desc: 'Built for the region — fluent in Arabic and English, tuned to local channels and behavior.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${SITE.name}`,
  url: `${SITE.url}/about`,
  about: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    foundingLocation: { '@type': 'Place', name: `${SITE.city}, ${SITE.country}` },
    areaServed: 'MENA',
  },
};

const About: React.FC = () => (
  <>
    <Seo
      title="About Seekers AI — AI Automation Company in Cairo"
      description="Seekers AI is an AI automation company headquartered in Cairo, Egypt, helping MENA businesses deploy autonomous agents and intelligent workflows. Learn our mission and values."
      path="/about"
      jsonLd={jsonLd}
    />
    <PageHeader
      crumb="About"
      eyebrow="Who we are"
      title={<>Engineering the <span className="text-gradient">autonomous enterprise</span></>}
      subtitle="Seekers AI is an automation studio based in Cairo, helping businesses across the MENA region put AI to work — reliably, securely, and at scale."
    />

    {/* Mission */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-primary text-[10px] uppercase tracking-[0.3em] mb-4">Our mission</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-6">
            We believe every business in the region deserves an AI workforce.
          </h2>
          <div className="space-y-4 font-body text-base sm:text-lg text-slate-400 leading-relaxed">
            <p>
              Most teams still lose hours to repetitive work — answering the same questions, copying data between
              tools, chasing invoices. We build the autonomous agents and workflows that take that work off their
              plate, so people can focus on what actually moves the business forward.
            </p>
            <p>
              From a first consultation to a live, monitored deployment, we own the whole journey — and keep
              optimizing long after launch.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="presentation-card rounded-2xl p-5 sm:p-6 text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-tighter mb-1">{s.val}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* Values */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
      <Reveal className="text-center mb-12">
        <p className="font-mono text-primary text-[10px] uppercase tracking-[0.3em] mb-4">What we value</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">How we work</h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUES.map((v, idx) => (
          <Reveal key={v.title} delay={idx * 90}>
            <div className="presentation-card h-full p-7 rounded-3xl">
              <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">{v.icon}</span>
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight mb-2">{v.title}</h3>
              <p className="font-body text-sm text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Location */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
      <Reveal>
        <div className="border-glow rounded-[2rem] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Headquarters</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">{SITE.city}, {SITE.country}</h2>
            <p className="font-body text-slate-400">Serving the {SITE.region} region with global cloud infrastructure.</p>
          </div>
          <Link to="/contact" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-background-dark rounded-2xl font-display text-sm font-bold uppercase tracking-[0.15em] shadow-[0_20px_50px_rgba(161,158,255,0.35)] hover:scale-[1.03] active:scale-95 transition-all whitespace-nowrap">
            Work with us
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
      </Reveal>
    </section>

    <CtaBand />
  </>
);

export default About;
