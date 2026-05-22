import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { films, getFilm } from '@/data/films';
import { FilmDetail } from '@/components/films/FilmDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const film = getFilm(params.slug);
  if (!film) return { title: 'Film introuvable' };
  return {
    title: `${film.title} (${film.year})`,
    description: film.synopsisShort,
    openGraph: {
      title: film.title,
      description: film.synopsisShort,
      images: [film.still],
    },
  };
}

export default function FilmPage({ params }: Props) {
  const film = getFilm(params.slug);
  if (!film) notFound();
  return <FilmDetail film={film} />;
}
