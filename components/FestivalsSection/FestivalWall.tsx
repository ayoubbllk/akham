'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { festivals, type FestivalEntry } from '@/data/festivals';
import { FestivalFilters, mapFilterToType, type FestivalFilter } from './FestivalFilters';
import { TrophyCard } from './TrophyCard';
import { PalmaresRow } from './PalmaresRow';

const MAX_FEATURED = 3;

export function FestivalWall() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FestivalFilter>('TOUS');
  const targetType = mapFilterToType(activeFilter);

  const filtered = useMemo<FestivalEntry[]>(
    () => festivals.filter((entry) => (targetType === 'all' ? true : entry.type === targetType)),
    [targetType],
  );

  const featured = useMemo<FestivalEntry[]>(() => {
    if (activeFilter === 'MENTIONS' || activeFilter === 'SELECTIONS') return [];
    return festivals.filter((e) => e.type === 'prix').slice(0, MAX_FEATURED);
  }, [activeFilter]);

  const palmares = useMemo<FestivalEntry[]>(() => {
    const featuredIds = new Set(featured.map((f) => f.id));
    return filtered.filter((e) => !featuredIds.has(e.id));
  }, [filtered, featured]);

  const statRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(statRef, { once: true, margin: '-80px' });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplayCount(filtered.length);
      return;
    }
    const to = filtered.length;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [filtered.length, isInView, reduceMotion]);

  const paysUniques = useMemo(() => new Set(filtered.map((e) => e.pays)).size, [filtered]);
  const anneeDebut = useMemo(
    () => (filtered.length ? Math.min(...filtered.map((e) => e.annee)) : new Date().getFullYear()),
    [filtered],
  );

  const label =
    activeFilter === 'TOUS'
      ? 'distinctions'
      : activeFilter === 'PRIX'
        ? 'prix remportés'
        : activeFilter === 'SELECTIONS'
          ? 'sélections officielles'
          : 'mentions du jury';

  return (
    <>
      <FestivalFilters activeFilter={activeFilter} onChange={setActiveFilter} />

      {featured.length > 0 && (
        <div className="laureats">
          <div className="section-header">
            <span className="rule" aria-hidden />
            <span className="eyebrow">Lauréats — Grands Prix</span>
            <span className="rule" aria-hidden />
          </div>

          <div className="laureats-grid">
            {featured.map((entry, index) => (
              <TrophyCard
                key={entry.id}
                entry={entry}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      )}

      {palmares.length > 0 && (
        <div className="palmares">
          <div className="section-header">
            <span className="rule short" aria-hidden />
            <span className="eyebrow">
              {activeFilter === 'TOUS' ? 'Palmarès complet' : `Palmarès — ${label}`}
            </span>
            <span className="count">{String(palmares.length).padStart(2, '0')}</span>
          </div>

          <motion.ul layout className="palmares-list">
            <AnimatePresence mode="popLayout">
              {palmares.map((entry, index) => (
                <PalmaresRow
                  key={entry.id}
                  entry={entry}
                  index={index}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      )}

      <div ref={statRef} className="stat">
        <span className="stat-rule" aria-hidden />
        <span className="stat-count">{displayCount}</span>
        <span className="stat-label">{label}</span>
        <p className="stat-meta">
          dans {paysUniques} pays · depuis {anneeDebut}
        </p>
      </div>

      <style jsx>{`
        .laureats {
          margin-top: 56px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(232, 160, 32, 0.35) 50%,
            transparent 100%
          );
        }
        .rule.short {
          flex: 0 0 64px;
        }

        .eyebrow {
          font-family: var(--font-dmsans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #e8a020;
          white-space: nowrap;
        }

        .count {
          margin-left: auto;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #7a6a52;
        }

        .laureats-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }

        @media (min-width: 700px) {
          .laureats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .laureats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .palmares {
          margin-top: 80px;
        }

        .palmares-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(232, 160, 32, 0.18);
        }

        .stat {
          margin-top: 90px;
          text-align: center;
        }

        .stat-rule {
          display: block;
          width: 1px;
          height: 56px;
          margin: 0 auto 28px;
          background: linear-gradient(180deg, transparent, rgba(232, 160, 32, 0.6), transparent);
        }

        .stat-count {
          display: block;
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(96px, 12vw, 168px);
          line-height: 0.86;
          color: #e8a020;
          letter-spacing: 0.01em;
        }

        .stat-label {
          display: block;
          margin-top: 4px;
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(20px, 2.4vw, 32px);
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f5edd8;
        }

        .stat-meta {
          margin-top: 14px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7a6a52;
        }
      `}</style>
    </>
  );
}
