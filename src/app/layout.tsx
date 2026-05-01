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
    default: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève | Cuisine Authentique",
    template: "%s | La Gazelle d'Or Genève",
  },
  description:
    "Découvrez l'authenticité de la cuisine érythréenne et éthiopienne à Genève. Injera fait maison, plats végétariens, vegan et service traiteur africain. Une expérience culinaire unique aux Grottes.",
  keywords: [
    'restaurant érythréen Genève',
    'restaurant éthiopien Genève',
    'cuisine africaine Genève',
    'injera fait maison',
    'restaurant végétarien Genève',
    'restaurant vegan Genève',
    'traiteur africain Genève',
    "La Gazelle d'Or",
    'spécialités éthiopiennes',
    'déjeuner Genève',
    'dîner africain',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description:
      "Le meilleur de la cuisine érythréenne et éthiopienne à Genève. Ambiance chaleureuse, plats traditionnels et options végétariennes.",
    url: 'https://lagazelledorgeneva.com',
    siteName: "La Gazelle d'Or",
    images: [
      {
        url: '/images/_assets/logo-hero-B4ENhAYs.png',
        width: 1200,
        height: 630,
        alt: "La Gazelle d'Or Genève - Restaurant Érythréen & Éthiopien",
      },
    ],
    locale: 'fr_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Gazelle d'Or | Restaurant Érythréen & Éthiopien Genève",
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
    <html lang="fr" className={`${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/images/hero/lcp-1080w.avif"
          imageSrcSet="/images/hero/lcp-360w.avif 360w, /images/hero/lcp-480w.avif 480w, /images/hero/lcp-640w.avif 640w, /images/hero/lcp-828w.avif 828w, /images/hero/lcp-1080w.avif 1080w, /images/hero/lcp-1280w.avif 1280w, /images/hero/lcp-1600w.avif 1600w"
          imageSizes="100vw"
          fetchPriority="high"
        />
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
        <BodySnapManager />
        <PromoPopup />
      </body>
    </html>
  );
}