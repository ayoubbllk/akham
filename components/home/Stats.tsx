'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FilmGrain } from './FilmGrain';

const STATS = [
  { value: 5, suffix: '', label: 'Années de création' },
  { value: 20, suffix: '+', label: 'Œuvres réalisées' },
  { value: 8, suffix: '', label: 'Territoires de coproduction' },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => setV(Math.round(val)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/**
 * "L'Ardoise du Producteur" — chiffres massifs sur fond noir granulé.
 */
export function Stats() {
  return (
    <section
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: '#060606' }}
    >
      <FilmGrain opacity={0.13} />

      <div className="max-w-[1500px] mx-auto px-8 md:px-14 relative z-10">
        <div className="mb-14 flex items-center gap-3">
          <span className="block w-10 h-px bg-terracotta" />
          <span
            style={{
              fontFamily: 'var(--font-dmsans)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#E8A020',
            }}
          >
            L&apos;ardoise · Bilan
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 relative">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative px-2 lg:px-10 py-12 lg:py-6"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(166,61,47,0.25)' : 'none',
              }}
            >
              <div
                className="font-display text-safran"
                style={{
                  fontSize: 'clamp(80px, 12vw, 192px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 40px rgba(232,160,32,0.18)',
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p
                className="mt-6"
                style={{
                  fontFamily: 'var(--font-dmsans)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A6A52',
                }}
              >
                {s.label}
              </p>
              <span
                className="block mt-3 counter-mono"
                style={{ fontSize: 10, color: '#7A6A52', letterSpacing: '0.15em' }}
              >
                / {String(i + 1).padStart(2, '0')} — 2019 — 2026
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
