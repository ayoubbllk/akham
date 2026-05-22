export type TournageCategorie = 'fiction' | 'documentaire' | 'publicite';

export interface Tournage {
  id: string;
  film: string;
  lieu: string;
  wilaya: string;
  /** Nom exact de la wilaya dans data/algeria-wilayas.ts (cle de lookup). */
  wilayaKey: string;
  annee: number;
  categorie: TournageCategorie;
  /** Coordonnees dans le viewBox SVG d'Algerie (-1.75 -2 963.5 964). */
  coords: { cx: number; cy: number };
  extrait?: string;
  anecdote: string;
  image: string;
}

const u = (id: string, w = 1280, h = 720) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const tournages: Tournage[] = [
  {
    id: 't1',
    film: 'El Guerrab',
    lieu: "Casbah d'Alger",
    wilaya: 'Alger',
    wilayaKey: 'Algiers',
    annee: 2023,
    categorie: 'documentaire',
    coords: { cx: 546.8, cy: 22.6 },
    anecdote:
      "Trois semaines de tournage dans les ruelles classees UNESCO, a l'aube pour capter le silence.",
    image: u('photo-1518457607834-6e8d80c183c5'),
  },
  {
    id: 't2',
    film: 'Tizgui',
    lieu: 'Tikjda',
    wilaya: 'Bouira',
    wilayaKey: 'Bouira',
    annee: 2024,
    categorie: 'fiction',
    coords: { cx: 581.6, cy: 49.6 },
    anecdote:
      'Une sequence cle a ete retournee pendant une tempete de neige en haute altitude.',
    image: u('photo-1483728642387-6c3bdd6c93e5'),
  },
  {
    id: 't3',
    film: 'El Guerrab',
    lieu: 'Ghardaia',
    wilaya: 'Ghardaia',
    wilayaKey: 'Ghardaia',
    annee: 2023,
    categorie: 'documentaire',
    coords: { cx: 572, cy: 261.9 },
    anecdote:
      "Tourne pendant les preparatifs du festival du M'zab sous une chaleur de plus de 43 degres.",
    image: u('photo-1469474968028-56623f02e42e'),
  },
  {
    id: 't4',
    film: 'Al Bahr',
    lieu: 'Ain El Turk',
    wilaya: 'Oran',
    wilayaKey: 'Oran',
    annee: 2025,
    categorie: 'documentaire',
    coords: { cx: 375.8, cy: 84.4 },
    anecdote:
      'Le plan sequence du port a ete pris en une seule prise avant le lever du soleil.',
    image: u('photo-1507525428034-b723cf961d3e'),
  },
  {
    id: 't5',
    film: 'Kif-Kif',
    lieu: 'Sidi Bel Abbes',
    wilaya: 'Sidi Bel Abbes',
    wilayaKey: 'Sidi Bel Abbes',
    annee: 2024,
    categorie: 'fiction',
    coords: { cx: 377.9, cy: 137 },
    anecdote:
      'Le quartier central a ete transforme en decor de comedie sociale pendant dix nuits.',
    image: u('photo-1489599849927-2ee91cede3ba'),
  },
  {
    id: 't6',
    film: 'Souffle de Sel',
    lieu: 'Annaba',
    wilaya: 'Annaba',
    wilayaKey: 'Annaba',
    annee: 2022,
    categorie: 'publicite',
    coords: { cx: 753.7, cy: 14.6 },
    anecdote:
      'Campagne captee en 35 mm sur le front de mer avec une equipe locale complete.',
    image: u('photo-1500375592092-40eb2168fd21'),
  },
  {
    id: 't7',
    film: 'Casbah 90',
    lieu: 'Constantine',
    wilaya: 'Constantine',
    wilayaKey: 'Constantine',
    annee: 2022,
    categorie: 'fiction',
    coords: { cx: 713.2, cy: 42.6 },
    anecdote:
      "Le pont Sidi M'Cid a servi de decor a la scene de rupture, tournee en heure bleue.",
    image: u('photo-1502134249126-9f3755a50d78'),
  },
  {
    id: 't8',
    film: 'Lignes de Sel',
    lieu: 'Batna',
    wilaya: 'Batna',
    wilayaKey: 'Batna',
    annee: 2021,
    categorie: 'documentaire',
    coords: { cx: 670.9, cy: 100.6 },
    anecdote:
      'Le son direct a ete enregistre au pied des Aures pour conserver le vent des plateaux.',
    image: u('photo-1500382017468-9049fed747ef'),
  },
  {
    id: 't9',
    film: 'Sable Rouge',
    lieu: 'Timimoun',
    wilaya: 'Timimoun',
    wilayaKey: 'Timimoun',
    annee: 2021,
    categorie: 'fiction',
    coords: { cx: 431.9, cy: 392.4 },
    anecdote:
      'Les dunes ont impose un plan de transport nocturne pour proteger le materiel optique.',
    image: u('photo-1472396961693-142e6e269027'),
  },
  {
    id: 't10',
    film: 'Nour Digital',
    lieu: 'Tamanrasset',
    wilaya: 'Tamanrasset',
    wilayaKey: 'Tamanrasset',
    annee: 2020,
    categorie: 'publicite',
    coords: { cx: 674.4, cy: 706.9 },
    anecdote:
      'Le spot a ete finalise en deux jours avec un etalonnage sur place sous tente de production.',
    image: u('photo-1469474968028-56623f02e42e'),
  },
  {
    id: 't11',
    film: 'El Guerrab',
    lieu: 'Setif',
    wilaya: 'Setif',
    wilayaKey: 'Setif',
    annee: 2023,
    categorie: 'documentaire',
    coords: { cx: 652.8, cy: 56.8 },
    anecdote:
      'Une sequence archivee en marche de nuit a ete integree au montage final du film.',
    image: u('photo-1492321936769-b49830bc1d1e'),
  },
  {
    id: 't12',
    film: 'Rih El Gharb',
    lieu: 'Tlemcen',
    wilaya: 'Tlemcen',
    wilayaKey: 'Tlemcen',
    annee: 2019,
    categorie: 'fiction',
    coords: { cx: 333.6, cy: 138.8 },
    anecdote:
      'Le prologue a ete tourne dans les remparts historiques en lumiere naturelle uniquement.',
    image: u('photo-1451187580459-43490279c0fa'),
  },
];
