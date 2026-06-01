import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import Tilt from './Tilt';

const STEPS = [
  { step: '01', title: 'Consultation', desc: 'We audit your current workflows and identify the highest-impact automation opportunities.', icon: 'handshake' },
  { step: '02', title: 'Provisioning', desc: 'We configure your knowledge base and Meta connections on the Seekers platform.', icon: 'settings' },
  { step: '03', title: 'Deployment', desc: 'Our engineers push your agentic workflows live across all your channels.', icon: 'rocket_launch' },
  { step: '04', title: 'Optimization', desc: 'Real-time monitoring and iterative training for maximum, compounding performance.', icon: 'trending_up' },
];

/**
 * Premium 4-step process. All steps stay fully legible (no dimming); a flowing
 * pulse travels the connector and the "active" node glows in sequence. Cards use
 * scroll-reveal + pointer tilt. Mobile renders a clean vertical rail.
 */
const ProcessTimeline: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Desktop */}
      <div className="hidden md:block relative">
        {/* connector line with flowing pulse, aligned to the node row */}
        <div className="absolute left-0 right-0 top-[44px] h-px bg-white/10">
          <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 animate-marquee" style={{ backgroundSize: '50% 100%' }} />
        </div>

        <div className="grid grid-cols-4 gap-5 lg:gap-7">
          {STEPS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <Reveal key={item.step} delay={idx * 110}>
                <Tilt max={6} className="h-full">
                  <div className="relative flex flex-col items-center text-center">
                    {/* node on the line */}
                    <div
                      className={`relative z-10 mb-7 flex size-[88px] items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                        isActive
                          ? 'border-primary bg-gradient-to-br from-primary/25 to-indigo-500/20 shadow-[0_0_40px_rgba(161,158,255,0.45)] scale-105'
                          : 'border-white/15 bg-surface-dark'
                      }`}
                    >
                      {isActive && <span className="absolute inset-0 rounded-2xl border border-primary/50 animate-ping opacity-40" />}
                      <span className={`material-symbols-outlined text-3xl transition-colors duration-500 ${isActive ? 'text-primary' : 'text-slate-300'}`}>
                        {item.icon}
                      </span>
                    </div>

                    {/* card */}
                    <div
                      className={`w-full rounded-3xl p-6 transition-all duration-500 ${
                        isActive ? 'border-glow' : 'presentation-card'
                      }`}
                    >
                      <span className={`font-mono text-[11px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                        Step {item.step}
                      </span>
                      <h3 className="mt-2 mb-2.5 font-display text-xl lg:text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                      <p className="font-body text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Mobile — vertical rail */}
      <div className="md:hidden relative pl-14">
        <div className="absolute left-[26px] top-3 bottom-3 w-px bg-white/10">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-indigo-500 to-primary/30 transition-all duration-700 rounded-full" style={{ height: `${((active + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="space-y-5">
          {STEPS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <Reveal key={item.step} delay={idx * 80}>
                <div className="relative">
                  <div
                    className={`absolute -left-14 top-1 flex size-[52px] items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                      isActive ? 'border-primary bg-primary/20 shadow-[0_0_24px_rgba(161,158,255,0.4)]' : 'border-white/15 bg-surface-dark'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl ${isActive ? 'text-primary' : 'text-slate-300'}`}>{item.icon}</span>
                  </div>
                  <div className={`rounded-2xl p-5 transition-all duration-500 ${isActive ? 'border-glow' : 'presentation-card'}`}>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-primary' : 'text-slate-500'}`}>Step {item.step}</span>
                    <h3 className="mt-1.5 mb-1.5 font-display text-lg font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="font-body text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
