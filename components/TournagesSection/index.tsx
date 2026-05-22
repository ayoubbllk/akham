'use client';

import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { FilmGrain } from '@/components/home/FilmGrain';
import { ScanLine } from '@/components/home/ScanLine';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { TournagesMap } from './TournagesMap';

export function TournagesSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#0F0A06', padding: '140px 0 150px' }}
    >
      <CalligraphyTexture
        words={[
          { text: 'ارض', x: '5%', y: '14%', size: 250, rotate: -8, opacity: 0.035 },
          { text: 'ارض', x: '74%', y: '72%', size: 190, rotate: 6, opacity: 0.03 },
        ]}
      />
      <FilmGrain opacity={0.055} />
      <ScanLine speed={10} opacity={0.32} />
      <ZelligeFragment x="88%" y="14%" size={110} color="safran" opacity={0.3} rotation={14} animated />
      <ZelligeFragment x="4%" y="80%" size={82} color="terracotta" opacity={0.35} rotation={-10} shape="triangle" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 md:px-14">
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
          Nos territoires
        </span>

        <h2
          className="font-display mt-4"
          style={{ fontSize: 'clamp(56px, 5vw, 92px)', lineHeight: 0.9 }}
        >
          <span className="block text-ivoire-pur">L'algerie</span>
          <span className="block text-safran">nous appartient</span>
        </h2>

        <p
          className="mt-6 max-w-xl"
          style={{
            fontFamily: 'var(--font-dmsans)',
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#C8B898',
          }}
        >
          De la Casbah au Sahara, nos histoires naissent du terrain et de celles et ceux qui l'habitent.
        </p>

        <TournagesMap />
      </div>
    </section>
  );
}
