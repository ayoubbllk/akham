'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Instagram, Linkedin, Youtube } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { useStudioLive } from '@/components/providers/StudioLiveProvider';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

const trapezoid = { clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' };

const Schema = z.object({
  name: z.string().min(2, 'Votre nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.enum(['coproduction', 'service', 'presse', 'autre']),
  message: z.string().min(10, 'Un peu plus de détails ?'),
});

type FormData = z.infer<typeof Schema>;

export function ContactClient() {
  const { active } = useStudioLive();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error('Échec de l’envoi');
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    }
  };

  return (
    <section className="relative bg-noir-chaud pt-32 pb-32 zellige-grid grain-intense overflow-hidden">
      <CalligraphyTexture
        words={[
          { text: 'الجزائر', x: '65%', y: '10%', size: 220, rotate: -7, opacity: 0.05 },
          { text: 'ضوء', x: '0%', y: '70%', size: 180, rotate: 5, opacity: 0.04 },
        ]}
      />
      <div aria-hidden className="absolute top-32 right-12">
        <ZelligeFragment size={120} color="terracotta" opacity={0.28} rotation={20} shape="hexagon" x="0" y="0" />
      </div>
      <div aria-hidden className="absolute bottom-20 left-10">
        <ZelligeFragment size={90} color="ocre" opacity={0.22} rotation={-12} shape="diamond" x="0" y="0" />
      </div>
      <ScanLine speed={12} opacity={0.25} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="flex items-center gap-3">
          <span className="counter-mono text-[11px] text-ivoire-low">REEL · 07</span>
          <span className="diamond" aria-hidden />
          <span className="meta">Akham Films · Alger</span>
        </div>
        <h1 className="h-display text-ivoire-pur mt-6" style={{ fontSize: 'clamp(64px, 11vw, 170px)', lineHeight: 0.92 }}>
          Travaillons <span className="text-zellige-fill">ensemble</span>
        </h1>
        <div className="mt-8 flex items-center gap-4">
          <span className="block w-12 h-[2px] bg-safran" />
          <span className="block w-3 h-3 bg-terracotta rotate-45" />
          <span className="block flex-1 max-w-[200px] h-px bg-safran/30" />
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="space-y-6">
              <Info icon={<MapPin />} label="Adresse" value={SITE.address} />
              <Info icon={<Mail />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              <Info icon={<Phone />} label="Téléphone" value={SITE.phone} href={`tel:${SITE.phone.replace(/\s/g, '')}`} />
            </div>

            <div className="mt-10 flex gap-3">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={trapezoid}
                className="p-3 border border-ivoire-low/30 hover:border-safran hover:text-safran transition-colors">
                <Instagram size={18} />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                style={trapezoid}
                className="p-3 border border-ivoire-low/30 hover:border-safran hover:text-safran transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                style={trapezoid}
                className="p-3 border border-ivoire-low/30 hover:border-safran hover:text-safran transition-colors">
                <Youtube size={18} />
              </a>
            </div>

            <div
              style={trapezoid}
              className={`mt-10 inline-flex items-center gap-3 px-5 py-3 border ${
                active ? 'border-orange-brule text-orange-brule' : 'border-ocre text-ocre'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  active
                    ? 'bg-orange-brule shadow-[0_0_14px_rgba(201,75,26,0.85)] animate-blink'
                    : 'bg-ocre shadow-[0_0_10px_rgba(212,118,44,0.55)]'
                }`}
              />
              <span className="meta">{active ? 'Studio actif' : 'Studio disponible'}</span>
            </div>

            {/* Map placeholder */}
            <div className="mt-12 relative aspect-video bg-noir-relief border-l-4 border-terracotta border-y border-r border-safran/20 overflow-hidden">
              <iframe
                title="Carte Akham Films Alger"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.95,36.70,3.15,36.82&layer=mapnik&marker=36.7538,3.0588"
                className="w-full h-full grayscale contrast-125 opacity-80"
                loading="lazy"
              />
              <span aria-hidden className="absolute top-2 left-3 counter-mono text-[10px] text-safran/85 bg-noir-chaud/70 px-1.5 py-0.5">
                LAT 36.7538 · LNG 3.0588
              </span>
            </div>
          </div>

          {/* Right - form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative border-l-4 border-terracotta border-y border-r border-safran/30 bg-noir-surface p-10 text-center overflow-hidden"
              >
                <div aria-hidden className="absolute -top-3 -right-3">
                  <ZelligeFragment size={70} color="safran" opacity={0.4} rotation={20} shape="diamond" x="0" y="0" />
                </div>
                <p className="counter-mono text-[11px] text-safran/85">MSG · ENVOYÉ</p>
                <h3 className="h-display text-4xl mt-3">
                  <span className="text-zellige-fill">Message</span> reçu
                </h3>
                <p className="text-ivoire-warm mt-4">
                  Merci. Nous revenons vers vous sous <span className="text-safran">48h ouvrées</span>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField label="Nom" error={errors.name?.message}>
                  <input
                    type="text"
                    {...register('name')}
                    className="block w-full bg-transparent border-b border-ivoire-low/40 focus:border-safran outline-none text-ivoire-pur text-lg py-3 transition-colors"
                  />
                </FormField>
                <FormField label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register('email')}
                    className="block w-full bg-transparent border-b border-ivoire-low/40 focus:border-safran outline-none text-ivoire-pur text-lg py-3 transition-colors"
                  />
                </FormField>
                <FormField label="Sujet" error={errors.subject?.message}>
                  <select
                    {...register('subject')}
                    defaultValue=""
                    className="block w-full bg-transparent border-b border-ivoire-low/40 focus:border-safran outline-none text-ivoire-pur text-lg py-3 transition-colors"
                  >
                    <option value="" disabled className="bg-noir-chaud">— Choisir —</option>
                    <option value="coproduction" className="bg-noir-chaud">Coproduction</option>
                    <option value="service" className="bg-noir-chaud">Service</option>
                    <option value="presse" className="bg-noir-chaud">Presse</option>
                    <option value="autre" className="bg-noir-chaud">Autre</option>
                  </select>
                </FormField>
                <FormField label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    {...register('message')}
                    className="block w-full bg-transparent border-b border-ivoire-low/40 focus:border-safran outline-none text-ivoire-pur text-lg py-3 resize-none transition-colors"
                  />
                </FormField>

                {error && <p className="text-carmin text-sm meta">{error}</p>}

                <button type="submit" disabled={isSubmitting} className="cta-primary" data-cursor="cta">
                  {isSubmitting ? 'Envoi…' : 'Envoyer'} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-4">
      <span className="text-safran mt-1 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <div>
        <p className="meta text-ivoire-warm flex items-center gap-2">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          {label}
        </p>
        <p className="text-ivoire-pur text-lg mt-1">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-safran transition-colors">
      {Inner}
    </a>
  ) : (
    Inner
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="meta text-ivoire-warm flex items-center gap-2">
        <span className="diamond" aria-hidden style={{ margin: 0 }} />
        {label}
      </span>
      {children}
      {error && <p className="mt-2 text-carmin text-xs meta">{error}</p>}
    </label>
  );
}

