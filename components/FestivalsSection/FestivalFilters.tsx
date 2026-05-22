'use client';

import type { FestivalType } from '@/data/festivals';

export type FestivalFilter = 'TOUS' | 'PRIX' | 'SELECTIONS' | 'MENTIONS';

const FILTERS: FestivalFilter[] = ['TOUS', 'PRIX', 'SELECTIONS', 'MENTIONS'];

interface FestivalFiltersProps {
  activeFilter: FestivalFilter;
  onChange: (value: FestivalFilter) => void;
}

export function FestivalFilters({ activeFilter, onChange }: FestivalFiltersProps) {
  return (
    <div className="filters" role="tablist" aria-label="Filtres des distinctions">
      {FILTERS.map((filter) => {
        const active = activeFilter === filter;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(filter)}
            className={`filter-pill${active ? ' is-active' : ''}`}
          >
            <span className="filter-dot" aria-hidden />
            <span className="filter-label">{filter}</span>
          </button>
        );
      })}

      <style jsx>{`
        .filters {
          margin-top: 36px;
          display: inline-flex;
          flex-wrap: wrap;
          gap: 4px;
          padding: 6px;
          border: 1px solid rgba(232, 160, 32, 0.18);
          background: rgba(232, 160, 32, 0.025);
          border-radius: 999px;
        }

        .filter-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border: none;
          background: transparent;
          color: #7a6a52;
          font-family: var(--font-dmsans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 999px;
          transition: color 220ms ease, background 220ms ease;
        }

        .filter-pill:hover {
          color: #f5edd8;
        }

        .filter-pill.is-active {
          background: #e8a020;
          color: #0f0a06;
          box-shadow: 0 8px 22px -10px rgba(232, 160, 32, 0.55);
        }

        .filter-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
          transition: opacity 220ms ease;
        }

        .filter-pill.is-active .filter-dot {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export function mapFilterToType(filter: FestivalFilter): FestivalType | 'all' {
  if (filter === 'PRIX') return 'prix';
  if (filter === 'SELECTIONS') return 'selection';
  if (filter === 'MENTIONS') return 'mention';
  return 'all';
}
