import { HomeHero } from '@/components/home/HomeHero';
import { TrailersCarousel } from '@/components/home/TrailersCarousel';
import { Manifesto } from '@/components/home/Manifesto';
import { FeaturedFilms } from '@/components/home/FeaturedFilms';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { Stats } from '@/components/home/Stats';
import { PartnersTicker } from '@/components/home/PartnersTicker';
import { ShowreelCTA } from '@/components/home/ShowreelCTA';
import { TournagesSection } from '@/components/TournagesSection';
import { FestivalsSection } from '@/components/FestivalsSection';
import { PhotoGallerySection } from '@/components/PhotoGallerySection';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrailersCarousel />
      <Manifesto />
      <TournagesSection />
      <FeaturedFilms />
      <PhotoGallerySection title="Galerie Akham" subtitle="Photos" />
      <ServicesPreview />
      <Stats />
      <PartnersTicker />
      <FestivalsSection />
      <ShowreelCTA />
    </>
  );
}
