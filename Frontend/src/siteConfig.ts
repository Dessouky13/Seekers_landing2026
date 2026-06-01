// Central marketing-site config + navigation. Single source of truth so the
// Navbar, Footer, SEO tags, and sitemap stay in sync.

const env = (import.meta as any).env || {};

export const SITE = {
  name: 'Seekers AI',
  legalName: 'Seekers AI',
  url: (env.VITE_SITE_URL || 'https://www.seekersai.org').replace(/\/$/, ''),
  email: env.VITE_CONTACT_EMAIL || 'team@seekersai.org',
  phones: ['01044332566', '01044443752'],
  city: 'Cairo',
  country: 'Egypt',
  region: 'MENA',
  tagline: 'Intelligent AI Automation for the MENA Region',
  description:
    'Seekers AI designs, deploys, and optimizes autonomous AI agents and intelligent automation — AI chatbots, process automation, agentic applications, and finance automation — for businesses across the MENA region.',
  social: {
    linkedin: 'https://www.linkedin.com/company/seekersai',
    instagram: 'https://www.instagram.com/seekersai',
    x: 'https://x.com/seekersai',
  },
};

export interface NavItem {
  label: string;
  to: string;
}

// Primary navigation (also used to generate the sitemap order).
export const NAV_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

export const ogImage = (env.VITE_OG_IMAGE as string) || '/seekers-logo.png';
