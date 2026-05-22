'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Film, FilmCategory } from '@/lib/types';
import { useMakingOf } from '@/components/providers/MakingOfProvider';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';

type FilterKey = 'all' | FilmCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'fiction', label: 'Fiction' },
  { key: 'documentaire', label: 'Documentaire' },
  { key: 'court-metrage', label: 'Court-métrage' },
  { key: 'developpement', label: 'En développement' },
];

const STATUS_LABEL: Record<string, string> = {
  sorti: 'Sorti',
  'post-production': 'Post-production',
  developpement: 'En développement',
};

const CAT_COLOR: Record<string, string> = {
  fiction: 'bg-orange-brule text-ivoire-pur',
  documentaire: 'bg-ocre text-noir-absolu',
  'court-metrage': 'bg-terracotta text-ivoire-pur',
  developpement: 'bg-carmin text-ivoire-pur',
};

export function FilmsCatalogue({ films }: { films: Film[] }) {
  const [active, setActive] = useState<FilterKey>('all');
  const { active: makingOf } = useMakingOf();

  const filtered = useMemo(() => {
    if (active === 'all') return films;
    if (active === 'developpement') return films.filter((f) => f.status === 'developpement');
    return films.filter((f) => f.category === active);
  }, [active, films]);

  return (
    <section className="bg-noir-chaud pb-32 zellige-grid relative">
      {/* Filters sticky */}
      <div className="sticky top-20 z-30 bg-noir-chaud/92 backdrop-blur-md border-b border-safran/15">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center gap-2 md:gap-3">
          <span className="counter-mono text-[10px] text-ivoire-low mr-2">FILTER ·</span>
          {FILTERS.map((f, i) => (
            <div key={f.key} className="flex items-center">
              <button
                type="button"
                onClick={() => setActive(f.key)}
                className={
                  active === f.key
                    ? 'cta-primary !py-2 !px-4 !text-[11px]'
                    : 'cta-secondary !py-2 !px-4 !text-[11px]'
                }
                aria-pressed={active === f.key}
              >
                {f.label}
              </button>
              {i < FILTERS.length - 1 && <span className="diamond opacity-40" aria-hidden style={{ margin: '0 4px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10 relative">
        <span className="counter-mono text-[10px] text-ivoire-low absolute -top-2 right-6">
          {String(filtered.length).padStart(2, '0')} / {String(films.length).padStart(2, '0')}
        </span>

        <div className="space-y-6 md:space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((film) => (
              <motion.div
                key={film.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <FilmCard film={film} makingOfMode={makingOf} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FilmCard({ film, makingOfMode }: { film: Film; makingOfMode: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/films/${film.slug}`}
      data-cursor="image"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block relative"
    >
      {/* Fragment marker hover */}
      <div
        aria-hidden
        className={`absolute -top-4 -right-4 z-20 transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ZelligeFragment size={56} color="terracotta" opacity={0.55} rotation={hovered ? 25 : 0} shape="diamond" x="0" y="0" />
      </div>

      <div
        className="relative overflow-hidden border border-safran/20 bg-noir-relief/90 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
      >
        <div className="relative h-56 md:h-[230px] lg:h-[260px] overflow-hidden">
          <Image
            src={film.poster}
            alt={`Affiche ${film.title}`}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 100vw"
            className={`object-cover transition-all duration-500 ${
              hovered || makingOfMode ? 'opacity-0 scale-105' : 'opacity-100'
            }`}
            style={{ filter: 'brightness(0.72)' }}
          />
          <Image
            src={film.poster}
            alt={`Affiche ${film.title}`}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 100vw"
            className={`object-cover transition-all duration-500 ${
              hovered || makingOfMode ? 'opacity-100 scale-105' : 'opacity-0'
            }`}
            style={{ filter: 'brightness(0.92)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-chaud/80 via-transparent to-transparent md:bg-gradient-to-r md:from-noir-chaud/35 md:via-transparent" />
        </div>

        <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-between gap-5">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span
              className={`meta px-3 py-1 ${CAT_COLOR[film.category]}`}
              style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
            >
              {film.category}
            </span>
            <span
              className="meta text-ivoire-pur bg-noir-absolu/85 px-3 py-1 counter-mono"
              style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
            >
              {STATUS_LABEL[film.status]}
            </span>
            <span className="meta text-ivoire-low">{film.duration} min</span>
          </div>

          <div>
            <p className="meta text-safran flex items-center gap-2">
              <span className="counter-mono">{film.year}</span>
              <span className="diamond" aria-hidden style={{ margin: 0 }} />
              {film.director}
            </p>
            <h3 className="h-display text-ivoire-pur text-3xl md:text-4xl mt-3 group-hover:text-safran transition-colors">
              {film.title}
            </h3>
            <p className="text-sm md:text-base text-ivoire-warm mt-3 leading-relaxed max-w-3xl">
              {film.synopsisShort}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm text-ivoire-low">
            <span className="counter-mono">Voir la fiche projet</span>
            <span className="text-safran group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
