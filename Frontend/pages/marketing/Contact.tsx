import React from 'react';
import PageHeader from '../../components/PageHeader';
import Seo from '../../components/Seo';
import ContactForm from '../../components/ContactForm';
import { Reveal } from '../../components/Reveal';
import { SITE } from '../../src/siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SITE.name}`,
  url: `${SITE.url}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: SITE.name,
    email: SITE.email,
    telephone: SITE.phones[0],
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: 'EG' },
  },
};

const DETAILS = [
  { icon: 'mail', label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'call', label: 'Call us', value: SITE.phones.join(' · '), href: `tel:${SITE.phones[0]}` },
  { icon: 'location_on', label: 'Visit', value: `${SITE.city}, ${SITE.country}`, href: undefined },
];

const Contact: React.FC = () => (
  <>
    <Seo
      title="Contact Seekers AI — Book a Discovery Call"
      description="Get in touch with Seekers AI. Tell us about your automation goals and a strategist will respond within one business day. Based in Cairo, serving the MENA region."
      path="/contact"
      jsonLd={jsonLd}
    />
    <PageHeader
      crumb="Contact"
      eyebrow="Let's talk"
      title={<>Let's build your <span className="text-gradient">automation advantage</span></>}
      subtitle="Tell us about your goals and a Seekers strategist will reach out within one business day."
    />

    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 space-y-8">
          <Reveal>
            <div className="space-y-4">
              {DETAILS.map((d) => {
                const inner = (
                  <>
                    <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <span className="material-symbols-outlined text-primary">{d.icon}</span>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">{d.label}</p>
                      <p className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-primary transition-colors break-words">{d.value}</p>
                    </div>
                  </>
                );
                return d.href ? (
                  <a key={d.label} href={d.href} className="flex items-center gap-4 group">{inner}</a>
                ) : (
                  <div key={d.label} className="flex items-center gap-4 group">{inner}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-glow rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-5">What happens next</h2>
              <ol className="space-y-4">
                {[
                  { t: 'We review your message', d: 'A strategist reads your goals and current setup.' },
                  { t: 'We reach out within 1 business day', d: 'By email or WhatsApp — whatever suits you.' },
                  { t: 'We scope a tailored plan', d: 'Clear next steps and the expected ROI before you commit.' },
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">{i + 1}</span>
                    <div>
                      <p className="font-display font-semibold text-white">{s.t}</p>
                      <p className="font-body text-sm text-slate-400 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={80}><ContactForm /></Reveal>
        </div>
      </div>
    </section>
  </>
);

export default Contact;
