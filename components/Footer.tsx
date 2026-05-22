'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Video } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { useMakingOf } from '@/components/providers/MakingOfProvider';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

const COLS = [
  {
    title: 'Studio',
    links: [
      { href: '/films', label: 'Films' },
      { href: '/services', label: 'Services' },
      { href: '/studio', label: 'Le studio' },
      { href: '/equipe', label: 'Équipe' },
    ],
  },
  {
    title: 'Travailler ensemble',
    links: [
      { href: '/pitch', label: 'Pitcher un projet' },
      { href: '/services#estimateur', label: 'Estimer un budget' },
      { href: '/contact', label: 'Réserver le studio' },
      { href: '/contact', label: 'Presse' },
    ],
  },
  {
    title: 'Lire & écouter',
    links: [
      { href: '/blog', label: 'Journal de production' },
      { href: '/blog?cat=fonds', label: 'Aides & fonds' },
      { href: '/blog?cat=interview', label: 'Entretiens' },
      { href: '/blog?cat=coulisses', label: 'Coulisses' },
    ],
  },
  {
    title: 'Akham Films',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/confidentialite', label: 'Confidentialité' },
    ],
  },
];

const SOCIAL = [
  { href: 'instagram', Icon: Instagram, label: 'Instagram' },
  { href: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'youtube', Icon: Youtube, label: 'YouTube' },
  { href: 'vimeo', Icon: Video, label: 'Vimeo' },
] as const;

export function Footer() {
  const { active, toggle } = useMakingOf();

  return (
    <footer className="relative bg-noir-chaud border-t border-terracotta/25 mt-32 overflow-hidden grain-intense">
      <CalligraphyTexture
        words={[
          { text: 'ضوء', x: '-2%', y: '8%', size: 200, rotate: -6, opacity: 0.04 },
          { text: 'الجزائر', x: '60%', y: '70%', size: 240, rotate: 4, opacity: 0.035 },
          { text: 'فن', x: '82%', y: '12%', size: 140, rotate: -10, opacity: 0.05 },
        ]}
      />
      <div aria-hidden className="absolute top-8 right-10">
        <ZelligeFragment size={70} color="terracotta" opacity={0.25} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-6">
        <ZelligeFragment size={60} color="ocre" opacity={0.22} rotation={-15} shape="diamond" x="0" y="0" />
      </div>
      <ScanLine speed={14} opacity={0.25} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-3xl text-safran">AKHAM</span>
              <span className="font-display text-3xl text-ivoire-pur">FILMS</span>
            </Link>
            <p className="mt-5 text-ivoire-warm text-sm max-w-sm leading-relaxed">
              Société de production cinématographique algérienne fondée en {SITE.founded}.
              Documentaires, fiction et services audiovisuels.
            </p>
            <p className="mt-4 calligraphy-word text-terracotta" dir="rtl" style={{ position: 'relative', opacity: 0.55, fontSize: 36, lineHeight: 1 }}>
              ضوء · حكاية
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={SITE.social[href]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 border border-ivoire-low/40 hover:border-safran hover:text-safran transition-colors"
                  style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="meta mb-5 flex items-center gap-2">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ivoire-warm hover:text-safran transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-terracotta/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-ivoire-warm counter-mono flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()}</span>
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            <span>AKHAM FILMS</span>
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            <span>{SITE.city.toUpperCase()} · {SITE.country.toUpperCase()}</span>
          </p>
          <button
            type="button"
            onClick={toggle}
            className="text-xs meta flex items-center gap-2 text-ivoire-low hover:text-safran transition-colors"
            aria-pressed={active}
            title="Bascule l'ensemble du site en version coulisses"
          >
            <span
              className={`inline-block w-9 h-4 relative transition-colors ${
                active ? 'bg-safran' : 'bg-noir-relief'
              }`}
              style={{ clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 bg-noir-absolu transition-all ${
                  active ? 'left-[20px]' : 'left-0.5'
                }`}
              />
            </span>
            Making-of mode
          </button>
        </div>
      </div>
    </footer>
  );
}
