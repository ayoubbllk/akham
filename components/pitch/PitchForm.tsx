'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Film, Tv, Sparkles } from 'lucide-react';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

const trapezoid = { clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' };

const FormSchema = z.object({
  pitch: z.string().min(20, 'Au moins 20 caractères, on a besoin d’un peu de matière.'),
  format: z.enum(['fiction', 'documentaire', 'pub']),
  stage: z.enum(['idee', 'scenario', 'financement', 'tournage']),
  budget: z.enum(['<500k', '500k-2M', '2M-10M', '+10M']),
  name: z.string().min(2, 'Votre nom, s’il vous plaît.'),
  email: z.string().email('Email invalide.'),
  phone: z.string().min(6, 'Numéro trop court.'),
  company: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

const STEPS = ['pitch', 'format', 'stage', 'budget', 'identity', 'send'] as const;

export function PitchForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
  });

  const next = async () => {
    const fields: (keyof FormData)[][] = [
      ['pitch'],
      ['format'],
      ['stage'],
      ['budget'],
      ['name', 'email', 'phone'],
    ];
    if (step < STEPS.length - 1) {
      const ok = await trigger(fields[step]);
      if (ok) setStep((s) => s + 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Échec de l’envoi.');
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <ClapEnd />;

  return (
    <div className="min-h-screen bg-noir-chaud grain-intense flex flex-col relative overflow-hidden">
      <CalligraphyTexture
        words={[
          { text: 'حكاية', x: '70%', y: '20%', size: 280, rotate: -7, opacity: 0.04 },
          { text: 'ضوء', x: '-2%', y: '60%', size: 220, rotate: 6, opacity: 0.035 },
        ]}
      />
      <div aria-hidden className="absolute top-32 right-10">
        <ZelligeFragment size={120} color="terracotta" opacity={0.22} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-40 left-10">
        <ZelligeFragment size={90} color="ocre" opacity={0.18} rotation={-15} shape="diamond" x="0" y="0" />
      </div>
      <ScanLine speed={13} opacity={0.22} />

      {/* Pellicule progress */}
      <div className="fixed top-0 left-0 right-0 z-40 h-3 bg-noir-absolu/95 flex border-b border-terracotta/30">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 border-r border-noir-absolu ${
              i <= step ? 'bg-safran' : 'bg-noir-relief'
            }`}
            style={{
              backgroundImage:
                i <= step
                  ? 'radial-gradient(circle, rgba(8,8,8,0.7) 30%, transparent 31%)'
                  : 'none',
              backgroundSize: '12px 100%',
            }}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex items-center pt-32 pb-20 relative z-10">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                <span className="meta counter-mono">ÉTAPE {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>
              </div>

              {step === 0 && (
                <Carton title="Votre histoire en une" accent="phrase ?">
                  <textarea
                    {...register('pitch')}
                    placeholder="Il était une fois…"
                    rows={4}
                    className="mt-8 w-full bg-transparent border-b-2 border-safran/40 focus:border-safran outline-none text-ivoire-pur font-display text-3xl md:text-5xl leading-snug py-4 placeholder:text-ivoire-low transition-colors"
                  />
                  <FieldError msg={errors.pitch?.message} />
                </Carton>
              )}

              {step === 1 && (
                <Carton title="Quel" accent="format ?">
                  <Controller
                    name="format"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        {[
                          { v: 'fiction', label: 'Fiction', icon: <Film size={32} /> },
                          { v: 'documentaire', label: 'Documentaire', icon: <Tv size={32} /> },
                          { v: 'pub', label: 'Publicité / Marque', icon: <Sparkles size={32} /> },
                        ].map((o) => (
                          <button
                            type="button"
                            key={o.v}
                            onClick={() => field.onChange(o.v)}
                            style={trapezoid}
                            className={`p-8 border-2 transition-all text-left ${
                              field.value === o.v
                                ? 'border-safran bg-safran/10 text-safran'
                                : 'border-ivoire-low/40 text-ivoire-pur hover:border-safran'
                            }`}
                          >
                            <span className="block">{o.icon}</span>
                            <span className="font-display text-3xl block mt-4">{o.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  <FieldError msg={errors.format?.message} />
                </Carton>
              )}

              {step === 2 && (
                <Carton title="Où en" accent="êtes-vous ?">
                  <Controller
                    name="stage"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
                        {[
                          { v: 'idee', label: 'Idée' },
                          { v: 'scenario', label: 'Scénario' },
                          { v: 'financement', label: 'Financement' },
                          { v: 'tournage', label: 'Prêt à tourner' },
                        ].map((o) => (
                          <button
                            type="button"
                            key={o.v}
                            onClick={() => field.onChange(o.v)}
                            style={trapezoid}
                            className={`p-6 border-2 font-display text-2xl transition-all ${
                              field.value === o.v
                                ? 'border-safran bg-safran/10 text-safran'
                                : 'border-ivoire-low/40 text-ivoire-pur hover:border-safran'
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  <FieldError msg={errors.stage?.message} />
                </Carton>
              )}

              {step === 3 && (
                <Carton title="Votre horizon" accent="budgétaire ?">
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                        {[
                          { v: '<500k', label: '< 500K DA' },
                          { v: '500k-2M', label: '500K – 2M DA' },
                          { v: '2M-10M', label: '2M – 10M DA' },
                          { v: '+10M', label: '+ 10M DA' },
                        ].map((o) => (
                          <button
                            type="button"
                            key={o.v}
                            onClick={() => field.onChange(o.v)}
                            style={trapezoid}
                            className={`p-5 border-2 font-display text-2xl counter-mono transition-all ${
                              field.value === o.v
                                ? 'border-safran bg-safran/10 text-safran'
                                : 'border-ivoire-low/40 text-ivoire-pur hover:border-safran'
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  <FieldError msg={errors.budget?.message} />
                </Carton>
              )}

              {step === 4 && (
                <Carton title="Qui" accent="êtes-vous ?">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <Field label="Nom" {...register('name')} error={errors.name?.message} />
                    <Field label="Email" type="email" {...register('email')} error={errors.email?.message} />
                    <Field label="Téléphone" type="tel" {...register('phone')} error={errors.phone?.message} />
                    <Field label="Société (optionnel)" {...register('company')} />
                  </div>
                </Carton>
              )}

              {step === 5 && (
                <Carton title="Tout est prêt —" accent="moteur ?">
                  <p className="mt-8 text-ivoire-warm text-lg max-w-xl">
                    Cliquez sur « Envoyer » pour transmettre votre pitch à l’équipe Akham.
                    Nous vous répondons sous <span className="text-safran">48h ouvrées</span>.
                  </p>
                  {error && <p className="mt-4 text-carmin text-sm">{error}</p>}
                </Carton>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-16">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || submitting}
              className="cta-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="cta-primary" disabled={submitting}>
                Continuer <ArrowRight size={14} />
              </button>
            ) : (
              <button type="submit" className="cta-primary" disabled={submitting}>
                {submitting ? 'Envoi…' : 'Envoyer le pitch'}{' '}
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Carton({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="h-display text-ivoire-pur mt-6"
        style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1.05 }}
      >
        {title} {accent && <span className="text-zellige-fill">{accent}</span>}
      </h2>
      <div className="mt-4 flex items-center gap-3">
        <span className="block w-12 h-[2px] bg-safran" />
        <span className="block w-3 h-3 bg-terracotta rotate-45" />
      </div>
      {children}
    </div>
  );
}

const Field = ({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string } & {
  name?: string;
}) => (
  <label className="block">
    <span className="meta text-ivoire-warm flex items-center gap-2">
      <span className="diamond" aria-hidden style={{ margin: 0 }} />
      {label}
    </span>
    <input
      {...props}
      className="mt-2 block w-full bg-transparent border-b border-ivoire-low/40 focus:border-safran outline-none text-ivoire-pur text-xl py-3 transition-colors"
    />
    <FieldError msg={error} />
  </label>
);

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-2 text-carmin text-xs meta">{msg}</p> : null;

function ClapEnd() {
  return (
    <div className="min-h-screen bg-noir-chaud grain-intense flex items-center justify-center text-center px-6 relative overflow-hidden">
      <CalligraphyTexture
        words={[
          { text: 'نهاية', x: '70%', y: '15%', size: 240, rotate: -6, opacity: 0.06 },
        ]}
      />
      <ScanLine speed={10} opacity={0.3} />
      <div aria-hidden className="absolute top-20 left-12">
        <ZelligeFragment size={110} color="terracotta" opacity={0.3} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-20 right-12">
        <ZelligeFragment size={130} color="ocre" opacity={0.28} rotation={-10} shape="diamond" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute top-1/3 right-1/3">
        <ZelligeFragment size={70} color="safran" opacity={0.4} rotation={45} shape="diamond" x="0" y="0" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ rotate: -25, y: -100, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="mx-auto w-40 h-28 relative"
          aria-hidden
        >
          <div className="absolute inset-x-0 bottom-0 h-20 bg-noir-chaud border-2 border-safran" />
          <motion.div
            initial={{ rotate: -35 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ transformOrigin: 'left center' }}
            className="absolute top-0 left-0 right-0 h-10 bg-safran flex items-center justify-around"
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-6 h-6 bg-noir-chaud"
                style={{ transform: 'skewX(-25deg)' }}
              />
            ))}
          </motion.div>
        </motion.div>

        <p className="counter-mono text-[11px] text-safran/80 mt-10 flex items-center justify-center gap-2">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          PITCH · REÇU · TC 00:00:01:00
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
        </p>
        <h2
          className="h-display mt-4"
          style={{ fontSize: 'clamp(72px, 12vw, 160px)' }}
        >
          <span className="text-zellige-fill">Clap !</span>
        </h2>
        <p className="text-ivoire-warm mt-6 max-w-md mx-auto">
          Votre pitch est en route. Akham vous répond sous <span className="text-safran">48h ouvrées</span>.
        </p>
        <a href="/" className="cta-secondary mt-10 inline-flex">
          ← Retour à l’accueil
        </a>
      </div>
    </div>
  );
}

