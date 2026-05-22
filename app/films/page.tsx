import type { Metadata } from 'next';
import { films } from '@/data/films';
import { FilmsCatalogue } from '@/components/films/FilmsCatalogue';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

export const metadata: Metadata = {
  title: 'Nos films',
  description:
    'Catalogue des films produits par Akham Films : documentaires, fictions et courts-métrages.',
};

export default function FilmsPage() {
  return (
    <>
      <header className="relative pt-40 pb-20 bg-noir-chaud overflow-hidden grain-intense">
        <CalligraphyTexture
          words={[
            { text: 'حكاية', x: '60%', y: '20%', size: 280, rotate: -4, opacity: 0.05 },
            { text: 'ضوء', x: '-2%', y: '50%', size: 220, rotate: 6, opacity: 0.04 },
          ]}
        />
        <div aria-hidden className="absolute top-32 right-12">
          <ZelligeFragment size={120} color="terracotta" opacity={0.32} rotation={18} shape="hexagon" x="0" y="0" />
        </div>
        <div aria-hidden className="absolute bottom-10 right-40">
          <ZelligeFragment size={60} color="ocre" opacity={0.4} rotation={-10} shape="diamond" x="0" y="0" />
        </div>
        <ScanLine speed={12} opacity={0.35} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-3">
            <span className="counter-mono text-[11px] text-ivoire-low">REEL · 02</span>
            <span className="diamond" aria-hidden />
            <span className="meta">Catalogue · {films.length} titres</span>
          </div>
          <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(72px, 12vw, 180px)', lineHeight: 0.92 }}>
            Nos <span className="text-zellige-fill">films</span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <span className="block w-12 h-[2px] bg-safran" />
            <span className="block w-3 h-3 bg-terracotta rotate-45" />
            <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
          </div>
          <p className="mt-8 text-ivoire-warm max-w-2xl text-lg leading-relaxed">
            Documentaires, fictions, courts-métrages. Tous les films produits ou
            coproduits par <span className="text-safran">Akham Films</span> depuis 2019.
          </p>
        </div>
      </header>

      <FilmsCatalogue films={films} />
    </>
  );
}
