import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 bg-noir-chaud overflow-hidden grain-intense">
      <CalligraphyTexture
        words={[
          { text: 'خطأ', x: '60%', y: '15%', size: 280, rotate: -8, opacity: 0.06 },
          { text: 'ضائع', x: '0%', y: '65%', size: 220, rotate: 6, opacity: 0.05 },
        ]}
      />
      <ScanLine speed={9} opacity={0.35} />
      <div aria-hidden className="absolute top-20 left-10">
        <ZelligeFragment size={140} color="terracotta" opacity={0.32} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-20 right-12">
        <ZelligeFragment size={120} color="ocre" opacity={0.28} rotation={-15} shape="diamond" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute top-1/3 right-1/4">
        <ZelligeFragment size={60} color="safran" opacity={0.4} rotation={45} shape="diamond" x="0" y="0" />
      </div>

      <div className="relative z-10 max-w-xl">
        <p className="counter-mono text-[11px] text-safran/85 flex items-center justify-center gap-2">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          ERROR · 404 · TC --:--:--:--
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
        </p>
        <h1
          className="h-display mt-6"
          style={{ fontSize: 'clamp(80px, 14vw, 200px)', lineHeight: 0.92 }}
        >
          <span className="text-zellige-fill">Coupez !</span>
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="block w-12 h-[2px] bg-safran" />
          <span className="block w-3 h-3 bg-terracotta rotate-45" />
          <span className="block w-12 h-[2px] bg-safran" />
        </div>
        <p className="text-ivoire-warm mt-6 max-w-md mx-auto">
          La scène que vous cherchez n’existe pas — ou n’a pas encore été tournée.
        </p>
        <Link href="/" data-cursor="cta" className="cta-primary mt-10 inline-flex">
          Retour à la salle <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
