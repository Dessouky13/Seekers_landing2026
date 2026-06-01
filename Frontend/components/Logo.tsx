import React, { useEffect, useRef, useState } from 'react';

interface LogoProps {
  className?: string;
  /** Height of the symbol mark in pixels. */
  size?: number;
  /** Show the wordmark image next to the mark. */
  showText?: boolean;
  /** Extra classes for the wordmark fallback text. */
  textClassName?: string;
  /** Subtle ambient glow behind the mark (default true). */
  glow?: boolean;
}

// Module-level cache so the wordmark is only cropped once per session.
const cropCache: Record<string, string> = {};

/**
 * Loads a transparent PNG and returns a data-URL cropped tightly to its opaque
 * bounding box — so a logo file with lots of padding still renders flush.
 * Returns null until ready (caller shows a fallback).
 */
function useCroppedImage(src: string): string | null {
  const [url, setUrl] = useState<string | null>(cropCache[src] || null);
  useEffect(() => {
    if (cropCache[src]) {
      setUrl(cropCache[src]);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      try {
        const W = img.naturalWidth;
        const H = img.naturalHeight;
        const c = document.createElement('canvas');
        c.width = W;
        c.height = H;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, W, H).data;
        let minX = W, minY = H, maxX = 0, maxY = 0, found = false;
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            if (data[(y * W + x) * 4 + 3] > 20) {
              found = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (!found) return;
        const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.03);
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(W - 1, maxX + pad);
        maxY = Math.min(H - 1, maxY + pad);
        const bw = maxX - minX + 1;
        const bh = maxY - minY + 1;
        const oc = document.createElement('canvas');
        oc.width = bw;
        oc.height = bh;
        oc.getContext('2d')!.drawImage(c, minX, minY, bw, bh, 0, 0, bw, bh);
        const out = oc.toDataURL('image/png');
        cropCache[src] = out;
        if (!cancelled) setUrl(out);
      } catch {
        /* tainted/unsupported — caller keeps fallback */
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);
  return url;
}

/**
 * Seekers logo lockup — the symbol mark (public/seekers-symbol.png) + the real
 * wordmark from public/seekers-logo.png (auto-cropped). Drop-in: replace either
 * PNG in /public and the header, footer, and particle hero all update.
 */
const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 34,
  showText = true,
  textClassName = '',
  glow = true,
}) => {
  const wordmark = useCroppedImage('/seekers-logo.png');
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className={`group flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        {glow && (
          <span className="absolute -inset-2.5 rounded-full bg-primary/25 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        <img
          src="/seekers-symbol.png"
          alt="Seekers AI logo"
          style={{ height: size, width: 'auto' }}
          className="relative drop-shadow-[0_4px_18px_rgba(161,158,255,0.45)] transition-transform duration-500 group-hover:scale-[1.06]"
          draggable={false}
        />
      </div>
      {showText &&
        (wordmark ? (
          <img
            ref={imgRef}
            src={wordmark}
            alt="Seekers"
            style={{ height: Math.round(size * 0.62), width: 'auto' }}
            className="relative drop-shadow-[0_2px_12px_rgba(161,158,255,0.3)] transition-transform duration-500 group-hover:scale-[1.03]"
            draggable={false}
          />
        ) : (
          <span
            className={`font-display font-bold uppercase tracking-[0.2em] text-white leading-none ${textClassName}`}
            style={{ fontSize: Math.round(size * 0.5) }}
          >
            Seekers
          </span>
        ))}
    </div>
  );
};

export default Logo;
