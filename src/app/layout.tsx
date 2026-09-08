import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import './accent-font-fallback.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PromoPopup } from '@/components/PromoPopup';
import { siteConfig } from '@/lib/site';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
  description:
    "Cuisine érythréenne et éthiopienne authentique à Genève : injera maison, plats végétariens et vegan, service traiteur et réservation à La Gazelle d'Or.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description:
      "Cuisine érythréenne et éthiopienne authentique à Genève, injera maison et expérience chaleureuse au cœur des Grottes.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/_assets/logo-hero-B4ENhAYs.png',
        alt: "La Gazelle d'Or Genève - Restaurant érythréen & éthiopien",
      },
    ],
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description: "Injera maison et saveurs authentiques de la Corne de l'Afrique à Genève.",
    images: ['/images/_assets/logo-hero-B4ENhAYs.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language} className={`${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="preload"
          href="/african.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <PromoPopup />
      </body>
    </html>
  );
}
