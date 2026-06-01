// Shared marketing content — single source of truth for pages + JSON-LD.

export interface Solution {
  id: string;
  icon: string;
  title: string;
  short: string;
  long: string;
  features: string[];
  tags: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'chatbots',
    icon: 'chat_bubble',
    title: 'AI Chatbots & Customer Engagement',
    short: 'Intelligent agents that handle inquiries, qualify leads, and support sales 24/7.',
    long: 'Deploy multilingual (Arabic + English) AI agents across WhatsApp, Instagram, Messenger, and your website. They answer questions, qualify and route leads, book appointments, and escalate to humans when needed — so you never miss a customer interaction, day or night.',
    features: [
      '24/7 multilingual support (Arabic + English)',
      'WhatsApp, Instagram, Messenger & web',
      'Lead qualification and routing',
      'Human handoff with full context',
      'Trained on your knowledge base',
    ],
    tags: ['24/7 Support', 'Lead Gen', 'Multi-channel'],
  },
  {
    id: 'automation',
    icon: 'account_tree',
    title: 'Intelligent Process Automation',
    short: 'Streamline complex workflows by integrating your CRM and tools.',
    long: 'We connect your CRM, spreadsheets, email, and internal tools into automated workflows powered by n8n and custom AI. Automate data entry, order processing, reporting, and approvals to remove repetitive manual work and eliminate human error.',
    features: [
      'CRM, email & spreadsheet integration',
      'Automated data entry and routing',
      'Scheduled reports and alerts',
      'n8n-powered workflow orchestration',
      'Audit trail and error handling',
    ],
    tags: ['CRM Integration', 'Workflow Ops', 'Zero Error'],
  },
  {
    id: 'agentic',
    icon: 'auto_awesome',
    title: 'Customized Agentic Applications',
    short: 'A SaaS model with multiple AI agents controlling your infrastructure.',
    long: 'We build bespoke, multi-agent applications on top of your infrastructure — agents that can plan, act, call tools, and report back to you. From internal copilots to customer-facing products, we design secure, cloud-based agentic systems tailored to your operations.',
    features: [
      'Multi-agent orchestration',
      'Tool-calling and API integrations',
      'Secure, cloud-based architecture',
      'Custom dashboards and reporting',
      'Role-based access control',
    ],
    tags: ['Cloud-based', 'Multi-Agent', 'Secured'],
  },
  {
    id: 'finance',
    icon: 'payments',
    title: 'Finance & Invoice Automation',
    short: 'Automated invoicing, payment reminders, and financial insights.',
    long: 'Take control of cash flow with automated invoice generation and tracking, intelligent payment reminders, reconciliation, and real-time financial reporting — giving finance teams accurate insight without the manual spreadsheet work.',
    features: [
      'Automated invoice generation & tracking',
      'Smart payment reminders',
      'Reconciliation and reporting',
      'Real-time cash-flow insights',
      'Export to your accounting stack',
    ],
    tags: ['Analytics', 'Payment Tracking', 'Invoicing'],
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  icon: string;
}

export const STATS: Stat[] = [
  { value: 60, suffix: '%', label: 'Cost Reduction', desc: 'Lower operational expenses via workflow efficiency.', icon: 'payments' },
  { value: 70, suffix: '%', label: 'Faster Response', desc: 'Instant replies that lift customer satisfaction.', icon: 'bolt' },
  { value: 5, suffix: 'x', label: 'ROI in 6 Months', desc: 'Measurable return realized within two quarters of going live.', icon: 'savings' },
  { value: 100, suffix: '%', label: 'Automation', desc: 'Eliminate manual, repetitive enterprise tasks.', icon: 'autorenew' },
];

export interface Industry {
  icon: string;
  name: string;
  desc: string;
  useCases: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    icon: 'storefront',
    name: 'Retail & E-commerce',
    desc: 'Convert more shoppers and cut support load with always-on assistants.',
    useCases: ['Order tracking & FAQs', 'Abandoned-cart recovery', 'Product recommendations', 'WhatsApp catalog sales'],
  },
  {
    icon: 'apartment',
    name: 'Real Estate',
    desc: 'Qualify and nurture property leads around the clock.',
    useCases: ['Lead qualification', 'Viewing scheduling', 'Listing Q&A', 'CRM sync'],
  },
  {
    icon: 'medical_services',
    name: 'Healthcare & Clinics',
    desc: 'Automate booking and patient communication, securely.',
    useCases: ['Appointment booking', 'Reminders & follow-ups', 'Insurance FAQs', 'Triage routing'],
  },
  {
    icon: 'account_balance',
    name: 'Finance & Fintech',
    desc: 'Speed up onboarding and support with compliant automation.',
    useCases: ['KYC assistance', 'Invoice automation', 'Payment reminders', 'Fraud-aware routing'],
  },
  {
    icon: 'restaurant',
    name: 'Hospitality & F&B',
    desc: 'Take reservations and orders on autopilot.',
    useCases: ['Reservations', 'WhatsApp ordering', 'Menu Q&A', 'Loyalty follow-ups'],
  },
  {
    icon: 'school',
    name: 'Education',
    desc: 'Handle admissions and student questions at scale.',
    useCases: ['Admissions Q&A', 'Enrollment workflows', 'Reminders', 'Multilingual support'],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What does Seekers AI do?',
    a: 'Seekers AI designs, deploys, and optimizes AI automation for businesses — including AI chatbots, intelligent process automation, custom agentic applications, and finance & invoice automation. We focus on companies across the MENA region.',
  },
  {
    q: 'Which channels do your AI chatbots support?',
    a: 'Our agents work across WhatsApp, Instagram, Facebook Messenger, and your website, with full support for both Arabic and English conversations.',
  },
  {
    q: 'How long does it take to launch?',
    a: 'Most engagements move from consultation to a live deployment within 2–4 weeks, depending on the complexity of your workflows and integrations.',
  },
  {
    q: 'Do you integrate with our existing tools and CRM?',
    a: 'Yes. We integrate with popular CRMs, spreadsheets, email, payment tools, and internal systems, and orchestrate workflows using n8n and custom connectors.',
  },
  {
    q: 'Is my data secure?',
    a: 'Security is built in. We use cloud-based, access-controlled architectures, keep an audit trail of automated actions, and follow least-privilege principles for every integration.',
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing depends on scope — number of channels, integrations, and the complexity of your automations. Most clients see a 5x return within six months. Book a discovery call for a tailored quote.',
  },
  {
    q: 'Where is Seekers AI based?',
    a: 'Seekers AI is headquartered in Cairo, Egypt, and serves clients across the MENA region with global cloud infrastructure.',
  },
];
