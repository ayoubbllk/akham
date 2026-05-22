import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    id: 'production-cinema',
    icon: 'Film',
    title: 'Production cinématographique',
    description:
      "Fiction et documentaire. De l'écriture au festival, nous accompagnons les auteurs à chaque étape.",
    features: ['Développement de scénario', 'Dépôts de fonds', 'Plan de financement', 'Tournage & post-production'],
    category: 'production',
  },
  {
    id: 'communication-360',
    icon: 'Megaphone',
    title: 'Communication 360°',
    description:
      "Stratégie de marque, identité visuelle, campagnes intégrées. Un récit, mille canaux.",
    features: ['Stratégie de marque', 'Identité visuelle', 'Campagnes social', 'Rédaction & contenus'],
    category: 'digital',
  },
  {
    id: 'production-publicitaire',
    icon: 'Tv',
    title: 'Production publicitaire',
    description:
      'Spots TV, contenus de marque et brand films. Niveau cinéma pour des marques qui visent haut.',
    features: ['Spots TV / web', 'Brand films', 'Contenus social', 'Production exécutive'],
    category: 'production',
  },
  {
    id: 'studio-photo',
    icon: 'Camera',
    title: 'Studio photo',
    description: 'Plateau pro à Alger. Portrait, mode, corporate, packshot, plateau cinéma.',
    features: ['Studio 120m²', 'Lumière continue & flash', 'Cyclo blanc', 'Direction artistique'],
    category: 'technique',
  },
  {
    id: 'studio-podcast',
    icon: 'Mic',
    title: 'Studio podcast',
    description: 'Cabine traitée acoustiquement, enregistrement multi-pistes, montage et diffusion.',
    features: ['Cabine 4 micros', 'Captation vidéo', 'Montage sound design', 'Distribution'],
    category: 'technique',
  },
  {
    id: 'post-production',
    icon: 'Scissors',
    title: 'Post-production',
    description: 'Suite complète : montage image, étalonnage Davinci, mixage 5.1, VFX légers.',
    features: ['Montage image', 'Étalonnage Davinci', 'Mixage son 5.1', 'VFX & motion design'],
    category: 'technique',
  },
  {
    id: 'consulting',
    icon: 'Compass',
    title: 'Consulting artistique',
    description:
      'Accompagnement aux dépôts de fonds, aides à la production et stratégie de financement.',
    features: ['Aides CNC, Doha, AFAC, FFA', 'Pitchs & teasers', 'Stratégie festivals', 'Coproductions'],
    category: 'conseil',
  },
  {
    id: 'production-executive',
    icon: 'Globe',
    title: 'Production exécutive',
    description:
      "Tournages nationaux et internationaux en Algérie. Logistique, équipes, autorisations.",
    features: ['Repérages', 'Autorisations & visas', 'Équipes locales', 'Fixers & traduction'],
    category: 'production',
  },
];
