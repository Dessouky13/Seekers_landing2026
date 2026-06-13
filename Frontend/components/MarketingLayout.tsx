import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useParallax } from './Reveal';

/** Scrolls to top on route change, or to the #hash target when present. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
};

/**
 * Shared shell for all marketing pages: fixed navbar, ambient parallax glow
 * background, page content (Outlet or children), and footer.
 */
const MarketingLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const orbA = useParallax(0.16);
  const orbB = useParallax(-0.1);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-dark text-slate-100">
      <ScrollManager />

      {/* ambient parallax background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[6%] left-[3%] w-[42vw] h-[42vw] bg-primary/10 blur-[110px] md:blur-[150px] rounded-full"
          style={{ transform: `translateY(${orbA}px)` }}
        />
        <div
          className="absolute bottom-[8%] right-[2%] w-[36vw] h-[36vw] bg-accent/10 blur-[110px] md:blur-[150px] rounded-full"
          style={{ transform: `translateY(${orbB}px)` }}
        />
      </div>

      <Navbar />
      <main className="relative z-10">{children ?? <Outlet />}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MarketingLayout;
