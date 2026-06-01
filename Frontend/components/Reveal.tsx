import React, { useEffect, useRef, useState } from 'react';

/** True when the user prefers reduced motion (read once on mount). */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms before the element animates in. */
  delay?: number;
  /** Extra classes on the wrapper. */
  className?: string;
  /** Render as a different element (default div). */
  as?: React.ElementType;
  /** Re-trigger every time it enters (default: once). */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper. Adds `.is-visible` (see index.html `.reveal`) when the
 * element scrolls into view. Honours prefers-reduced-motion by showing instantly.
 * UX guideline: stagger list/grid entrance 30–50ms per item; animate transform/opacity only.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Failsafe: if the element is already in (or above) the viewport at mount,
    // reveal immediately so content is never left stuck invisible.
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 0) * 0.95) {
      setVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
};

/**
 * Parallax hook — returns a live scroll offset (px) you can map into transforms.
 * `speed` < 0 moves opposite to scroll (classic depth). Uses rAF + passive scroll,
 * and is disabled entirely under prefers-reduced-motion (returns 0).
 */
export const useParallax = (speed = 0.2): number => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      setOffset(window.scrollY * speed);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return offset;
};

/**
 * Element-relative parallax — returns a -1..1 progress as the element travels
 * through the viewport, plus a ref to attach. Good for in-section depth layers.
 */
export const useElementParallax = <T extends HTMLElement>(): [
  React.RefObject<T>,
  number
] => {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when element center is at viewport center; -1 above, +1 below.
      const center = rect.top + rect.height / 2;
      setProgress(Math.max(-1, Math.min(1, (center - vh / 2) / (vh / 2 + rect.height / 2))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, progress];
};

export default Reveal;
