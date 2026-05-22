'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Film, Tv, Camera, Mic } from 'lucide-react';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';

type ProjectType = 'fiction' | 'documentaire' | 'pub' | 'photo';
type Format = 'court' | 'long' | 'serie' | 'spot';
type Finition = 'standard' | 'premium' | 'cinema';

const TYPES: { key: ProjectType; label: string; icon: React.ReactNode; mult: number }[] = [
  { key: 'fiction', label: 'Fiction', icon: <Film />, mult: 1.6 },
  { key: 'documentaire', label: 'Documentaire', icon: <Tv />, mult: 1 },
  { key: 'pub', label: 'Publicité / Brand', icon: <Mic />, mult: 1.3 },
  { key: 'photo', label: 'Studio photo', icon: <Camera />, mult: 0.4 },
];

const FORMATS: { key: Format; label: string; mult: number }[] = [
  { key: 'court', label: 'Court (≤ 30 min)', mult: 1 },
  { key: 'long', label: 'Long (≥ 60 min)', mult: 2.4 },
  { key: 'serie', label: 'Série (par épisode)', mult: 1.8 },
  { key: 'spot', label: 'Spot (≤ 90 sec)', mult: 0.6 },
];

const FINITIONS: { key: Finition; label: string; mult: number }[] = [
  { key: 'standard', label: 'Standard', mult: 1 },
  { key: 'premium', label: 'Premium', mult: 1.6 },
  { key: 'cinema', label: 'Niveau cinéma', mult: 2.5 },
];

const BASE = 1_500_000; // DA

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n);

export function BudgetEstimator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<ProjectType | null>(null);
  const [format, setFormat] = useState<Format | null>(null);
  const [finition, setFinition] = useState<Finition | null>(null);

  const can = step === 0 ? !!type : step === 1 ? !!format : !!finition;

  const min =
    type && format && finition
      ? BASE *
        TYPES.find((t) => t.key === type)!.mult *
        FORMATS.find((f) => f.key === format)!.mult *
        FINITIONS.find((f) => f.key === finition)!.mult *
        0.7
      : 0;
  const max = min ? min * 1.9 : 0;

  return (
    <section
      id="estimateur"
      className="relative bg-noir-surface border-y border-terracotta/30 py-24 md:py-32 overflow-hidden"
    >
      <div aria-hidden className="absolute top-10 right-10">
        <ZelligeFragment size={140} color="terracotta" opacity={0.18} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-10 left-6">
        <ZelligeFragment size={70} color="ocre" opacity={0.3} rotation={-15} shape="diamond" x="0" y="0" />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10">
        <p className="meta flex items-center gap-2">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          Estimateur de budget
        </p>
        <h2 className="h-display text-ivoire-pur text-4xl md:text-6xl mt-3">
          Une <span className="text-zellige-fill">fourchette</span> en 3 questions
        </h2>
        <p className="mt-4 text-ivoire-warm text-sm max-w-xl">
          Indication seulement. Pour un devis précis, parlez-nous de votre projet
          via la page Pitch.
        </p>

        <div className="mt-12 bg-noir-chaud p-6 md:p-10 border border-safran/20 relative">
          <span aria-hidden className="counter-mono absolute top-3 right-4 text-[10px] text-ivoire-low">
            STEP {step + 1}/4
          </span>

          {/* Progress bar with perforation pattern */}
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 transition-colors ${
                  i <= step ? 'bg-safran' : 'bg-noir-relief'
                }`}
                style={
                  i <= step
                    ? {
                        backgroundImage:
                          'radial-gradient(circle, rgba(15,10,6,0.55) 30%, transparent 31%)',
                        backgroundSize: '12px 100%',
                      }
                    : undefined
                }
              />
            ))}
          </div>

          {step === 0 && (
            <Step title="Quel type de projet ?">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TYPES.map((t) => (
                  <Pill
                    key={t.key}
                    active={type === t.key}
                    onClick={() => setType(t.key)}
                    icon={t.icon}
                    label={t.label}
                  />
                ))}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step title="Quel format ?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FORMATS.map((f) => (
                  <Pill
                    key={f.key}
                    active={format === f.key}
                    onClick={() => setFormat(f.key)}
                    label={f.label}
                  />
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="Quel niveau de finition ?">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {FINITIONS.map((f) => (
                  <Pill
                    key={f.key}
                    active={finition === f.key}
                    onClick={() => setFinition(f.key)}
                    label={f.label}
                  />
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step title="Estimation indicative">
              <div
                className="text-center py-10 border-l-4 border-terracotta bg-noir-relief/60 mt-4"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
              >
                <div className="meta text-ivoire-warm">Fourchette indicative</div>
                <div
                  className="counter-mono text-safran mt-3"
                  style={{ fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1, textShadow: '0 0 32px rgba(232,160,32,0.35)' }}
                >
                  {fmt(min)} – {fmt(max)} DA
                </div>
                <a
                  href="/pitch"
                  data-cursor="cta"
                  className="cta-primary mt-10 inline-flex"
                >
                  Demander un devis précis <ArrowRight size={14} />
                </a>
              </div>
            </Step>
          )}

          {step < 3 && (
            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="meta text-ivoire-warm disabled:opacity-30 hover:text-safran transition-colors"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!can}
                className="cta-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuer <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="h-display text-ivoire-pur text-2xl md:text-3xl mb-6 flex items-center gap-3">
        <span className="diamond" aria-hidden style={{ margin: 0 }} />
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function Pill({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border text-left transition-all ${
        active
          ? 'border-safran bg-safran/10 text-safran'
          : 'border-ivoire-low/40 text-ivoire-pur hover:border-safran hover:text-safran'
      }`}
      style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
      aria-pressed={active}
    >
      {icon && <span className="block mb-2 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </button>
  );
}
