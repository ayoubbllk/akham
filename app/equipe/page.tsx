import type { Metadata } from 'next';
import Image from 'next/image';
import { team, values } from '@/data/team';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';
import { PhotoGallerySection } from '@/components/PhotoGallerySection';

export const metadata: Metadata = {
  title: 'Équipe',
  description: 'Les visages d’Akham Films : fondateur, équipe et culture maison.',
};

export default function EquipePage() {
  return (
    <>
      <header className="relative pt-40 pb-20 bg-noir-chaud overflow-hidden grain-intense">
        <CalligraphyTexture
          words={[
            { text: 'أحلام', x: '60%', y: '20%', size: 240, rotate: -5, opacity: 0.05 },
            { text: 'فن', x: '0%', y: '60%', size: 180, rotate: 8, opacity: 0.045 },
          ]}
        />
        <div aria-hidden className="absolute top-32 right-12">
          <ZelligeFragment size={120} color="terracotta" opacity={0.3} rotation={20} shape="hexagon" x="0" y="0" />
        </div>
        <ScanLine speed={11} opacity={0.3} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 items-end">
          <div className="hidden lg:block">
            <p
              className="font-arabic text-terracotta"
              dir="rtl"
              style={{ fontSize: '7vw', lineHeight: 1, textShadow: '0 0 28px rgba(166,61,47,0.35)' }}
            >
              أحلام
            </p>
            <p className="meta text-ivoire-warm mt-3">AḤLĀM · RÊVES</p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="counter-mono text-[11px] text-ivoire-low">REEL · 05</span>
              <span className="diamond" aria-hidden />
              <span className="meta">Équipe · Culture · Valeurs</span>
            </div>
            <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(64px, 11vw, 170px)', lineHeight: 0.92 }}>
              Les visages d’<span className="text-zellige-fill">Akham</span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="block w-12 h-[2px] bg-safran" />
              <span className="block w-3 h-3 bg-terracotta rotate-45" />
              <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
            </div>
          </div>
        </div>
      </header>

      {/* Équipe grid */}
      <section className="relative bg-noir-chaud py-24 overflow-hidden zellige-grid">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative">
          <p className="meta flex items-center gap-2">
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            L’équipe
          </p>
          <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3 mb-12">
            Celles & ceux qui font <span className="text-zellige-fill">Akham</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-noir-relief">
            {team.map((m, i) => (
              <div key={m.slug} className="group relative aspect-square overflow-hidden bg-noir-chaud">
                <Image
                  src={m.portrait}
                  alt={`Portrait ${m.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-[filter] duration-700"
                  style={{ filter: 'grayscale(1) brightness(0.85)' }}
                />
                <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0 bg-noir-chaud/10" />
                <Image
                  src={m.portrait}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ filter: 'saturate(1.02) brightness(0.98)' }}
                />
                <span aria-hidden className="counter-mono absolute top-2 right-3 text-[10px] text-safran/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-noir-chaud via-noir-chaud/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="meta text-safran">{m.role}</p>
                  <h3 className="font-display text-ivoire-pur text-2xl mt-1">{m.name}</h3>
                  {m.speciality && (
                    <p className="text-xs text-ivoire-warm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.speciality}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallerySection title="Galerie Akham" subtitle="Photos" />

      {/* Valeurs */}
      <section className="relative bg-noir-surface py-24 overflow-hidden">
        <div aria-hidden className="absolute top-10 left-8">
          <ZelligeFragment size={90} color="terracotta" opacity={0.22} rotation={-15} shape="diamond" x="0" y="0" />
        </div>
        <div aria-hidden className="absolute bottom-10 right-10">
          <ZelligeFragment size={120} color="ocre" opacity={0.18} rotation={20} shape="hexagon" x="0" y="0" />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative">
          <p className="meta flex items-center gap-2">
            <span className="diamond" aria-hidden style={{ margin: 0 }} />
            Culture & valeurs
          </p>
          <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3 mb-12">
            Quatre <span className="text-zellige-fill">A</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-noir-relief">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group relative bg-noir-surface p-7 hover:bg-noir-chaud transition-colors overflow-hidden"
              >
                <span aria-hidden className="font-display absolute -top-3 -right-2 text-safran/[0.07] select-none pointer-events-none" style={{ fontSize: 100, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[2px] bg-terracotta" />
                <h3 className="relative h-display text-safran text-3xl">{v.title}</h3>
                <p className="relative text-sm text-ivoire-pur mt-3 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
