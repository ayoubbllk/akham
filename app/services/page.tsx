import type { Metadata } from 'next';
import * as Icons from 'lucide-react';
import { services } from '@/data/services';
import { BudgetEstimator } from '@/components/services/BudgetEstimator';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Production cinéma, communication 360°, studio photo & podcast, post-production, consulting et production exécutive.',
};

const CAT_LABEL: Record<string, string> = {
  production: 'Production',
  technique: 'Technique',
  digital: 'Digital',
  conseil: 'Conseil',
};

export default function ServicesPage() {
  return (
    <>
      <header className="relative pt-40 pb-20 bg-noir-chaud overflow-hidden grain-intense">
        <CalligraphyTexture
          words={[
            { text: 'فن', x: '-2%', y: '20%', size: 240, rotate: -5, opacity: 0.05 },
            { text: 'حكاية', x: '60%', y: '60%', size: 220, rotate: 6, opacity: 0.04 },
          ]}
        />
        <div aria-hidden className="absolute top-32 right-12">
          <ZelligeFragment size={130} color="ocre" opacity={0.3} rotation={20} shape="hexagon" x="0" y="0" />
        </div>
        <ScanLine speed={11} opacity={0.3} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 items-end">
          {/* Vertical arabic word */}
          <div className="hidden lg:block">
            <p
              className="font-arabic text-terracotta"
              dir="rtl"
              style={{ fontSize: '7vw', lineHeight: 1, textShadow: '0 0 28px rgba(166,61,47,0.35)' }}
            >
              فن
            </p>
            <p className="meta text-ivoire-warm mt-3">FANN · ART</p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="counter-mono text-[11px] text-ivoire-low">REEL · 03</span>
              <span className="diamond" aria-hidden />
              <span className="meta">8 métiers · 1 maison</span>
            </div>
            <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(72px, 12vw, 180px)', lineHeight: 0.92 }}>
              Nos <span className="text-zellige-fill">services</span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="block w-12 h-[2px] bg-safran" />
              <span className="block w-3 h-3 bg-terracotta rotate-45" />
              <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
            </div>
            <p className="mt-8 text-ivoire-warm max-w-2xl text-lg leading-relaxed">
              Une chaîne complète, de l’idée à la diffusion. Akham travaille avec des
              réalisateurs, des marques, des institutions et des plateformes — toujours
              avec la même <span className="text-safran">exigence cinématographique</span>.
            </p>
          </div>
        </div>
      </header>

      <section className="bg-noir-chaud py-24 zellige-grid relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-noir-relief">
          {services.map((s, i) => {
            const Icon =
              (Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Sparkles;
            return (
              <div
                key={s.id}
                className="group relative bg-noir-chaud p-8 md:p-10 transition-colors hover:bg-noir-surface overflow-hidden"
              >
                {/* Ghost number */}
                <span
                  aria-hidden
                  className="font-display absolute -top-2 -right-1 text-safran/[0.07] select-none pointer-events-none"
                  style={{ fontSize: 110, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Border-left on hover */}
                <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[2px] bg-safran scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                <div className="relative flex items-start justify-between mb-6">
                  <Icon
                    size={36}
                    strokeWidth={1.2}
                    className="text-safran group-hover:scale-110 transition-transform"
                  />
                  <span className="meta text-ivoire-low">{CAT_LABEL[s.category]}</span>
                </div>
                <h2 className="relative h-display text-ivoire-pur text-3xl md:text-4xl group-hover:text-safran transition-colors">
                  {s.title}
                </h2>
                <p className="relative mt-4 text-sm text-ivoire-warm leading-relaxed">
                  {s.description}
                </p>
                <ul className="relative mt-6 space-y-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-ivoire-pur flex items-start gap-2 before:content-['—'] before:text-safran before:mt-0.5"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <BudgetEstimator />
    </>
  );
}
