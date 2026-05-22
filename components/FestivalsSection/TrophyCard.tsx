'use client';

import { motion } from 'framer-motion';
import type { FestivalEntry } from '@/data/festivals';

interface TrophyCardProps {
  entry: FestivalEntry;
  index: number;
  reduceMotion: boolean;
}

/**
 * Couronne de laurier dorée — emblème des palmes / lauréats.
 * Composée de deux branches symétriques + ruban fin en bas.
 */
function Laurel() {
  return (
    <svg
      viewBox="0 0 220 200"
      width="100%"
      height="100%"
      aria-hidden
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="leaf-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7D478" />
          <stop offset="55%" stopColor="#E8A020" />
          <stop offset="100%" stopColor="#8a5b10" />
        </linearGradient>
      </defs>

      {/* Branche gauche */}
      <g fill="url(#leaf-gold)" opacity="0.95">
        <path d="M50 180 Q42 150 48 120 Q56 80 78 50 Q90 38 100 34 L100 38 Q86 50 78 64 Q66 88 60 118 Q54 150 60 180 Z" />
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 8;
          const cx = 56 - t * 6;
          const cy = 168 - t * 130;
          const rotate = -50 - t * 20;
          return (
            <ellipse
              key={`l-${i}`}
              cx={cx}
              cy={cy}
              rx="9"
              ry="20"
              transform={`rotate(${rotate} ${cx} ${cy})`}
              opacity={0.85 + (i % 2) * 0.1}
            />
          );
        })}
      </g>

      {/* Branche droite */}
      <g fill="url(#leaf-gold)" opacity="0.95">
        <path d="M170 180 Q178 150 172 120 Q164 80 142 50 Q130 38 120 34 L120 38 Q134 50 142 64 Q154 88 160 118 Q166 150 160 180 Z" />
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 8;
          const cx = 164 + t * 6;
          const cy = 168 - t * 130;
          const rotate = 50 + t * 20;
          return (
            <ellipse
              key={`r-${i}`}
              cx={cx}
              cy={cy}
              rx="9"
              ry="20"
              transform={`rotate(${rotate} ${cx} ${cy})`}
              opacity={0.85 + (i % 2) * 0.1}
            />
          );
        })}
      </g>

      {/* Ruban */}
      <path
        d="M70 178 Q110 192 150 178 L150 184 Q110 196 70 184 Z"
        fill="url(#leaf-gold)"
        opacity="0.9"
      />
    </svg>
  );
}

export function TrophyCard({ entry, index, reduceMotion }: TrophyCardProps) {
  return (
    <motion.article
      layout
      className="trophy"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        reduceMotion ? undefined : { delay: Math.min(index * 0.08, 0.4), duration: 0.6, ease: 'easeOut' }
      }
      exit={reduceMotion ? undefined : { opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <div className="trophy-frame">
        {/* Coins ornés */}
        <span aria-hidden className="corner corner-tl" />
        <span aria-hidden className="corner corner-tr" />
        <span aria-hidden className="corner corner-bl" />
        <span aria-hidden className="corner corner-br" />

        <div className="trophy-inner">
          <span className="trophy-year">— {entry.annee} —</span>

          <div className="trophy-laurel">
            <Laurel />
            <div className="trophy-laurel-text">
              <span className="trophy-pill">Grand Prix</span>
            </div>
          </div>

          <div className="trophy-body">
            <h3 className="trophy-festival">{entry.festivalCourt}</h3>
            <p className="trophy-festival-full">{entry.festival}</p>

            <div className="trophy-divider" aria-hidden />

            <p className="trophy-distinction">{entry.distinction}</p>
            <p className="trophy-film">&laquo;&nbsp;{entry.film}&nbsp;&raquo;</p>
          </div>

          <p className="trophy-place">
            {entry.ville} <span aria-hidden>·</span> {entry.pays}
          </p>
        </div>
      </div>

      <style jsx>{`
        .trophy {
          position: relative;
          height: 100%;
        }

        .trophy-frame {
          position: relative;
          height: 100%;
          padding: 14px;
          background:
            radial-gradient(120% 80% at 50% 0%, rgba(232, 160, 32, 0.12) 0%, transparent 55%),
            linear-gradient(180deg, #16100a 0%, #0e0805 100%);
          border: 1px solid rgba(232, 160, 32, 0.22);
          box-shadow:
            inset 0 0 0 1px rgba(232, 160, 32, 0.04),
            0 30px 60px -30px rgba(0, 0, 0, 0.8);
          transition: transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease;
        }

        .trophy:hover .trophy-frame {
          transform: translateY(-4px);
          border-color: rgba(232, 160, 32, 0.5);
          box-shadow:
            inset 0 0 0 1px rgba(232, 160, 32, 0.08),
            0 40px 70px -25px rgba(0, 0, 0, 0.85),
            0 0 60px -10px rgba(232, 160, 32, 0.18);
        }

        .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(232, 160, 32, 0.7);
          border-style: solid;
          border-width: 0;
        }
        .corner-tl { top: 6px; left: 6px; border-top-width: 1px; border-left-width: 1px; }
        .corner-tr { top: 6px; right: 6px; border-top-width: 1px; border-right-width: 1px; }
        .corner-bl { bottom: 6px; left: 6px; border-bottom-width: 1px; border-left-width: 1px; }
        .corner-br { bottom: 6px; right: 6px; border-bottom-width: 1px; border-right-width: 1px; }

        .trophy-inner {
          position: relative;
          height: 100%;
          padding: 28px 22px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid rgba(232, 160, 32, 0.08);
        }

        .trophy-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>");
          opacity: 0.06;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .trophy-year {
          position: relative;
          z-index: 2;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: rgba(232, 160, 32, 0.7);
        }

        .trophy-laurel {
          position: relative;
          z-index: 2;
          width: 180px;
          height: 160px;
          margin: 18px 0 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trophy-laurel-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trophy-pill {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          letter-spacing: 0.18em;
          color: #f5edd8;
          text-transform: uppercase;
          padding: 4px 0;
          border-top: 1px solid rgba(232, 160, 32, 0.45);
          border-bottom: 1px solid rgba(232, 160, 32, 0.45);
          line-height: 1;
        }

        .trophy-body {
          position: relative;
          z-index: 2;
          margin-top: 14px;
          width: 100%;
        }

        .trophy-festival {
          font-family: var(--font-bebas), sans-serif;
          font-size: 44px;
          line-height: 0.95;
          letter-spacing: 0.06em;
          color: #e8a020;
          text-transform: uppercase;
        }

        .trophy-festival-full {
          margin-top: 6px;
          font-family: var(--font-dmsans), sans-serif;
          font-size: 11px;
          font-weight: 300;
          line-height: 1.4;
          color: #c8b898;
          letter-spacing: 0.04em;
        }

        .trophy-divider {
          width: 32px;
          height: 1px;
          margin: 16px auto;
          background: linear-gradient(90deg, transparent, rgba(232, 160, 32, 0.55), transparent);
        }

        .trophy-distinction {
          font-family: var(--font-dmsans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
          color: #f5edd8;
          letter-spacing: 0.01em;
        }

        .trophy-film {
          margin-top: 6px;
          font-family: var(--font-dmsans), sans-serif;
          font-size: 12px;
          font-style: italic;
          color: #a63d2f;
        }

        .trophy-place {
          position: relative;
          z-index: 2;
          margin-top: auto;
          padding-top: 18px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #7a6a52;
        }
      `}</style>
    </motion.article>
  );
}
