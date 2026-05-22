import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE = {
  name: 'Akham Films',
  tagline: 'Des histoires qui illuminent l’Algérie',
  description:
    'Société de production cinématographique algérienne fondée en 2019. Documentaires, fiction et services audiovisuels.',
  url: 'https://akhamfilms.dz',
  founded: 2019,
  city: 'Alger',
  country: 'Algérie',
  email: 'hello@akhamfilms.dz',
  phone: '+213 (0) 555 00 00 00',
  address: '12 rue de la Cinémathèque, Alger Centre, Algérie',
  social: {
    instagram: 'https://instagram.com/akhamfilms',
    linkedin: 'https://linkedin.com/company/akhamfilms',
    youtube: 'https://youtube.com/@akhamfilms',
    vimeo: 'https://vimeo.com/akhamfilms',
  },
};
