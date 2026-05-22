import type { TeamMember } from '@/lib/types';

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=900&q=80`;

export const founder: TeamMember = {
  slug: 'fondateur',
  name: 'Fondateur',
  role: 'Fondateur · Producteur',
  speciality: 'Direction artistique, dépôts de fonds, coproduction internationale',
  bio: `Né à Alger, formé entre Paris et Tunis, le fondateur d'Akham Films lance la maison en 2019
avec une obsession : faire entendre les voix algériennes dans une grammaire cinématographique exigeante.
Producteur de plus d'une douzaine de films documentaires et fictions, il accompagne les auteurs
depuis l'écriture jusqu'à la diffusion en festivals. En parallèle, il enseigne la production
à l'ESBA d'Alger et siège au comité de lecture de plusieurs fonds régionaux.`,
  portrait: u('photo-1507003211169-0a1dd7228f2d'),
};

export const team: TeamMember[] = [
  {
    slug: 'salim-belaid',
    name: 'Salim Belaïd',
    role: 'Directeur de la photographie',
    speciality: 'Image cinéma, lumière naturelle',
    portrait: u('photo-1500648767791-00dcc994a43e'),
  },
  {
    slug: 'nadia-kheireddine',
    name: 'Nadia Kheireddine',
    role: 'Cheffe opérateur son',
    speciality: 'Prise de son directe, design sonore',
    portrait: u('photo-1494790108377-be9c29b29330'),
  },
  {
    slug: 'reda-tahiri',
    name: 'Reda Tahiri',
    role: 'Chef monteur',
    speciality: 'Documentaire, fiction long-métrage',
    portrait: u('photo-1531427186611-ecfd6d936c79'),
  },
  {
    slug: 'lina-boudiaf',
    name: 'Lina Boudiaf',
    role: 'Réalisatrice associée',
    speciality: 'Fiction, écriture',
    portrait: u('photo-1487412720507-e7ab37603c6f'),
  },
  {
    slug: 'amine-zerhouni',
    name: 'Amine Zerhouni',
    role: 'Directeur artistique digital',
    speciality: 'Branding, web, motion',
    portrait: u('photo-1506794778202-cad84cf45f1d'),
  },
  {
    slug: 'sara-bouzid',
    name: 'Sara Bouzid',
    role: 'Cheffe de production',
    speciality: 'Logistique tournage, coproductions',
    portrait: u('photo-1438761681033-6461ffad8d80'),
  },
  {
    slug: 'karim-si-ali',
    name: 'Karim Si Ali',
    role: 'Scénariste & Réalisateur',
    speciality: 'Comédie, série',
    portrait: u('photo-1492562080023-ab3db95bfbce'),
  },
  {
    slug: 'yasmine-cherif',
    name: 'Yasmine Cherif',
    role: 'Réalisatrice documentaire',
    speciality: 'Documentaire de création',
    portrait: u('photo-1573496359142-b8d87734a5a2'),
  },
];

export const values = [
  {
    title: 'Authenticité',
    description: 'Filmer ce qui est, sans le travestir. Préférer la vérité au confort.',
  },
  {
    title: 'Audace',
    description: 'Ouvrir des chemins que personne ne prend. Accepter la lumière dure.',
  },
  {
    title: 'Ancrage',
    description: 'Algérie, point de départ et point de fuite. Toujours.',
  },
  {
    title: 'Ambition',
    description: 'Internationale dans la forme, locale dans la chair.',
  },
];
