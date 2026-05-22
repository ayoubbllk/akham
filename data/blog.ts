import type { BlogPost } from '@/lib/types';

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&h=900&q=80`;

export const posts: BlogPost[] = [
  {
    slug: 'tournage-tizgui-coulisses',
    title: 'Tizgui : 47 jours dans la neige',
    date: '2026-04-12',
    category: 'coulisses',
    thumbnail: u('photo-1483728642387-6c3bdd6c93e5'),
    excerpt:
      "Récit du tournage de notre long-métrage en Kabylie : froid, panneaux solaires, mules et nuits étoilées.",
    readTime: 8,
    author: 'Sara Bouzid',
    featured: true,
    content: `Le premier jour, le générateur a refusé de démarrer. À 1 800 mètres d'altitude, la neige tombait
en gros flocons. Voilà comment commence un tournage qu'on a préparé pendant deux ans.

## Préparer l'imprévu

Trois mois avant le clap, l'équipe de production avait monté un plan B pour chaque plan A. À la
fin, on a utilisé les plans C. C'est ça, le tournage en montagne.

## L'équipe locale, colonne vertébrale

Sans les villageois d'Aït Issad, rien n'aurait été possible. Leur connaissance du terrain,
leur patience, leur thé brûlant à 4h du matin.

## Ce que j'en retiens

Faire des films, ce n'est pas faire des films. C'est rassembler des gens autour d'une lumière.`,
  },
  {
    slug: 'depot-fonds-cnc',
    title: 'Déposer un dossier au CNC : ce que personne ne dit',
    date: '2026-03-02',
    category: 'fonds',
    thumbnail: u('photo-1450101499163-c8848c66ca85'),
    excerpt:
      'Note de production, garanties, lettres d’intention : guide pratique d’un dépôt CNC pour producteur algérien.',
    readTime: 12,
    author: 'Équipe Akham Films',
    content: `Beaucoup de jeunes auteurs nous demandent comment déposer au CNC français. Voici un retour
d'expérience après dix dépôts (dont sept acceptés).

## La note d'intention n'est pas la note de production

C'est l'erreur n°1. La note d'intention, c'est l'auteur. La note de production, c'est nous.
Deux voix distinctes, deux fonctions, deux propos.

## Construire la coproduction française avant le dépôt

Sans coproducteur français, impossible. Le travail commence donc bien avant le dossier :
festivals, pitchs, marchés. Berlinale Talents, IDFA, JCC.

## Le calendrier réel

De la première version du dossier à la décision : 18 mois. Anticipez.`,
  },
  {
    slug: 'interview-lina-boudiaf',
    title: 'Lina Boudiaf : « La pellicule a une mémoire »',
    date: '2026-02-14',
    category: 'interview',
    thumbnail: u('photo-1487412720507-e7ab37603c6f'),
    excerpt:
      "Entretien avec la réalisatrice de Tizgui sur la lumière, le silence et la responsabilité de filmer ses propres montagnes.",
    readTime: 9,
    author: 'Reda Tahiri',
    content: `> "Filmer son village, c'est se filmer soi. Sauf qu'on ne peut pas se cacher derrière le cadre."

Rencontre avec Lina Boudiaf, réalisatrice de Tizgui, dans son atelier d'écriture à Tizi Ouzou.

## Pourquoi le 35mm ?

Parce que la pellicule oblige. Elle coûte. Elle force la concentration. Elle a une mémoire chimique
que le numérique n'aura jamais.

## La Kabylie comme personnage

Mes montagnes ne sont pas un décor. Elles parlent. Le travail, c'est de leur laisser la parole.`,
  },
  {
    slug: 'reflexion-cinema-algerien-2030',
    title: 'Vers où va le cinéma algérien en 2030 ?',
    date: '2026-01-08',
    category: 'reflexion',
    thumbnail: u('photo-1485846234645-a62644f84728'),
    excerpt:
      'Plateformes, jeunes auteurs, fonds régionaux : tour d’horizon des cinq prochaines années du cinéma algérien.',
    readTime: 10,
    author: 'Équipe Akham Films',
    content: `La décennie qui s'ouvre sera décisive. Voici trois lignes de force que nous observons
depuis Akham Films.

## Une génération formée et impatiente

Les écoles algériennes, marocaines et tunisiennes forment une génération nombreuse, exigeante,
internationale dans ses références. Elle veut tourner. Maintenant.

## Les plateformes regardent enfin

Netflix MENA, Shahid, Watch It : les plateformes investissent dans les contenus arabophones.
L'Algérie y a sa place — à condition de structurer son industrie.

## Les fonds régionaux comme levier

AFAC, Doha, Red Sea Fund. Le financement régional change la donne pour les premiers films.`,
  },
  {
    slug: 'al-bahr-developpement',
    title: 'Al Bahr entre en développement',
    date: '2025-12-04',
    category: 'actualite',
    thumbnail: u('photo-1505142468610-359e7d316be0'),
    excerpt:
      "Notre prochain documentaire avec Yasmine Cherif obtient l'aide à l'écriture du Doha Film Institute.",
    readTime: 4,
    author: 'Akham Films',
    content: `Nous sommes heureux d'annoncer que Al Bahr, prochain documentaire de Yasmine Cherif produit par
Akham Films, vient d'obtenir l'aide à l'écriture du Doha Film Institute (session automne 2025).

Tournage prévu été 2026 sur la côte ouest algérienne.`,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
