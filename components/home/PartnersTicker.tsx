'use client';

const PARTNERS = [
  "Festival d'Alger",
  'AARC',
  'Fonds Sud Cinéma',
  'Canal+ Afrique',
  'Cinéma du Réel',
  'Doha Film Institute',
  'AFAC',
  'JCC Carthage',
  'FESPACO',
  'Arte France',
  'CNC',
  'Red Sea Fund',
];

export function PartnersTicker() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section
      className="relative py-12 overflow-hidden"
      style={{
        background: '#0F0A06',
        borderTop: '1px solid rgba(232,160,32,0.15)',
        borderBottom: '1px solid rgba(166,61,47,0.18)',
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            width: 'max-content',
            animation: 'ticker 28s linear infinite',
          }}
        >
          {list.map((p, i) => (
            <div key={`${p}-${i}`} className="flex items-center shrink-0" style={{ paddingInline: 24 }}>
              <span
                style={{
                  fontFamily: 'var(--font-dmsans)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: i % 2 === 0 ? '#E8A020' : '#7A6A52',
                  whiteSpace: 'nowrap',
                }}
              >
                {p}
              </span>
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  background: '#A63D2F',
                  transform: 'rotate(45deg)',
                  marginLeft: 24,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
