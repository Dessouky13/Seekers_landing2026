import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './Reveal';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * Counts up from 0 to `end` once the element scrolls into view (ease-out cubic).
 * Renders the final value immediately under prefers-reduced-motion.
 */
const CountUp: React.FC<CountUpProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 1700,
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVal(end);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVal(end);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            let raf = 0;
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(end * eased);
              if (p < 1) raf = requestAnimationFrame(tick);
              else setVal(end);
            };
            raf = requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
