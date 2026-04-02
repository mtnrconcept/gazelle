import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BodySnapManager } from '@/components/BodySnapManager';
import { PromoPopup } from '@/components/PromoPopup';

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
  metadataBase: new URL('https://lagazelledorgeneva.com'),
  title: {
    default: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    template: "%s | La Gazelle d'Or Genève",
  },
  description:
    "Découvrez l'authenticité de la cuisine érythréenne et éthiopienne à Genève. Injera fait maison, plats végétariens, vegan et service traiteur africain.",
  applicationName: "La Gazelle d'Or",
  category: 'restaurant',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description:
      "Cuisine érythréenne et éthiopienne à Genève : injera maison, plats traditionnels, options végétariennes et service traiteur.",
    url: '/',
    siteName: "La Gazelle d'Or",
    locale: 'fr_CH',
    type: 'website',
    images: [
      {
        url: '/images/_assets/logo-hero-B4ENhAYs.png',
        width: 1200,
        height: 630,
        alt: "La Gazelle d'Or Genève - Restaurant érythréen et éthiopien",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien Genève",
    description:
      "Injera maison et saveurs authentiques de la Corne de l'Afrique à Genève.",
    images: ['/images/_assets/logo-hero-B4ENhAYs.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <BodySnapManager />
        <PromoPopup />
      </body>
    </html>
  );
}