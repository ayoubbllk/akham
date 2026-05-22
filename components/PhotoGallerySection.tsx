import Image from 'next/image';

const GALLERY_IMAGES = [
  '/1.jpeg',
  '/2.jpeg',
  '/3.jpeg',
  '/4.jpeg',
  '/5.jpeg',
  '/6.jpeg',
  '/7.jpeg',
];

export function PhotoGallerySection({
  title = 'Galerie photo',
  subtitle = 'Nos images',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-noir-chaud py-24 overflow-hidden zellige-grid">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <p className="meta flex items-center gap-2">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          {subtitle}
        </p>
        <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3 mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {GALLERY_IMAGES.map((src, i) => {
            const tall = i === 1 || i === 4;
            const wide = i === 2 || i === 5;
            return (
              <article
                key={src}
                className={`relative overflow-hidden bg-noir-relief ${
                  tall ? 'row-span-2' : ''
                } ${wide ? 'col-span-2' : ''}`}
              >
                <Image
                  src={src}
                  alt={`Galerie Akham ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
