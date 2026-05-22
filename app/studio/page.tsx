import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { StudioStatus } from '@/components/studio/StudioStatus';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

export const metadata: Metadata = {
  title: 'Le studio',
  description: 'Espaces et disponibilité du studio Akham Films à Alger.',
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const SPACES = [
  { src: u('photo-1574267432553-4b4628081c31'), alt: 'Studio photo plateau' },
  { src: u('photo-1598550476439-6847785fcea6'), alt: 'Cabine podcast' },
  { src: u('photo-1574717024653-61fd2cf4d44d'), alt: 'Salle de montage' },
  { src: u('photo-1497032628192-86f99bcd76bc'), alt: 'Plateau cinéma' },
];

export default function StudioPage() {
  return (
    <>
      <header className="relative pt-40 pb-20 bg-noir-chaud overflow-hidden grain-intense">
        <CalligraphyTexture
          words={[
            { text: 'نور', x: '70%', y: '20%', size: 220, rotate: -8, opacity: 0.05 },
            { text: 'ضوء', x: '-2%', y: '60%', size: 200, rotate: 5, opacity: 0.04 },
          ]}
        />
        <div aria-hidden className="absolute top-32 right-12">
          <ZelligeFragment size={130} color="terracotta" opacity={0.32} rotation={20} shape="hexagon" x="0" y="0" />
        </div>
        <ScanLine speed={11} opacity={0.3} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 items-end">
          <div className="hidden lg:block">
            <p
              className="font-arabic text-terracotta"
              dir="rtl"
              style={{ fontSize: '7vw', lineHeight: 1, textShadow: '0 0 28px rgba(166,61,47,0.35)' }}
            >
              نور
            </p>
            <p className="meta text-ivoire-warm mt-3">NŪR · LUMIÈRE</p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="counter-mono text-[11px] text-ivoire-low">REEL · 04</span>
              <span className="diamond" aria-hidden />
              <span className="meta">Akham · Alger Centre</span>
            </div>
            <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(72px, 12vw, 180px)', lineHeight: 0.92 }}>
              Le <span className="text-zellige-fill">studio</span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="block w-12 h-[2px] bg-safran" />
              <span className="block w-3 h-3 bg-terracotta rotate-45" />
              <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
            </div>
            <p className="mt-8 text-ivoire-warm max-w-2xl text-lg leading-relaxed">
              Un lieu pensé pour le travail. <span className="text-safran">600 m²</span> entre studio photo, cabine podcast,
              salles de montage et plateau de prise de vues.
            </p>
          </div>
        </div>
      </header>

      <section className="bg-noir-chaud py-20 zellige-grid">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="meta flex items-center gap-2">
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            Espaces
          </p>
          <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3 mb-12">
            Quatre espaces, une <span className="text-zellige-fill">signature</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPACES.map((s, i) => (
              <div key={s.alt} className="group relative aspect-cinema overflow-hidden bg-noir-relief">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: 'brightness(0.7)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-chaud via-noir-chaud/30 to-transparent opacity-90" />
                <span aria-hidden className="absolute top-3 right-3 counter-mono text-[10px] text-safran/80">
                  ESP · {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="meta text-ivoire-pur flex items-center gap-2">
                    <span className="diamond" aria-hidden style={{ margin: 0 }} />
                    {s.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioStatus />

      <section className="relative bg-noir-chaud py-24 text-center overflow-hidden">
        <div aria-hidden className="absolute -top-4 left-1/2 -translate-x-1/2">
          <ZelligeFragment size={180} color="terracotta" opacity={0.15} rotation={25} shape="hexagon" x="0" y="0" />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-10 relative">
          <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl">
            Réservez le <span className="text-zellige-fill">studio</span>
          </h2>
          <p className="mt-6 text-ivoire-warm">
            Tournages, photoshoot, podcast ou post-production : envoyez-nous votre
            besoin, nous revenons sous 24h ouvrées.
          </p>
          <Link href="/contact" data-cursor="cta" className="cta-primary mt-10 inline-flex">
            Demander une réservation <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
