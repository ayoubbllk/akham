import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/data/blog';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

export const metadata: Metadata = {
  title: 'Journal de production',
  description: 'Coulisses, réflexions et regard sur le cinéma algérien.',
};

const CAT_LABEL: Record<string, string> = {
  coulisses: 'Coulisses',
  reflexion: 'Réflexion',
  interview: 'Interview',
  actualite: 'Actualité',
  fonds: 'Fonds & aides',
};

const CAT_COLOR: Record<string, string> = {
  coulisses: 'bg-orange-brule text-ivoire-pur',
  reflexion: 'bg-terracotta text-ivoire-pur',
  interview: 'bg-safran text-noir-absolu',
  actualite: 'bg-ocre text-noir-absolu',
  fonds: 'bg-carmin text-ivoire-pur',
};

const trapezoid = { clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' };

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  return (
    <>
      <header className="relative pt-40 pb-20 bg-noir-chaud overflow-hidden grain-intense">
        <CalligraphyTexture
          words={[
            { text: 'حكاية', x: '60%', y: '20%', size: 240, rotate: -5, opacity: 0.05 },
            { text: 'فن', x: '0%', y: '60%', size: 180, rotate: 8, opacity: 0.045 },
          ]}
        />
        <div aria-hidden className="absolute top-32 right-12">
          <ZelligeFragment size={120} color="ocre" opacity={0.3} rotation={20} shape="hexagon" x="0" y="0" />
        </div>
        <ScanLine speed={11} opacity={0.3} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-3">
            <span className="counter-mono text-[11px] text-ivoire-low">REEL · 06</span>
            <span className="diamond" aria-hidden />
            <span className="meta">Akham · Journal</span>
          </div>
          <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(64px, 11vw, 170px)', lineHeight: 0.92 }}>
            Journal de <span className="text-zellige-fill">production</span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <span className="block w-12 h-[2px] bg-safran" />
            <span className="block w-3 h-3 bg-terracotta rotate-45" />
            <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
          </div>
          <p className="mt-8 text-ivoire-warm max-w-2xl text-lg">
            Coulisses, réflexions et regard sur le <span className="text-safran">cinéma algérien</span>.
          </p>
        </div>
      </header>

      <section className="bg-noir-chaud pb-32 zellige-grid">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            data-cursor="image"
            className="group block mb-16 mt-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="relative lg:col-span-3 aspect-cinema overflow-hidden bg-noir-relief">
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: 'brightness(0.72)' }}
                />
                <div aria-hidden className="absolute -top-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ZelligeFragment size={80} color="terracotta" opacity={0.55} rotation={20} shape="diamond" x="0" y="0" />
                </div>
                <span aria-hidden className="counter-mono absolute top-3 left-3 text-[10px] text-safran/85">
                  À LA UNE
                </span>
              </div>
              <div className="lg:col-span-2 lg:pt-8">
                <span
                  className={`meta px-3 py-1 inline-block ${CAT_COLOR[featured.category]}`}
                  style={trapezoid}
                >
                  {CAT_LABEL[featured.category]}
                </span>
                <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-5 group-hover:text-safran transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-ivoire-warm leading-relaxed">{featured.excerpt}</p>
                <p className="meta text-ivoire-warm mt-6 flex items-center gap-2 flex-wrap">
                  <span className="counter-mono">
                    {new Date(featured.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="diamond" aria-hidden style={{ margin: 0 }} />
                  <span className="counter-mono">{featured.readTime} min</span>
                  <span className="diamond" aria-hidden style={{ margin: 0 }} />
                  <span>{featured.author}</span>
                </p>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                data-cursor="image"
                className="group block relative"
              >
                <div className="relative aspect-cinema overflow-hidden bg-noir-relief">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: 'brightness(0.74)' }}
                  />
                  <span aria-hidden className="counter-mono absolute top-2 right-3 text-[10px] text-safran/85">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <div aria-hidden className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZelligeFragment size={56} color="ocre" opacity={0.5} rotation={20} shape="diamond" x="0" y="0" />
                  </div>
                </div>
                <span
                  className={`meta px-3 py-1 inline-block mt-5 ${CAT_COLOR[p.category]}`}
                  style={trapezoid}
                >
                  {CAT_LABEL[p.category]}
                </span>
                <h3 className="h-display text-ivoire-pur text-3xl md:text-4xl mt-4 group-hover:text-safran transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-ivoire-warm leading-relaxed">{p.excerpt}</p>
                <p className="meta text-ivoire-low mt-4 flex items-center gap-2">
                  <span className="counter-mono">
                    {new Date(p.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="diamond" aria-hidden style={{ margin: 0 }} />
                  <span className="counter-mono">{p.readTime} min</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
