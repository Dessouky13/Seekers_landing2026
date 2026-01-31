
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import ComingSoonModal from '../components/ComingSoonModal';

// Process Timeline Steps Data
const processSteps = [
  { 
    step: '01', 
    title: 'Consultation', 
    desc: 'We audit your current workflows and identify automation opportunities.',
    icon: 'handshake'
  },
  { 
    step: '02', 
    title: 'Provisioning', 
    desc: 'We configure your knowledge base and meta connections on the platform.',
    icon: 'settings'
  },
  { 
    step: '03', 
    title: 'Deployment', 
    desc: 'Our engineers push your agentic workflows live to all social channels.',
    icon: 'rocket_launch'
  },
  { 
    step: '04', 
    title: 'Optimization', 
    desc: 'Real-time monitoring and iterative training for maximum performance.',
    icon: 'trending_up'
  },
];

// Energy Pulse Component - Travels along the timeline track
const EnergyPulse: React.FC<{ position: number }> = ({ position }) => (
  <div 
    className="absolute transition-all duration-1000 ease-out z-10 pointer-events-none"
    style={{ 
      left: `${position}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {/* Core pulse */}
    <div className="relative">
      {/* Outer glow ring */}
      <div className="absolute -inset-3 bg-primary/20 rounded-full blur-xl animate-pulse" />
      
      {/* Middle glow */}
      <div className="absolute -inset-1.5 bg-primary/40 rounded-full blur-md" />
      
      {/* Core orb */}
      <div className="relative size-4 bg-gradient-to-br from-white via-primary to-indigo-500 rounded-full shadow-[0_0_20px_rgba(161,158,255,0.8)]" />
      
      {/* Sparkle particles */}
      <div className="absolute -top-1 -left-1 size-1 bg-white rounded-full animate-ping" style={{ animationDuration: '1s' }} />
      <div className="absolute -bottom-1 -right-1 size-1 bg-white rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
    </div>
  </div>
);

// Trailing particles that follow the pulse
const TrailingParticles: React.FC<{ position: number }> = ({ position }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute transition-all duration-1000 ease-out z-5 pointer-events-none"
        style={{
          left: `${Math.max(0, position - (i + 1) * 3)}%`,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 1 - (i * 0.2)
        }}
      >
        <div 
          className="size-1.5 bg-primary/60 rounded-full blur-[1px]"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      </div>
    ))}
  </>
);

// Process Timeline Component
const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pulsePosition, setPulsePosition] = useState(12.5);

  // Auto-advance through steps
  useEffect(() => {
    const stepPositions = [12.5, 37.5, 62.5, 87.5]; // Positions for 4 steps (centered in each quarter)
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 4;
        // Animate pulse to next position
        setPulsePosition(stepPositions[next]);
        return next;
      });
    }, 3000); // Change step every 3 seconds

    // Set initial position
    setPulsePosition(stepPositions[0]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Desktop Timeline */}
      <div className="hidden md:block relative pt-20 pb-8">
        {/* Timeline track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2 overflow-visible">
          {/* Progress fill with gradient */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-indigo-500 to-primary rounded-full transition-all duration-1000"
            style={{ width: `${pulsePosition + 2}%` }}
          />
          
          {/* Animated glow on the track */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-3 w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm transition-all duration-1000 rounded-full"
            style={{ left: `${pulsePosition - 5}%` }}
          />
        </div>

        {/* Energy Pulse */}
        <EnergyPulse position={pulsePosition} />
        
        {/* Trailing Particles */}
        <TrailingParticles position={pulsePosition} />

        {/* Step nodes */}
        <div className="relative flex justify-between">
          {processSteps.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center w-1/4 transition-all duration-500 ${
                idx <= activeStep ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Futuristic Node */}
              <div className="relative group">
                {/* Outer rotating ring - only on active */}
                {idx === activeStep && (
                  <div className="absolute -inset-2 rounded-full border border-primary/30 animate-[spin_8s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 bg-primary rounded-full" />
                  </div>
                )}
                
                {/* Glow effect */}
                {idx <= activeStep && (
                  <div className="absolute -inset-3 bg-primary/20 rounded-full blur-xl transition-all duration-500" />
                )}
                
                {/* Main node */}
                <div 
                  className={`relative size-16 md:size-18 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    idx <= activeStep 
                      ? 'bg-gradient-to-br from-primary/20 to-indigo-500/20 border-primary shadow-[0_0_30px_rgba(161,158,255,0.4)]' 
                      : 'bg-white/5 border-white/10'
                  } ${idx === activeStep ? 'scale-110' : 'group-hover:scale-105'}`}
                >
                  {/* Inner glow */}
                  {idx <= activeStep && (
                    <div className="absolute inset-1 bg-gradient-to-br from-primary/10 to-transparent rounded-xl" />
                  )}
                  
                  <span className={`material-symbols-outlined text-2xl md:text-3xl font-black transition-colors relative z-10 ${
                    idx <= activeStep ? 'text-primary' : 'text-slate-500'
                  }`}>
                    {item.icon}
                  </span>
                  
                  {/* Corner accents */}
                  <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg transition-colors ${idx <= activeStep ? 'border-primary' : 'border-white/20'}`} />
                  <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-lg transition-colors ${idx <= activeStep ? 'border-primary' : 'border-white/20'}`} />
                  <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg transition-colors ${idx <= activeStep ? 'border-primary' : 'border-white/20'}`} />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg transition-colors ${idx <= activeStep ? 'border-primary' : 'border-white/20'}`} />
                </div>
                
                {/* Pulse rings when active */}
                {idx === activeStep && (
                  <>
                    <div className="absolute inset-0 rounded-2xl border border-primary animate-ping opacity-30" />
                    <div className="absolute -inset-1 rounded-2xl border border-primary/50 animate-pulse" />
                  </>
                )}
              </div>

              {/* Step content */}
              <div className={`mt-10 text-center transition-all duration-500 ${
                idx === activeStep ? 'transform scale-105' : ''
              }`}>
                <span className={`text-sm font-black uppercase tracking-widest transition-colors ${
                  idx <= activeStep ? 'text-primary' : 'text-slate-600'
                }`}>
                  Step {item.step}
                </span>
                <h4 className={`text-2xl md:text-3xl font-black mt-2 mb-3 tracking-tight transition-colors ${
                  idx <= activeStep ? 'text-white' : 'text-slate-500'
                }`}>
                  {item.title}
                </h4>
                <p className={`text-base md:text-lg font-medium leading-relaxed max-w-[240px] mx-auto transition-colors ${
                  idx <= activeStep ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline (Vertical) */}
      <div className="md:hidden relative pl-16 pr-4">
        {/* Vertical line */}
        <div className="absolute left-6 top-2 bottom-2 w-1 bg-white/10 rounded-full">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-indigo-500 to-primary/50 rounded-full transition-all duration-1000"
            style={{ height: `${((activeStep + 1) / 4) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {processSteps.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative transition-all duration-500 ${
                idx <= activeStep ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Node */}
              <div 
                className={`absolute -left-10 top-1 size-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2 ${
                  idx <= activeStep 
                    ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(161,158,255,0.4)]' 
                    : 'bg-white/5 border-white/20'
                } ${idx === activeStep ? 'scale-110' : ''}`}
              >
                {idx === activeStep && (
                  <div className="absolute inset-0 rounded-xl border border-primary animate-ping opacity-40" />
                )}
                <svg className={`w-5 h-5 ${idx <= activeStep ? 'text-primary' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  {idx < activeStep ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  ) : item.icon === 'handshake' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  ) : item.icon === 'settings' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  ) : item.icon === 'rocket_launch' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  )}
                </svg>
              </div>

              {/* Content Card */}
              <div className={`bg-white/5 border rounded-2xl p-4 transition-all duration-500 ${
                idx === activeStep ? 'border-primary/30 bg-primary/5' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                    idx <= activeStep ? 'bg-primary/20 text-primary' : 'bg-white/10 text-slate-500'
                  }`}>
                    Step {item.step}
                  </span>
                  {idx === activeStep && (
                    <span className="text-[9px] font-bold text-primary animate-pulse">● Active</span>
                  )}
                </div>
                <h4 className={`text-lg font-black tracking-tight mb-1 ${
                  idx <= activeStep ? 'text-white' : 'text-slate-500'
                }`}>
                  {item.title}
                </h4>
                <p className={`text-sm font-medium leading-relaxed ${
                  idx <= activeStep ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline legend */}
      <div className="mt-8 md:mt-12 flex items-center justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">
        <div className="flex items-center gap-2">
          <div className="size-2.5 sm:size-3 rounded-full bg-primary animate-pulse" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2.5 sm:size-3 rounded-full bg-white/30" />
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Cal.com link from environment or default
  const calLink = import.meta.env.VITE_CAL_LINK || 'seeker/30min';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '01211100767';

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll direction detection for hide/show nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        // Always show nav near top
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide nav
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show nav
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('trust');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary/5 blur-[100px] md:blur-[150px] rounded-full animate-glow-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] bg-indigo-500/5 blur-[100px] md:blur-[150px] rounded-full animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating Header Navigation with scroll-hide */}
      <div className={`fixed top-2 sm:top-4 md:top-10 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl z-50 px-1 sm:px-2 md:px-4 transition-transform duration-500 ${isNavVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
        <nav className="h-14 sm:h-20 md:h-32 flex items-center justify-between px-3 sm:px-4 md:px-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-2xl md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <div className="flex items-center shrink-0">
             <Logo size={isMobile ? 90 : 200} showText={false} className="!items-start" />
          </div>
          
          {/* Nav Links - All screen sizes */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-16">
            {['Solutions', 'Impact', 'Process', 'Trust'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={scrollToSection(item.toLowerCase())}
                className="text-[8px] sm:text-[10px] lg:text-[12px] font-black text-slate-300 hover:text-primary transition-all uppercase tracking-[0.1em] sm:tracking-[0.3em] lg:tracking-[0.5em] hover:scale-110 active:scale-95"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            {/* Desktop Portal button */}
            <button onClick={() => setIsComingSoonModalOpen(true)} className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-black text-slate-300 hover:text-primary transition-all uppercase tracking-[0.2em] sm:tracking-[0.4em] px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-white/5">Portal</button>
            
            {/* CTA Button */}
            <button onClick={() => setIsComingSoonModalOpen(true)} className="px-3 sm:px-5 md:px-12 py-2 sm:py-3 md:py-6 bg-primary text-background-dark rounded-lg sm:rounded-xl md:rounded-[2rem] text-[8px] sm:text-[10px] md:text-sm font-black shadow-[0_20px_40px_rgba(161,158,255,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.1em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-2 md:gap-4 whitespace-nowrap">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-36 sm:pt-48 md:pt-72 pb-16 sm:pb-24 md:pb-48 text-center relative z-10">
        <div className="flex flex-col items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-10 max-w-6xl animate-in slide-in-from-bottom-12 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-[8rem] font-extrabold tracking-tighter leading-[1.15] sm:leading-[1.1] md:leading-[1.2] mb-2 sm:mb-4 md:mb-8 overflow-visible">
              Transform Your Business <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400 italic py-1 sm:py-2 md:py-6 px-2 sm:px-4">with Intelligent AI</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] md:text-lg lg:text-xl text-slate-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] opacity-80 mb-4 sm:mb-8 md:mb-16">
              // NEXT-GEN AUTOMATION FOR THE MENA REGION
            </p>
            <div className="pt-6 sm:pt-8 md:pt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12">
              <button onClick={scrollToBooking} className="w-full sm:w-auto px-8 sm:px-10 md:px-20 py-4 sm:py-5 md:py-8 bg-primary text-background-dark rounded-xl sm:rounded-2xl md:rounded-[2.5rem] text-xs sm:text-sm md:text-lg font-black shadow-[0_30px_60px_rgba(161,158,255,0.5)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                Book a Discovery Call
              </button>
              <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-4 opacity-40">
                <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">Cairo Headquarters</span>
                <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">Global Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Portfolio */}
      <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-20">
          <p className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">OUR SOLUTIONS PORTFOLIO</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Comprehensive AI Solutions for <br className="hidden md:block" /> Modern Business</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            { title: 'AI Chatbots & Customer Engagement', icon: 'chat_bubble', desc: 'Deploy intelligent agents that handle inquiries, qualify leads, and support sales 24/7. Never miss a customer interaction again.', tags: ['24/7 Support', 'Lead Gen', 'Multi-channel'] },
            { title: 'Intelligent Process Automation', icon: 'account_tree', desc: 'Streamline complex workflows by integrating your CRM and tools. Automate data entry, routing, and reporting to boost efficiency.', tags: ['CRM Integration', 'Workflow Ops', 'Zero Error'] },
            { title: 'Customized Agentic Application', icon: 'auto_awesome', desc: 'Imagine Creating A SAAS model with any feature’s connected to it’s infrastructure multiple AI Agents to control, answer and report to you.', tags: ['Cloud based', 'Multi-Agent', 'Secured'] },
            { title: 'Finance & Invoice Automation', icon: 'payments', desc: 'Take control of cash flow with automated invoice management, payment reminders, and real time financial insight generation.', tags: ['Analytics', 'Payment Tracking', 'Invoicing'] },
          ].map((item, idx) => (
            <div key={idx} className="presentation-card p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] group">
              <div className="size-16 md:size-20 bg-primary/10 text-primary rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform shadow-2xl shadow-primary/5">
                <span className="material-symbols-outlined text-3xl md:text-5xl font-black">{item.icon}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 font-medium text-base md:text-xl leading-relaxed mb-6 md:mb-10">{item.desc}</p>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2.5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black text-slate-300 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Impact Section */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative z-10 bg-white/5 rounded-2xl sm:rounded-[2rem] md:rounded-[4rem] border border-white/10 my-6 sm:my-10 md:my-20">
        <div className="text-center mb-10 sm:mb-16 md:mb-24">
          <p className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6">PROVEN ROI & IMPACT</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">Results That Scale Your Business</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-10">
          {[
            { val: '60%', label: 'Cost Reduction', desc: 'Lower operational expenses via workflow efficiency.', icon: 'payments' },
            { val: '70%', label: 'Faster Response', desc: 'Instant replies improving customer satisfaction.', icon: 'bolt' },
            { val: '5x', label: 'ROI in 6 Months', desc: 'Measurable return realized within two quarters.', icon: 'savings' },
            { val: '100%', label: 'Automation', desc: 'Eliminate manual repetitive enterprise tasks.', icon: 'autorenew' },
          ].map((item, idx) => (
            <div key={idx} className="presentation-card p-4 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-[3rem] text-center flex flex-col items-center">
              <div className="size-10 sm:size-12 md:size-16 bg-primary/10 text-primary rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 md:mb-8 shadow-xl shadow-primary/5">
                <span className="material-symbols-outlined text-lg sm:text-2xl md:text-3xl font-black">{item.icon}</span>
              </div>
              <p className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-primary mb-1 sm:mb-2 md:mb-4 tracking-tighter">{item.val}</p>
              <h4 className="text-[8px] sm:text-[10px] md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-2 sm:mb-4 md:mb-6">{item.label}</h4>
              <p className="text-[9px] sm:text-[11px] md:text-sm text-slate-400 font-medium leading-relaxed hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - Animated Timeline */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative z-10">
        <div className="text-center mb-10 sm:mb-16 md:mb-24">
          <p className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">THE PROCESS</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">From Strategy to Execution</h2>
        </div>
        
        {/* Animated Timeline */}
        <ProcessTimeline />
      </section>

      {/* Footer Contact */}
      <footer id="trust" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 md:py-32 relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-20">
          <div className="lg:col-span-7 space-y-6 sm:space-y-10 md:space-y-16">
            <div>
              <p className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6">LET'S START YOUR TRANSFORMATION</p>
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-tight">Ready to Transform Your Business?</h2>
            </div>
            <p className="text-base sm:text-lg md:text-2xl text-slate-400 font-medium max-w-2xl leading-relaxed">
              Join the leading companies in the MENA region using Seekers AI to automate, scale, and succeed.
            </p>
            <div className="space-y-4 sm:space-y-8 md:space-y-12 pt-2 sm:pt-4 md:pt-8">
              <div className="flex gap-3 sm:gap-4 md:gap-8 items-start">
                <div className="size-10 sm:size-12 md:size-20 rounded-lg sm:rounded-xl md:rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-2xl"><span className="material-symbols-outlined text-primary text-xl sm:text-2xl md:text-4xl">mail</span></div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-[12px] font-black text-slate-500 uppercase tracking-wider sm:tracking-widest mb-1 md:mb-2">Corporate Correspondence</p>
                  <p className="text-base sm:text-xl md:text-3xl font-black text-white break-all sm:break-normal">Team@seekersai.org</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 md:gap-8 items-start">
                <div className="size-10 sm:size-12 md:size-20 rounded-lg sm:rounded-xl md:rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-2xl"><span className="material-symbols-outlined text-primary text-xl sm:text-2xl md:text-4xl">phone</span></div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-[12px] font-black text-slate-500 uppercase tracking-wider sm:tracking-widest mb-1 md:mb-2">Priority Sales Channel</p>
                  <p className="text-sm sm:text-xl md:text-3xl font-black text-white">01044332566 | 01010748045</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="presentation-card p-6 sm:p-8 md:p-14 rounded-2xl sm:rounded-3xl md:rounded-[4rem] text-center flex flex-col items-center">
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-[3rem] mb-4 sm:mb-8 md:mb-12 shadow-[0_30px_100px_rgba(255,255,255,0.1)]">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://cal.com/${calLink}`} alt="QR Code - Book a Call" className="size-32 sm:size-48 md:size-64" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black mb-2 sm:mb-4 md:mb-6 tracking-tight">Schedule Consultation</h3>
              <p className="text-sm sm:text-base md:text-xl text-slate-400 font-medium mb-4 sm:mb-8 md:mb-12 leading-relaxed">Scan to book your free strategy session with our experts.</p>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 sm:py-5 md:py-8 bg-primary text-background-dark rounded-xl sm:rounded-2xl md:rounded-[2rem] font-black text-xs sm:text-sm md:text-xl uppercase tracking-wider sm:tracking-widest shadow-3xl flex items-center justify-center gap-2 sm:gap-3 md:gap-5 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl md:text-3xl font-black">event_available</span>
                Book My Session
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal with Cal.com */}
      <Modal 
        isOpen={isBookingModalOpen} 
        onClose={resetBooking} 
        title="Schedule Strategy Session"
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-2 sm:space-y-4 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Book a free 30-minute discovery call with our automation experts.
            </p>
          </div>
          
          {/* Cal.com Embed */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 border border-white/10" style={{ minHeight: '400px' }}>
            <iframe
              src={`https://cal.com/${calLink}?embed=true&theme=dark`}
              width="100%"
              height="400"
              frameBorder="0"
              style={{ background: 'transparent' }}
              title="Book a meeting"
            />
          </div>
          
          <div className="text-center pt-3 sm:pt-4 border-t border-white/10">
            <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">
              Prefer to call directly?
            </p>
            <a href={`tel:${contactPhone}`} className="text-lg sm:text-xl font-black text-primary hover:text-white transition-colors">
              {contactPhone}
            </a>
          </div>
        </div>
      </Modal>

      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={isComingSoonModalOpen} 
        onClose={() => setIsComingSoonModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
