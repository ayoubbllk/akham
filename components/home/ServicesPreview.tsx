'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { services } from '@/data/services';

/**
 * "Les Métiers du Plateau" — grille 4×2.
 * Chaque item : grand numéro fantôme, icône safran, titre, ligne décor au hover.
 */
export function ServicesPreview() {
  const items = services.slice(0, 8);
  while (items.length < 8) items.push(items[items.length - 1]);

  return (
    <section
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: '#160E08' }}
    >
      {/* En-tête */}
      <div className="max-w-[1500px] mx-auto px-8 md:px-14 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span
              style={{
                fontFamily: 'var(--font-dmsans)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#E8A020',
              }}
            >
              <span style={{ color: '#A63D2F' }}>—</span> Les métiers du plateau
            </span>
            <h2
              className="font-display mt-4"
              style={{
                fontSize: 'clamp(48px, 5vw, 92px)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
              }}
            >
              <span className="block text-ivoire-pur">Une maison,</span>
              <span className="block text-safran">huit savoir-faire.</span>
            </h2>
          </div>
          <Link href="/services" data-cursor="cta" className="cta-secondary self-start md:self-auto">
            Tous les services <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Grille 4×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
             style={{ background: '#1E1208' }}>
          {items.map((s, i) => {
            const Icon =
              (Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Sparkles;
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.div
                key={`${s.id}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
                className="group relative overflow-hidden p-8 md:p-10 transition-colors duration-300"
                style={{ background: '#160E08', minHeight: 240 }}
              >
                {/* Border-left au hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-safran opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Numéro fantôme */}
                <span
                  aria-hidden
                  className="font-display absolute -top-4 -right-2 select-none pointer-events-none"
                  style={{
                    fontSize: 110,
                    color: '#E8A020',
                    opacity: 0.07,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {num}
                </span>

                <div className="relative">
                  <Icon size={22} className="text-safran" strokeWidth={1.4} />
                  <h3
                    className="mt-6"
                    style={{
                      fontFamily: 'var(--font-dmsans)',
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      color: '#F5EDD8',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-dmsans)',
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: '#C8B898',
                    }}
                  >
                    {s.description}
                  </p>
                  <span
                    aria-hidden
                    className="block mt-6 transition-all duration-500"
                    style={{
                      width: 0,
                      height: 2,
                      background: '#A63D2F',
                    }}
                  />
                </div>

                <style jsx>{`
                  .group:hover h3 {
                    color: #e8a020;
                  }
                  .group:hover span[aria-hidden]:last-child {
                    width: 24px;
                  }
                  .group:hover {
                    background: #1e1208;
                  }
                `}</style>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
