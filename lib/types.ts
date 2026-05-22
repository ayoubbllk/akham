export type FilmCategory = 'fiction' | 'documentaire' | 'court-metrage' | 'developpement';
export type FilmStatus = 'sorti' | 'post-production' | 'developpement';

export interface CrewMember {
  role: string;
  name: string;
}

export interface FilmGalleryItem {
  src: string;
  alt: string;
  makingOf?: string;
}

export interface Film {
  slug: string;
  title: string;
  titleFr?: string;
  year: number;
  category: FilmCategory;
  director: string;
  duration: number; // minutes
  synopsis: string;
  synopsisShort: string;
  poster: string;
  still: string;
  gallery: FilmGalleryItem[];
  status: FilmStatus;
  awards?: string[];
  crew: CrewMember[];
  trailerUrl?: string;
  festivals?: { name: string; year: number; award?: string }[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  speciality?: string;
  bio?: string;
  portrait: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  category: 'production' | 'technique' | 'digital' | 'conseil';
}

export type BlogCategory = 'coulisses' | 'reflexion' | 'interview' | 'actualite' | 'fonds';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  thumbnail: string;
  excerpt: string;
  content: string;
  readTime: number;
  author: string;
  featured?: boolean;
}
