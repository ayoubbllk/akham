import type { Metadata } from 'next';
import { PitchForm } from '@/components/pitch/PitchForm';

export const metadata: Metadata = {
  title: 'Pitcher un projet',
  description: 'Présentez votre projet à Akham Films en six étapes. Réponse sous 48h.',
};

export default function PitchPage() {
  return <PitchForm />;
}
