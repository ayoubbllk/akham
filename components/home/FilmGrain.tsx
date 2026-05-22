'use client';

import { useEffect, useRef } from 'react';

/**
 * Grain argentique vivant : noise régénéré ~10fps via canvas.
 * Désactivé en prefers-reduced-motion (rend statique en SVG via CSS sibling).
 */
export function FilmGrain({ opacity = 0.07 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const W = 220;
    const H = 220;
    canvas.width = W;
    canvas.height = H;

    let raf = 0;
    let last = 0;
    const STEP = 100; // ms

    function paint() {
      if (!ctx) return;
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    function tick(t: number) {
      if (t - last >= STEP) {
        paint();
        last = t;
      }
      raf = requestAnimationFrame(tick);
    }

    paint();
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}
