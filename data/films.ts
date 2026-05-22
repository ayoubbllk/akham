import type { Film } from '@/lib/types';

const u = (id: string, w = 1600, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const films: Film[] = [
  {
    slug: 'deboussole',
    title: 'Déboussolé',
    year: 2022,
    category: 'fiction',
    director: 'Youcef Mansour',
    duration: 11,
    synopsis:
      "Brahim et Karim sont deux amis d'enfance. Ils ont planifié de fuir l'Algérie, mais depuis les manifestations populaires les choses ont pris une tournure différente.",
    synopsisShort: 'Deux amis d’enfance face à un départ devenu impossible.',
    poster: '/films/debousole.jpg',
    still: u('photo-1440404653325-ab127d49abc1', 1920, 803),
    gallery: [
      { src: u('photo-1440404653325-ab127d49abc1', 1600, 670), alt: 'Plan du film Déboussolé' },
      { src: u('photo-1517602302552-471fe67acf66', 1200, 1600), alt: 'Affiche du film Déboussolé' },
    ],
    status: 'sorti',
    crew: [
      { role: 'Scénario', name: 'Youcef Mansour' },
      { role: 'Casting', name: 'Ali Namous, Slimane Benouari' },
      { role: 'Images', name: 'Mohamed BENZAI' },
      { role: 'Prise de son', name: 'Hocine Mellal' },
      { role: 'Montage', name: 'Mohamed BENZAI' },
      { role: 'Production', name: 'Akham Films, BM Vision' },
    ],
    trailerUrl: 'https://vimeo.com/752040222?fl=pl&fe=vl',
  },
  {
    slug: 'tajmaath-almadina-elmouzdehira',
    title: 'تاجماعث المدينة المزدهرة',
    titleFr: 'Tajmaath, la cité prospère',
    year: 2023,
    category: 'documentaire',
    director: 'Al Jazeera Documentaire',
    duration: 46,
    synopsis:
      'منذ قرون أنشأ الأمازيغ الجزائريون نظاما شوريا فريدا نجح في تنظيم حياتهم، وإدارة شؤونهم الجماعية في مجتمعاتهم وقراهم، وألهم أوروبا وكبار مفكريها ومنظريها.',
    synopsisShort:
      'Documentaire social (45 min 42 s) sur le système communautaire amazigh en Algérie.',
    poster: '/films/documentaire.jpg',
    still: u('photo-1505739773434-cf35bb2a0c5e', 1920, 803),
    gallery: [
      { src: u('photo-1505739773434-cf35bb2a0c5e', 1600, 670), alt: 'Tajmaath, la cité prospère' },
      { src: u('photo-1469474968028-56623f02e42e', 1200, 1600), alt: 'Illustration du documentaire' },
    ],
    status: 'sorti',
    crew: [
      { role: 'Chaîne', name: 'Al Jazeera Documentaire' },
      { role: 'Genre', name: 'Social' },
      { role: 'Durée exacte', name: '45m 42s' },
    ],
  },
  {
    slug: 'printemps-reporte',
    title: 'Printemps reporté',
    year: 2018,
    category: 'court-metrage',
    director: 'Walid Bouchebbah',
    duration: 19,
    synopsis:
      "L'œuvre cinématographique évoque l'histoire d'une petite famille algéroise qui s'installe à Béjaïa et tente, tant bien que mal, de s'adapter à un mode de vie diamétralement différent, caractérisé par des problèmes politiques, des conflits culturels et des différends familiaux.",
    synopsisShort:
      'Une famille algéroise s’installe à Béjaïa et affronte tensions politiques et culturelles.',
    poster: '/films/printe.webp',
    still: u('photo-1478720568477-152d9b164e26', 1920, 803),
    gallery: [
      { src: u('photo-1478720568477-152d9b164e26', 1600, 670), alt: 'Plan du film Printemps reporté' },
      { src: u('photo-1485846234645-a62644f84728', 1200, 1600), alt: 'Affiche du film Printemps reporté' },
    ],
    status: 'sorti',
    awards: ['Sélection — 26e Festival international Capri Hollywood (Italie)'],
    crew: [
      { role: 'Casting', name: 'Rachid Benallal, Foudhil Assoul, Mourad Oudjit, Samia Meziane, Adlane Benmoussa' },
      { role: 'Production', name: 'Produit en 2018' },
    ],
    trailerUrl: 'https://vimeo.com/654133820',
  },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
export const featuredFilms = () => films.filter((f) => f.status !== 'developpement').slice(0, 3);
