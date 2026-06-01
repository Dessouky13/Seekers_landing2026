import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './Reveal';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Lift the card toward the cursor (px translateZ-like). */
  lift?: boolean;
}

/**
 * Mouse-driven 3D tilt — a subtle pointer-parallax for cards. Disabled under
 * prefers-reduced-motion and on coarse (touch) pointers.
 */
const Tilt: React.FC<TiltProps> = ({ children, className = '', max = 7, lift = true }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || window.matchMedia?.('(pointer: coarse)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) ${lift ? 'translateY(-4px)' : ''}`;
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Tilt;
