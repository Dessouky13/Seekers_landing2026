import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { NAV_LINKS, SITE } from '../src/siteConfig';

/**
 * Shared marketing navbar: floating glass bar with the logo lockup, route-aware
 * links (desktop) and an accessible slide-down mobile menu (hamburger). Hides on
 * scroll-down / reveals on scroll-up, and solidifies once scrolled.
 */
const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 60) setVisible(true);
      else if (y > lastY && y > 120) setVisible(false);
      else if (y < lastY) setVisible(true);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  // close mobile menu on route change + lock body scroll while open
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkBase =
    'nav-underline font-display text-[12px] font-medium uppercase tracking-[0.25em] transition-colors';

  return (
    <>
      <div
        className={`fixed top-2 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl z-50 px-1 sm:px-2 transition-transform duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-[200%]'
        }`}
      >
        <nav
          className={`h-16 sm:h-20 md:h-24 flex items-center justify-between px-3 sm:px-6 md:px-10 backdrop-blur-2xl border rounded-2xl md:rounded-[2rem] transition-all duration-500 ${
            scrolled
              ? 'bg-background-dark/75 border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]'
              : 'bg-white/5 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]'
          }`}
        >
          <Link to="/" aria-label="Seekers AI home" className="shrink-0">
            <Logo size={32} showText textClassName="text-base sm:text-lg" />
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-11">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-primary' : 'text-slate-300 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="group hidden sm:inline-flex px-5 md:px-8 py-2.5 md:py-3.5 bg-primary text-background-dark rounded-xl md:rounded-2xl text-[10px] md:text-xs font-display font-bold shadow-[0_18px_40px_rgba(161,158,255,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.15em] items-center gap-2 whitespace-nowrap"
            >
              Get Started
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>

            {/* hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="md:hidden flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-surface-dark/95 border-l border-white/10 shadow-2xl px-6 pt-24 pb-10 flex flex-col transition-transform duration-400 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                style={{ transitionDelay: open ? `${i * 50 + 80}ms` : '0ms' }}
                className={({ isActive }) =>
                  `py-3.5 border-b border-white/5 font-display text-lg font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-background-dark shadow-[0_18px_40px_rgba(161,158,255,0.3)] active:scale-95 transition-transform"
          >
            Get Started
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>

          <div className="mt-auto pt-8 space-y-2">
            <a href={`mailto:${SITE.email}`} className="block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-primary">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phones[0]}`} className="block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-primary">
              {SITE.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
