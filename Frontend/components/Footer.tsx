import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { SITE } from '../src/siteConfig';

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'AI Chatbots', to: '/solutions#chatbots' },
      { label: 'Process Automation', to: '/solutions#automation' },
      { label: 'Agentic Applications', to: '/solutions#agentic' },
      { label: 'Finance Automation', to: '/solutions#finance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Industries', to: '/industries' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const Footer: React.FC = () => (
  <footer className="relative z-10 border-t border-white/10 mt-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        {/* brand */}
        <div className="md:col-span-5 space-y-5">
          <Link to="/" aria-label="Seekers AI home">
            <Logo size={36} showText textClassName="text-lg" />
          </Link>
          <p className="max-w-sm font-body text-sm leading-relaxed text-slate-400">
            {SITE.description}
          </p>
          <div className="flex items-center gap-3 pt-1">
            {[
              { href: SITE.social.linkedin, icon: 'linkedin', label: 'LinkedIn' },
              { href: SITE.social.x, icon: 'x', label: 'X' },
              { href: SITE.social.instagram, icon: 'instagram', label: 'Instagram' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* link columns */}
        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="font-display text-sm text-slate-300 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact */}
        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="text-slate-300 hover:text-primary transition-colors break-all">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phones[0]}`} className="text-slate-300 hover:text-primary transition-colors">
                {SITE.phones.join(' · ')}
              </a>
            </li>
            <li className="text-slate-400">
              {SITE.city}, {SITE.country} · {SITE.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          © {2026} {SITE.name} · All rights reserved
        </p>
        <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Built in {SITE.city} · Serving the {SITE.region}
        </p>
      </div>
    </div>
  </footer>
);

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' } as const;
  if (name === 'linkedin')
    return (
      <svg {...p}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.5 0h4.4v1.9h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V22h-4.6v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V22h-4.6V8z" /></svg>
    );
  if (name === 'x')
    return (
      <svg {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
    );
  return (
    <svg {...p}><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.41a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" /></svg>
  );
};

export default Footer;
