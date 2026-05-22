'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredFilms } from '@/data/films';
import { FilmImage } from '@/components/FilmImage';
import { ZelligeFragment } from './ZelligeFragment';
import type { Film } from '@/lib/types';

const CAT_COLOR: Record<string, string> = {
  fiction: 'bg-orange-brule',
  documentaire: 'bg-documentaire',
  'court-metrage': 'bg-terracotta',
  developpement: 'bg-ocre',
};

const CAT_LABEL: Record<string, string> = {
  fiction: 'Fiction',
  documentaire: 'Documentaire',
  'court-metrage': 'Court-métrage',
  developpement: 'Développement',
};

export function FeaturedFilms() {
  const films: Film[] = featuredFilms().slice(0, 3);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden" style={{ background: '#0F0A06' }}>
      <ZelligeFragment x="-3%" y="10%" size={100} color="safran" opacity={0.25} rotation={-10} animated />
      <ZelligeFragment x="94%" y="46%" size={140} color="terracotta" opacity={0.2} rotation={15} shape="hexagon" animated />

      <div className="max-w-[1500px] mx-auto px-8 md:px-14 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span
              className="text-safran"
              style={{
                fontFamily: 'var(--font-dmsans)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#A63D2F' }}>—</span> Nos œuvres
            </span>
            <h2
              className="font-display mt-4"
              style={{
                fontSize: 'clamp(48px, 5vw, 96px)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
              }}
            >
              <span className="block text-ivoire-pur">Films &amp;</span>
              <span className="block text-safran">Projets</span>
            </h2>
          </div>
          <Link href="/films" data-cursor="cta" className="cta-secondary self-start md:self-auto">
            Catalogue complet <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="space-y-7 md:space-y-9">
          {films.map((film, i) => {
            const reverse = i % 2 !== 0;
            return (
              <motion.article
                key={`${film.slug}-${i}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/films/${film.slug}`}
                  data-cursor="image"
                  className="group block relative border border-safran/20 bg-noir-relief/70 backdrop-blur-sm"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                    <div className="relative lg:col-span-7 min-h-[260px] md:min-h-[320px] lg:min-h-[360px] overflow-hidden">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: 'brightness(0.62) saturate(1.05)' }}
                      >
                        <FilmImage src={film.still} alt={`Image du film ${film.title}`} fill sizes="(min-width: 1024px) 58vw, 100vw" />
                      </div>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,10,6,0.2) 0%, rgba(15,10,6,0.88) 100%)' }} />
                      <span className="absolute left-4 top-4 counter-mono text-[10px] text-ivoire-low">{String(i + 1).padStart(2, '0')}</span>

                      <div className="absolute left-5 md:left-7 bottom-5 md:bottom-7 flex items-end gap-4 md:gap-5">
                        <div className="relative w-20 h-28 md:w-24 md:h-36 shrink-0 border border-safran/25 overflow-hidden">
                          <FilmImage src={film.poster} alt={`Affiche ${film.title}`} fill sizes="120px" />
                        </div>
                        <div>
                          <span
                            className={`inline-flex ${CAT_COLOR[film.category] || 'bg-safran'} text-ivoire-pur px-3 py-1`}
                            style={{
                              fontFamily: 'var(--font-dmsans)',
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: '0.13em',
                              textTransform: 'uppercase',
                              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                            }}
                          >
                            {CAT_LABEL[film.category] || film.category}
                          </span>
                          <h3 className="font-display text-ivoire-pur mt-2 text-[clamp(28px,3.3vw,54px)] leading-[0.95] group-hover:text-safran transition-colors duration-500">
                            {film.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <p
                          className="text-ivoire-low"
                          style={{
                            fontFamily: 'var(--font-dmsans)',
                            fontSize: 11,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {film.year} <span style={{ color: '#7A6A52' }}>·</span> {film.director}
                        </p>
                        <p className="text-ivoire-warm mt-5 text-sm md:text-base leading-relaxed max-w-xl">
                          {film.synopsisShort}
                        </p>
                      </div>

                      <div className="mt-7 pt-5 border-t border-safran/15 flex items-center justify-between text-ivoire-low">
                        <span className="counter-mono text-[11px]">{film.duration} MIN</span>
                        <span className="inline-flex items-center gap-2 text-safran text-sm group-hover:translate-x-1 transition-transform duration-500">
                          Voir le projet <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>

                    <div
                      className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
                    >
                      <ZelligeFragment size={90} color="safran" opacity={0.25} rotation={18} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
