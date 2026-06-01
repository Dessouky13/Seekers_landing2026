import React, { useRef, useState } from 'react';

/**
 * Company lead-capture form. Follows the ui-ux-pro-max Forms & Feedback rules:
 * visible labels, required markers, inline validation on blur, error text below
 * each field with role="alert", semantic input types + autocomplete, a
 * submit→loading→success flow, and focus-to-first-invalid on error.
 *
 * Submission: POSTs JSON to VITE_CONTACT_ENDPOINT when configured; otherwise
 * falls back to a pre-filled mailto so leads still reach the team.
 */

const CONTACT_EMAIL = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'team@seekersai.org';
// Prefer a dedicated contact endpoint, fall back to the configured Formspree form.
const CONTACT_ENDPOINT = ((import.meta as any).env?.VITE_CONTACT_ENDPOINT ||
  (import.meta as any).env?.VITE_WAITLIST_ENDPOINT) as string | undefined;

const SERVICES = [
  'AI Chatbots & Customer Engagement',
  'Intelligent Process Automation',
  'Custom Agentic Application',
  'Finance & Invoice Automation',
  'Not sure yet — advise me',
];
const SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  size: string;
  service: string;
  message: string;
}
type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: '', email: '', company: '', phone: '', size: '', service: '', message: '' };

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (key: keyof FormState, value: string): string => {
    switch (key) {
      case 'name':
        return value.trim().length < 2 ? 'Please enter your full name.' : '';
      case 'email':
        if (!value.trim()) return 'Work email is required.';
        return emailOk(value) ? '' : 'Enter a valid email (e.g. you@company.com).';
      case 'company':
        return value.trim().length < 2 ? 'Please enter your company name.' : '';
      case 'message':
        return value.trim().length < 10 ? 'Tell us a little about your goals (10+ characters).' : '';
      default:
        return '';
    }
  };

  const validateAll = (): Errors => {
    const e: Errors = {};
    (['name', 'email', 'company', 'message'] as (keyof FormState)[]).forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) e[k] = msg;
    });
    return e;
  };

  const onChange = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) setErrors((er) => ({ ...er, [key]: validateField(key, value) }));
  };

  const onBlur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateField(key, form[key]) }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eMap = validateAll();
    setErrors(eMap);
    setTouched({ name: true, email: true, company: true, message: true });

    if (Object.keys(eMap).length) {
      // focus-management: jump to the first invalid field
      const first = (['name', 'email', 'company', 'message'] as (keyof FormState)[]).find((k) => eMap[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...form,
            _subject: `New inquiry from ${form.company || form.name}`,
            source: 'seekers-landing',
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // Fallback: open the user's mail client pre-filled so the lead still reaches us.
        const subject = `New inquiry from ${form.company || form.name}`;
        const body =
          `Name: ${form.name}\nWork email: ${form.email}\nCompany: ${form.company}\n` +
          `Phone: ${form.phone || '—'}\nCompany size: ${form.size || '—'}\n` +
          `Service: ${form.service || '—'}\n\n${form.message}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      setStatus('success');
      setForm(EMPTY);
      setTouched({});
    } catch (err) {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full min-h-[52px] rounded-2xl bg-white/[0.04] border px-4 py-3.5 text-[15px] text-white placeholder:text-slate-500 ' +
    'font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 ' +
    'focus:bg-white/[0.06]';
  const borderOf = (k: keyof FormState) => (errors[k] ? 'border-red-400/70' : 'border-white/10');
  const Label: React.FC<{ htmlFor: string; required?: boolean; children: React.ReactNode }> = ({ htmlFor, required, children }) => (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
      {children}
      {required && <span className="ml-1 text-primary">*</span>}
    </label>
  );
  const ErrorText: React.FC<{ id: string; msg?: string }> = ({ id, msg }) =>
    msg ? (
      <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-red-300">
        <span className="material-symbols-outlined text-sm">error</span>
        {msg}
      </p>
    ) : null;

  if (status === 'success') {
    return (
      <div className="border-glow sheen rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center animate-fade-up">
        <div className="relative mb-6 flex size-20 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
          <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
          <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">Message received 🎉</h3>
        <p className="text-slate-400 font-body max-w-md leading-relaxed mb-8">
          Thanks for reaching out. A Seekers strategist will get back to you within one business day to schedule
          your discovery call.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
        >
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="border-glow rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full name */}
        <div>
          <Label htmlFor="cf-name" required>Full name</Label>
          <input
            id="cf-name" name="name" type="text" autoComplete="name"
            value={form.name} onChange={onChange('name')} onBlur={onBlur('name')}
            aria-invalid={!!errors.name} aria-describedby="cf-name-err"
            className={`${inputBase} ${borderOf('name')}`} placeholder="Jane Doe"
          />
          <ErrorText id="cf-name-err" msg={errors.name} />
        </div>

        {/* Work email */}
        <div>
          <Label htmlFor="cf-email" required>Work email</Label>
          <input
            id="cf-email" name="email" type="email" inputMode="email" autoComplete="email"
            value={form.email} onChange={onChange('email')} onBlur={onBlur('email')}
            aria-invalid={!!errors.email} aria-describedby="cf-email-err"
            className={`${inputBase} ${borderOf('email')}`} placeholder="jane@company.com"
          />
          <ErrorText id="cf-email-err" msg={errors.email} />
        </div>

        {/* Company */}
        <div>
          <Label htmlFor="cf-company" required>Company</Label>
          <input
            id="cf-company" name="company" type="text" autoComplete="organization"
            value={form.company} onChange={onChange('company')} onBlur={onBlur('company')}
            aria-invalid={!!errors.company} aria-describedby="cf-company-err"
            className={`${inputBase} ${borderOf('company')}`} placeholder="Acme Inc."
          />
          <ErrorText id="cf-company-err" msg={errors.company} />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="cf-phone">Phone <span className="text-slate-600 normal-case tracking-normal">(optional)</span></Label>
          <input
            id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
            value={form.phone} onChange={onChange('phone')}
            className={`${inputBase} ${borderOf('phone')}`} placeholder="+20 100 000 0000"
          />
        </div>

        {/* Company size */}
        <div>
          <Label htmlFor="cf-size">Company size</Label>
          <select
            id="cf-size" name="size" value={form.size} onChange={onChange('size')}
            className={`${inputBase} ${borderOf('size')} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-surface-dark">Select team size</option>
            {SIZES.map((s) => <option key={s} value={s} className="bg-surface-dark">{s} employees</option>)}
          </select>
        </div>

        {/* Service */}
        <div>
          <Label htmlFor="cf-service">Interested in</Label>
          <select
            id="cf-service" name="service" value={form.service} onChange={onChange('service')}
            className={`${inputBase} ${borderOf('service')} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-surface-dark">Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s} className="bg-surface-dark">{s}</option>)}
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <Label htmlFor="cf-message" required>How can we help?</Label>
          <textarea
            id="cf-message" name="message" rows={4}
            value={form.message} onChange={onChange('message')} onBlur={onBlur('message')}
            aria-invalid={!!errors.message} aria-describedby="cf-message-err"
            className={`${inputBase} ${borderOf('message')} resize-none`}
            placeholder="Tell us about the workflows you'd like to automate, your current tools, and your goals…"
          />
          <ErrorText id="cf-message-err" msg={errors.message} />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-200">
          <span className="material-symbols-outlined text-base">warning</span>
          Something went wrong sending your message. Please email us directly at {CONTACT_EMAIL}.
        </p>
      )}

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-background-dark shadow-[0_20px_50px_rgba(161,158,255,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
        >
          {status === 'submitting' ? (
            <>
              <span className="size-4 rounded-full border-2 border-background-dark/40 border-t-background-dark animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Request a Consultation
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </>
          )}
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
          We reply within 1 business day · No spam, ever
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
