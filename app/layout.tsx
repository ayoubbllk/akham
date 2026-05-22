import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, JetBrains_Mono, Amiri } from 'next/font/google';
import './globals.css';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { MakingOfProvider } from '@/components/providers/MakingOfProvider';
import { StudioLiveProvider } from '@/components/providers/StudioLiveProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { SITE } from '@/lib/utils';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});
const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'production cinématographique Algérie',
    'documentaire algérien',
    'fiction Algérie',
    'studio audiovisuel Alger',
    'Akham Films',
  ],
  authors: [{ name: 'Akham Films' }],
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${bebas.variable} ${dmsans.variable} ${jetbrains.variable} ${amiri.variable}`}
    >
      <body className="bg-noir-salle text-ivoire min-h-screen flex flex-col">
        <CursorProvider>
          <MakingOfProvider>
            <StudioLiveProvider>
              <CustomCursor />
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </StudioLiveProvider>
          </MakingOfProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
