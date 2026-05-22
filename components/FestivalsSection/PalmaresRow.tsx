'use client';

import { motion } from 'framer-motion';
import type { FestivalEntry } from '@/data/festivals';

interface PalmaresRowProps {
  entry: FestivalEntry;
  index: number;
  reduceMotion: boolean;
}

function TypeGlyph({ type }: { type: FestivalEntry['type'] }) {
  if (type === 'prix') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 1.5 L9.9 5.4 L14.2 6 L11.1 9 L11.9 13.3 L8 11.3 L4.1 13.3 L4.9 9 L1.8 6 L6.1 5.4 Z"
          fill="#E8A020"
        />
      </svg>
    );
  }
  if (type === 'mention') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path d="M7 1.5 L12.5 7 L7 12.5 L1.5 7 Z" fill="none" stroke="#A63D2F" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <circle cx="6" cy="6" r="4" fill="none" stroke="rgba(200,184,152,0.6)" strokeWidth="1" />
    </svg>
  );
}

const TYPE_LABEL: Record<FestivalEntry['type'], string> = {
  prix: 'Prix',
  mention: 'Mention',
  selection: 'Sélection',
};

export function PalmaresRow({ entry, index, reduceMotion }: PalmaresRowProps) {
  return (
    <motion.li
      layout
      className="row"
      data-type={entry.type}
      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={
        reduceMotion ? undefined : { delay: Math.min(index * 0.02, 0.3), duration: 0.35, ease: 'easeOut' }
      }
      exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.18 } }}
    >
      <span className="row-year">{entry.annee}</span>

      <span className="row-glyph" aria-hidden>
        <TypeGlyph type={entry.type} />
      </span>

      <div className="row-fest">
        <span className="row-fest-short">{entry.festivalCourt}</span>
        <span className="row-fest-full">{entry.festival}</span>
      </div>

      <div className="row-dist">
        <span className="row-dist-type">{TYPE_LABEL[entry.type]}</span>
        <span className="row-dist-text">{entry.distinction}</span>
      </div>

      <span className="row-film">&laquo;&nbsp;{entry.film}&nbsp;&raquo;</span>

      <span className="row-place">
        {entry.ville} · {entry.pays}
      </span>

      <style jsx>{`
        .row {
          display: grid;
          grid-template-columns: 64px 22px 1fr 1fr;
          column-gap: 18px;
          row-gap: 6px;
          align-items: baseline;
          padding: 18px 4px 18px 4px;
          border-bottom: 1px solid rgba(232, 160, 32, 0.07);
          position: relative;
          transition: background-color 220ms ease, padding 220ms ease;
        }

        .row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: transparent;
          transition: background 220ms ease;
        }

        .row[data-type='prix']::before {
          background: rgba(232, 160, 32, 0.4);
        }
        .row[data-type='mention']::before {
          background: rgba(166, 61, 47, 0.4);
        }

        .row:hover {
          background: rgba(232, 160, 32, 0.03);
          padding-left: 14px;
        }
        .row:hover::before {
          background: #e8a020;
        }

        .row-year {
          font-family: var(--font-mono), monospace;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(232, 160, 32, 0.85);
          font-weight: 500;
        }

        .row-glyph {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .row-fest {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .row-fest-short {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 0.05em;
          color: #f5edd8;
        }

        .row[data-type='prix'] .row-fest-short {
          color: #e8a020;
        }

        .row-fest-full {
          font-family: var(--font-dmsans), sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: #7a6a52;
          letter-spacing: 0.02em;
        }

        .row-dist {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .row-dist-type {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7a6a52;
        }

        .row-dist-text {
          font-family: var(--font-dmsans), sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
          color: #c8b898;
        }

        .row[data-type='prix'] .row-dist-text {
          color: #f5edd8;
          font-weight: 500;
        }

        .row-film {
          display: none;
        }

        .row-place {
          display: none;
        }

        @media (min-width: 768px) {
          .row {
            grid-template-columns: 72px 22px 1.1fr 1.6fr 1fr 1fr;
            row-gap: 0;
          }
          .row-film {
            display: inline;
            font-family: var(--font-dmsans), sans-serif;
            font-size: 12px;
            font-style: italic;
            color: #a63d2f;
          }
          .row-place {
            display: inline;
            text-align: right;
            font-family: var(--font-mono), monospace;
            font-size: 9px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #7a6a52;
          }
        }
      `}</style>
    </motion.li>
  );
}
