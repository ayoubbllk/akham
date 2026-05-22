import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Coordonnées et formulaire de contact d’Akham Films à Alger.',
};

export default function ContactPage() {
  return <ContactClient />;
}
